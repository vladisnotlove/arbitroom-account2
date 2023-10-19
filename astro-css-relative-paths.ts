import type { AstroIntegration } from "astro";
import pathLib from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { globSync } from "glob";
import chalk from "chalk";

const CssUrl = {
	pattern: /url\([^)]*\)/g,
	parse: (str: string) => {
		const normilized = str.replace(/\s|"|'/g, "");
		const path = normilized.replace(/url\(|\)/g, "");

		return {
			normilized,
			path,
		};
	},
	stringify: (path: string) => {
		const normalized = path.split(pathLib.sep).join(pathLib.posix.sep);
		return `url(${pathLib.posix.normalize(normalized)})`;
	},
};

function astroCssRelativePaths(): AstroIntegration {
	return {
		name: "absolute-to-relative",
		hooks: {
			"astro:build:done": async ({ dir: dirUrl }) => {
				try {
					const dir = fileURLToPath(dirUrl);
					const cssPaths = globSync(`${dir}**/*.css`, {
						windowsPathsNoEscape: true,
					});

					console.log("CSS files, in which absolute paths was replaced with relative:");

					cssPaths.forEach((cssPath) => {
						const cssContent = fs.readFileSync(cssPath, "utf8");
						const cssUrls = cssContent.match(CssUrl.pattern) || [];

						const operations: Array<{
							cssUrl: string;
							newCssUrl: string;
						}> = [];

						cssUrls.forEach((cssUrl) => {
							const { path: cssUrlPath } = CssUrl.parse(cssUrl);

							if (cssUrlPath.startsWith("/")) {
								const assetPath = pathLib.join(dir, cssUrlPath);
								const pathFromCssToAsset = pathLib.relative(pathLib.dirname(cssPath), assetPath);
								const newCssUrl = CssUrl.stringify(pathFromCssToAsset);

								operations.push({
									cssUrl,
									newCssUrl,
								});
							}
						});

						if (operations.length > 0) {
							let newContent = cssContent;
							operations.forEach(({ cssUrl, newCssUrl }) => {
								newContent = newContent.replaceAll(cssUrl, newCssUrl);
							});

							fs.writeFileSync(cssPath, newContent);
							console.log(chalk.green(cssPath) + " " + chalk.gray(`(${operations.length} urls)`));
						}
					});

					console.log();
				} catch (error) {
					console.log();
					console.log(chalk.red(error.message));
					console.log();
				}
			},
		},
	};
}

export default astroCssRelativePaths;
