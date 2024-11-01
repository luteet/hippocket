module.exports = {
	plugins: [
		require('autoprefixer2'), // пример плагина
		require('postcss-sort-media-queries'),
		require('cssnano')({ preset: 'default' }), // сжатие CSS
	],
};