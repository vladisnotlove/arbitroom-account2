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
							id.includes("src/layouts") ||
							id.includes("src/styles")
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
		astroAssetRenamer(({ asset, pages }) => {
			// todo: make better name generation for cases when asset is used in many pages
			const page = pages[0];

			if (!page) return null;
			// ignore common.js, common.css
			if (asset.basename.includes("_common.js")) return null;
			if (asset.basename.includes("_common.css")) return null;
			// rename hoisted.19h1jh1.js -> [path_to_page].js

			if (page.path === "index.html") {
				return "index" + asset.extname;
			} else if (page.basename === "index.html") {
				const pageFolder = pathLib.dirname(page.path);
				return pageFolder + asset.extname;
			} else {
				return page.path.replace(page.extname, asset.extname);
			}
		}),
		astroHtmlRelativePaths({
			attributeNames: ["href", "src", "data-source"],
		}),
		astroCssRelativePaths(),
	],
});
