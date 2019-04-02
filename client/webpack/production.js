var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = require('./base.js');

config.output.path = path.resolve('./static/dist/');

config.module.rules = config.module.rules.concat([{
	test: /\.jsx?$/,
	use: [{
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env'],
			plugins: ["transform-class-properties"]
		}
	}]
}]);

config.plugins = config.plugins.concat([
	new BundleTracker({ filename: './client/webpack/stats.production.json' }),

	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production')
		}
	}),
]);

config.optimization = {
	minimize: true
}

module.exports = config;
