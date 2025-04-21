const { override, addWebpackPlugin } = require('customize-cra');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = override(
  config => {
    config.output.publicPath = 'auto';
    return config;
  },
  addWebpackPlugin(
    new ModuleFederationPlugin({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      exposes: {
        './TodoTable': './src/features/TodoTable/TodoTable.tsx',
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: '^19.1.0',
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^19.1.0',
        },
      },
    }),
  ),
);
