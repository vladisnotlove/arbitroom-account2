import { defineConfig } from "astro/config";
import pathLib from "path";
import astroAssetRenamer from "./astro-asset-renamer";
import astroHtmlBeautifier from "./astro-html-beautifier";
import astroHtmlRelativePaths from "./astro-html-relative-paths";
import astroCssRelativePaths from "./astro-css-relative-paths";

// build

export default defineConfig({
	output: "static",
	vite: {
		build: {
			assetsInlineLimit: 0,
			minify: false,
			rollupOptions: {
				output: {
					assetFileNames: "_layout-assets/[ext]/[name][extname]",
					entryFileNames: "_layout-assets/js/[name].js",
					manualChunks: (id) => {
						if (id.includes("node_modules")) {
							return "_vendor";
						}
						if (
							id.includes("src/components/@uikit") ||
							id.includes("src/components/@common") ||
							id.includes("src/layouts")
						) {
							return "_common";
						}
						return null;
					},
				},
			},
		},
	},
	// setup chunkFilesNames only for client build
	integrations: [
		{
			name: "setup-rollup-options",
			hooks: {
				"astro:build:setup": ({ vite, target }) => {
					if (target === "client") {
						vite.build.rollupOptions = {
							...vite.build.rollupOptions,
							output: {
								...vite.build.rollupOptions.output,
								chunkFileNames: "_layout-assets/js/[name].js",
							},
						};
					}
				},
			},
		},
		astroHtmlBeautifier(),
		astroAssetRenamer((assetInfo, pageInfo) => {
			// ignore common.js, common.css
			if (assetInfo.basename.includes("_common.js")) return null;
			if (assetInfo.basename.includes("_common.css")) return null;
			// rename hoisted.19h1jh1.js -> [path_to_page].js
			const assetExtname = pathLib.extname(assetInfo.path);
			const pageBasename = pageInfo.basename;
			const pagePath = pageInfo.path;

			if (pagePath === "index.html") {
				return "index" + assetExtname;
			} else if (pageBasename === "index.html") {
				const pageFolder = pathLib.dirname(pagePath);
				const basename = pageFolder + assetExtname;
				return basename;
			} else {
				const pageExtname = pathLib.extname(pagePath);
				const basename = pagePath.replace(pageExtname, assetExtname);
				return basename;
			}
		}),
		astroHtmlRelativePaths(),
		astroCssRelativePaths(),
	],
});
