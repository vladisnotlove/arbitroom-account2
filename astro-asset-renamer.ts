import type { AstroIntegration } from "astro";
import pth from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { globSync } from "glob";
import chalk from "chalk";

// HELPERS

const toPosix = (path: string) => {
	return path.split(pth.sep).join(pth.posix.sep);
};

// MAIN

const astroAssetRenamer = (
	renameAsset: (params: {
		asset: { basename: string; path: string; extname: string };
		pages: Array<{ basename: string; path: string; extname: string }>;
	}) => string | null | undefined,
	options: {
		assetExtensions?: string[];
	} = {}
): AstroIntegration => {
	const attributeNames = ["href", "src"];
	const assetExtensions = options.assetExtensions || ["js", "css"];

	return {
		name: "asset-renamer",
		hooks: {
			"astro:build:done": async ({ dir: dirUrl }) => {
				try {
					const dir = fileURLToPath(dirUrl);
					const htmlPaths = globSync(`${dir}**/*.html`, {
						windowsPathsNoEscape: true,
					});
					const attrs = attributeNames.join("|");
					const exts = assetExtensions.join("|");
					const linkPattern = new RegExp(
						`(\\s(${attrs}))="[^"]*\.(${exts})"`, // example: ' src="something.js"'
						"g"
					);

					// collect candidates to rename
					const candidates: Array<{
						htmlPath: string;
						htmlPathInWebsite: string;
						assetPath: string;
						assetPathInWebsite: string;
						link: string;
					}> = [];

					htmlPaths.forEach((htmlPath) => {
						const htmlPathInWebsite = pth.relative(dir, htmlPath);
						const html = fs.readFileSync(htmlPath, "utf8");
						const links = html.match(linkPattern);

						links?.forEach((link) => {
							const parts = link.split('"'); // example: [' src=', 'something.js', '']
							const assetPathInWebsite = pth.normalize(parts[1]);
							const assetPath = pth.join(dir, assetPathInWebsite);

							if (parts[1].startsWith("http://") || parts[1].startsWith("https://")) return;

							candidates.push({
								htmlPath: toPosix(htmlPath),
								htmlPathInWebsite: toPosix(htmlPathInWebsite),
								assetPath: toPosix(assetPath),
								assetPathInWebsite: toPosix(assetPathInWebsite),
								link: toPosix(link),
							});
						});
					});

					if (candidates.length === 0) return;

					// group candidates by assetPath
					const groups = new Map<string, typeof candidates>();

					candidates.forEach((candidate) => {
						const group = groups.get(candidate.assetPath);
						if (group) {
							groups.set(candidate.assetPath, [...group, candidate]);
						} else {
							groups.set(candidate.assetPath, [candidate]);
						}
					});

					console.log("");
					console.log("Assets renamed:");

					groups.forEach((candidates) => {
						if (!candidates[0]) return;

						// get new asset basename
						const newAssetBasename = renameAsset({
							asset: {
								basename: pth.basename(candidates[0].assetPathInWebsite),
								path: candidates[0].assetPathInWebsite,
								extname: pth.extname(candidates[0].assetPathInWebsite),
							},
							pages: candidates.map(({ htmlPathInWebsite }) => ({
								basename: pth.basename(htmlPathInWebsite),
								path: htmlPathInWebsite,
								extname: pth.extname(htmlPathInWebsite),
							})),
						});

						if (!newAssetBasename) return;

						// rename asset
						const { assetPath } = candidates[0];
						const assetBasename = pth.basename(assetPath);
						const newAssetPath = assetPath.replace(assetBasename, newAssetBasename);

						if (fs.existsSync(newAssetPath) && assetPath !== newAssetPath) {
							throw new Error(
								`ERROR: Operation of rename: \n  ${assetPath}\n  ↓\n  ${newAssetPath}\ncannot be done. \n\nBecause file with name "${newAssetPath}" already exists.`
							);
						}

						fs.mkdirSync(pth.dirname(newAssetPath), { recursive: true });
						fs.renameSync(assetPath, newAssetPath);

						// update links in html
						candidates.forEach(({ htmlPath, link }) => {
							const newLink = link.replace(assetBasename, newAssetBasename);
							const html = fs.readFileSync(htmlPath, "utf8");
							const newHtml = html.replaceAll(link, newLink);
							fs.writeFileSync(htmlPath, newHtml);
						});

						console.log(chalk.green(`${assetPath} -> ${newAssetPath}`));
					});

					console.log();
				} catch (error) {
					console.log(chalk.red(error.message));
					console.log();
				}
			},
		},
	};
};

export default astroAssetRenamer;
