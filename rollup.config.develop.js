import typescript from '@rollup/plugin-typescript';

export default {
	input: './src/index.ts',
	output: {
		format: 'iife',
		file: '/mnt/c/Users/Miles/Documents/OpenRCT2/plugin/refurbish-manager.js',
	},
	plugins: [
		typescript({
			noEmit: true,
		}),
	],
};
