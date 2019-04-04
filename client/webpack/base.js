var path = require('path');

module.exports = {
	context: path.resolve(__dirname, '..'),
	entry: './src',
	output: {
		path: path.resolve('./static/build/'),
		filename: '[name]-[hash].js'
	},
	resolve: {
		alias: {
			app: path.resolve(__dirname, '../src/app'),

			components: path.resolve(__dirname, '../src/app/components'),
			form: path.resolve(__dirname, '../src/app/components/form'),

			modules: path.resolve(__dirname, '../src/app/modules'),

			containers: path.resolve(__dirname, '../src/app/containers'),
			pages: path.resolve(__dirname, '../src/app/pages'),
			
			api: path.resolve(__dirname, '../src/api'),
			models: path.resolve(__dirname, '../src/api/models'),
			collections: path.resolve(__dirname, '../src/api/collections/index.js'),
			
			lib: path.resolve(__dirname, '../src/lib'),
			
			auth: path.resolve(__dirname, '../src/lib/auth'),
			router: path.resolve(__dirname, '../src/lib/router'),
			component: path.resolve(__dirname, '../src/lib/component'),
			template: path.resolve(__dirname, '../src/lib/template'),

			styles: path.resolve(__dirname, '../src/styles'),
			imports: path.resolve(__dirname, '../src/styles/_imports.scss')
		}
	},
	plugins: [],
	module: {
		rules: [{
			test: /\.s?css$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}, {
			test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: "url-loader"
		},
		{
			test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
			use: 'file-loader'
		}]
	}
};

