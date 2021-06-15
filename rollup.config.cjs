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
};
