const path = require('path');    // Relative paths support
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	entry: { main: './src/index.js' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		publicPath: ''
	},
	mode: 'development',
	devServer: {
		static: path.resolve(__dirname, './dist'),
		compress: true,
		port: 8080,

		open: false  // Auto opening
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.css$/,

				use: [MiniCssExtractPlugin.loader, {
					loader: 'css-loader'
				}]
			}
		]
  	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin()
	]
}
