import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import path from 'path';

const isDevMode = process.env.NODE_ENV === 'development';

const commonConfig: webpack.Configuration = {
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          { loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, },
          { loader: 'css-loader', },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            }
          },
        ],
      },
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: [
          { loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, },
          { loader: 'css-loader', },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            }
          },
          { loader: 'less-loader', },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          { loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, },
          { loader: 'css-loader', },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            }
          },
          { loader: 'sass-loader', },
        ],
      },

      // 处理图片文件
      {
        test: /\.(jpg|jpeg|png|gif|bmp|svg)$/i,
        type: 'asset',
        exclude: /node_modules/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,   // 这边设置为小于10kb转base64位，默认是小于8kb
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },

      // 处理字体
      {
        test: /\.(woff2?|otf|ttf|eot)$/i,
        type: 'asset',
        exclude: /node_modules/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,   // 小于10kb转base64位，默认是小于8kb
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },

      // 处理媒体
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: 'asset',
        exclude: /node_modules/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,   // 小于10kb转base64位，默认是小于8kb
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,   // 自动注入静态资源
      favicon: 'public/favicon.ico',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@styles': path.resolve(__dirname, '../src/styles'),
    },
    modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
    symlinks: false,
  },
  cache: {
    type: 'filesystem', // 使用文件缓存
  }
};

export default commonConfig;
