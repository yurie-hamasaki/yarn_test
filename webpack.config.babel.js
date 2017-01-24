import 'babel-polyfill';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

export default {

	entry: path.join(__dirname, './src/js/app.js'),

	output: {

		publicPath: '',
		sourcePrefix: '  ',
		path: path.join(__dirname, 'public/'),
		filename: 'js/bundle.js',

	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				// includeを使わずnode_modulesディレクトリをロード対象から除外する場合
				// exclude: /node_modules/,
				include: [
					path.resolve(__dirname, 'src')
				],
				loader: 'babel'
			},
			{
				test: /\.pug$/,
				loader: 'pug'
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?sourceMap!postcss-loader!resolve-url!stylus-loader'
				)
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader',
				query: {
					publicPath: '../images/',
					outputPath: '/images/',
					name: '[name].[ext]',
				}
			}
		],
	},

	postcss: [

		autoprefixer({
			browsers: [
				'IE 9', 'IE 10', 'IE 11', 'last 2 versions']
		})

	],

	// 読み込む際に拡張子を省略できるようにする
	// require('settings.js') ->require('settings')
	resolve: {

		extensions: ['', '.js', 'styl', 'stylus'],

		alias: {
			images: path.join(__dirname, 'public/images')
		}

	},

	plugins: [
		// JSファイルを読み込むようになっているindex.htmlを生成する
		new HtmlWebpackPlugin({
			template: 'src/pug/index.pug',
		}),

		// コンパイルされたファイルを別名にして読み込めるようにする[name].jsなど
		// stylusからcssに書き出すディレクトリを設定
		new ExtractTextPlugin('css/main.css'),

		// よく使われるモジュールに降るIDの桁数をより短くするコードを圧縮
		new webpack.optimize.OccurenceOrderPlugin(),

		// ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
		new webpack.optimize.DedupePlugin(),

		// デバッグコードを除去など
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true, warnings: VERBOSE
			}
		}),

		//ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する
		new webpack.optimize.AggressiveMergingPlugin(),

		// 文字列に置き換えてES6の記述をES5に変換する
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `"${process.env.NODE_ENV || (DEBUG ? 'development' : 'production')}"`
		}),
		...(DEBUG ? [] : [

			// ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
			new webpack.optimize.DedupePlugin(),

			// デバッグコードを除去など
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					screw_ie8: true, warnings: VERBOSE
				}
			}),

			//ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する
			new webpack.optimize.AggressiveMergingPlugin(),

			/*
			 * ・globalに書かず指定した変数を他のモジュール内で使用できるようにする
			 * new webpack.ProvidePlugin({
			 *  	jQuery: 'jquery',
			 * 		$: 'jquery',
			 * 		jquery: 'jquery'
			 * })
			 *
			 * ・js側
			 * import $ from 'jquery';
			 * */

		]),

	]

};