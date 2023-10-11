import type { AstroConfig, AstroIntegration } from "astro";
import pathLib from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { globSync } from "glob";
import chalk from "chalk";

let astroConfig: AstroConfig | undefined;

const astroAssetRenamer = (
	getNewBasenameFn: (
		assetInfo: { basename: string; path: string; pathInOS: string },
		pageInfo: { basename: string; path: string; pathInOS: string }
	) => string | null | undefined,
	options: {
		assetExtensions?: string[];
	} = {}
): AstroIntegration => {
	const attributeNames = ["href", "src"];
	const assetExtensions = options.assetExtensions || ["js", "css"];

	return {
		name: "asset-renamer",
		hooks: {
			"astro:config:done": ({ config }) => {
				astroConfig = config;
			},
			"astro:build:done": async ({ dir }) => {
				try {
					if (!astroConfig) return;

					const outDir = fileURLToPath(astroConfig.outDir);
					const htmlPaths = globSync(
						`${decodeURI(dir.pathname)}**/*.html`
					);

					const attrs = attributeNames.join("|");
					const exts = assetExtensions.join("|");
					const linkPattern = new RegExp(
						`(\\s(${attrs}))="[^"]*\.(${exts})"`, // example: ' src="something.js"'
						"g"
					);

					console.log("");
					console.log("Assets renamed:");

					htmlPaths.forEach((htmlPathInOS) => {
						const htmlPath = pathLib.relative(outDir, htmlPathInOS);
						const html = fs.readFileSync(htmlPathInOS, "utf8");
						const links = html.match(linkPattern);
						let newHtml: string | undefined;

						links?.forEach((link) => {
							const parts = link.split('"'); // example: [' src=', 'something.js', '']
							const path = pathLib.normalize(parts[1]);
							const pathInOS = pathLib.join(outDir, path);

							const asssetInfo = {
								basename: pathLib.basename(path),
								path,
								pathInOS,
							};
							const pageInfo = {
								basename: pathLib.basename(htmlPathInOS),
								path: htmlPath,
								pathInOS: htmlPathInOS,
							};

							const renamedBasename = getNewBasenameFn(
								asssetInfo,
								pageInfo
							);

							if (renamedBasename) {
								// rename file
								const renamedPathInOS = pathInOS.replace(
									pathLib.basename(pathInOS),
									renamedBasename
								);

								if (
									fs.existsSync(renamedPathInOS) &&
									pathInOS !== renamedPathInOS
								) {
									throw new Error(
										`ERROR: Operation of rename: \n  ${pathInOS}\n  ↓\n  ${renamedPathInOS}\ncannot be done. \n\nBecause file with name "${renamedPathInOS}" already exists.`
									);
								}

								fs.mkdirSync(pathLib.dirname(renamedPathInOS), {
									recursive: true,
								});
								fs.renameSync(pathInOS, renamedPathInOS);

								// change link in html
								const renamedPath = path.replace(
									pathLib.basename(path),
									renamedBasename
								);
								const newLink = `${parts[0]}"${renamedPath.replaceAll(
									"\\",
									"/"
								)}"`;

								newHtml = newHtml
									? newHtml.replace(link, newLink)
									: html.replace(link, newLink);

								console.log(chalk.green(`${path} -> ${renamedPath}`));
							}
						});

						if (newHtml) {
							fs.writeFileSync(htmlPathInOS, newHtml);
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
};

export default astroAssetRenamer;
