import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
// import rollupNodePolyFill from 'rollup-plugin-polyfill-node'

export default defineConfig({
	resolve: {
		alias: [
			{ 	
				find: "@", replacement: path.resolve(__dirname, "src")
			}
		],
	},
	plugins: [
		react({
			babel: {
				plugins: ['@babel/plugin-syntax-import-assertions'],
			},
		}),
		tsconfigPaths(),
	],
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			},
		}
	},
	build: {
		rollupOptions: {
			plugins: [
				// builtinsPlugin,
				// rollupNodePolyFill()
			]
		}
	},
	esbuild: {
		supported: {
			'top-level-await': true
		},
	}

})
