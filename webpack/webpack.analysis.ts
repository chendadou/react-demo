import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import prodConfig from './webpack.prod';

const analysisConfig: webpack.Configuration = merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin(),
  ]
});

export default analysisConfig;
