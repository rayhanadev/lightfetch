const { builtinModules } = require('module');

module.exports = {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/lightfetch.cjs',
			format: 'cjs',
			preferConst: true,
		},
		{
			file: 'dist/lightfetch.mjs',
			format: 'esm',
			preferConst: true,
		},
	],
	external: [...builtinModules],
};
