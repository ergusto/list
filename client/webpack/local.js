var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

var config = require('./base.js');

config.entry = [
	'webpack-dev-server/client?http://localhost:3000',
	'webpack/hot/only-dev-server',
	'./src'
];

config.output.publicPath = 'http://localhost:3000/static/build';

config.devtool = 'inline-source-map';

config.module.rules = config.module.rules.concat([{
	test: /\.js$/,
	include: path.join(__dirname, '../src'),
	use: [{
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env'],
			plugins: ["transform-class-properties"]
		}
	}]
}]);

config.plugins = config.plugins.concat([
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new BundleTracker({ filename: './client/webpack/stats.local.json' }),
]);

config.devServer = {
	host: '0.0.0.0', 
	port: 3000,
	historyApiFallback: true,
	headers: { 'Access-Control-Allow_Origin': '*' }
};

module.exports = config;