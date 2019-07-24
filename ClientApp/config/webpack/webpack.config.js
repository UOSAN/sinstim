const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const _ = require('lodash');

const paths = require('./../paths');

module.exports = (webpackEnv) => {
    const isEnvProduction = _.get(webpackEnv, 'production', false);

    return {
        mode: isEnvProduction ? 'production' : 'development',
        bail: isEnvProduction,
        devtool: isEnvProduction ? false : 'cheap-module-source-map',
        entry: {
            admin: paths.adminEntry,
            eligibility: paths.eligibilityEntry,
            survey: paths.surveyEntry
        },
        output: {
            path: paths.outputPath,
            filename: '[name].bundle.js',
            publicPath: '/js'
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules\//,
                loader: 'babel-loader'
            }, {
                test: /\.(scss|css)?$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.(eot|ttf|svg|gif|png|jpg|ico)(\?-5joh1s)?$/,
                loader: 'file-loader?name=/[name].[ext]'
            }]
        },
        plugins: [
            new CompressionPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin()
        ],
        resolve: {
            extensions: ['.js', '.jsx']
        },
        optimization: {
            minimize: isEnvProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true
                        }
                    },
                    parallel: true,
                    cache: true,
                    sourceMap: isEnvProduction
                })
            ]
        },
        node: {
            console: true,
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        }
    };
};
