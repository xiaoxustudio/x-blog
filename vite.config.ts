import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	server: {
		proxy: {
			"/api": {
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
				target: "http://localhost:8000"
			}
		}
	},
	build: {
		chunkSizeWarningLimit: 1500,

		emptyOutDir: true,

		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return id
							.toString()
							.split("node_modules/.pnpm/")[1]
							.split("/")[0]
							.toString();
					}
				},

				chunkFileNames: (chunkInfo) => {
					const facadeModuleId = chunkInfo.facadeModuleId
						? chunkInfo.facadeModuleId.split("/")
						: [];

					const fileName =
						facadeModuleId[facadeModuleId.length - 2] || "[name]";

					return `js/${fileName}/[name].[hash].js`;
				},

				assetFileNames: (assetInfo) => {
					if (assetInfo.name) {
						const info = assetInfo.name.split(".");

						let extType = info[info.length - 1];

						if (
							/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(
								assetInfo.name
							)
						) {
							extType = "media";
						} else if (
							/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)
						) {
							extType = "img";
						} else if (
							/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(
								assetInfo.name
							)
						) {
							extType = "fonts";
						}

						return `${extType}/[name]-[hash][extname]`;
					} else {
						return `assets/[name]-[hash][extname]`;
					}
				}
			}
		}
	}
});
