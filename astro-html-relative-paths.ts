import type { AstroConfig, AstroIntegration } from "astro";
import * as path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { globSync } from "glob";
import chalk from "chalk";

let astroConfig: AstroConfig | undefined;

function astroHtmlRelativePaths(
	options: {
		exclude?: string[];
		attributeNames?: string[];
	} = {}
): AstroIntegration {
	const exclude = options.exclude || [];
	const attributeNames = options.attributeNames || ["href", "src"];

	return {
		name: "absolute-to-relative",
		hooks: {
			"astro:config:done": ({ config }) => {
				astroConfig = config;
			},
			"astro:build:done": async ({ dir }) => {
				try {
					if (!astroConfig) return;

					const outDir = astroConfig.outDir;
					const htmlPaths = globSync(
						`${decodeURI(dir.pathname)}**/*.html`
					);
					const linkPattern = new RegExp(
						`(\\s(${attributeNames.join("|")}))="\/[^"]*"`,
						"g"
					);

					console.log(
						"HTHML pages, in which absolute paths was replaced with relative:"
					);

					htmlPaths.forEach((htmlPath) => {
						const html = fs.readFileSync(htmlPath, "utf8");
						const links = html.match(linkPattern);
						let newHtml: string | undefined;

						links?.forEach((link) => {
							const parts = link.split('"');

							if (exclude.find((item) => item === parts[1])) return;

							const pathname = path.normalize(parts[1]);
							const pathnameInOS = path.join(
								fileURLToPath(outDir),
								pathname
							);
							const relativePathname = path
								.relative(path.dirname(htmlPath), pathnameInOS)
								.replaceAll(path.sep, path.posix.sep);
							const newLink = `${parts[0]}"${relativePathname}"`;
							newHtml = newHtml
								? newHtml.replace(link, newLink)
								: html.replace(link, newLink);
						});

						if (newHtml) {
							fs.writeFileSync(htmlPath, newHtml);

							const htmlDir = path.relative(
								fileURLToPath(outDir),
								htmlPath
							);
							console.log(
								chalk.green(`${htmlDir}/${path.basename(htmlPath)}`)
							);
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

export default astroHtmlRelativePaths;
