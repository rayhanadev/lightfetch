const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

module.exports = {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/lightfetch.cjs',
			format: 'cjs',
		},
		{
			file: 'dist/lightfetch.mjs',
			format: 'esm',
		},
	],
	plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
};
