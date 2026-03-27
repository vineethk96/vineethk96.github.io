const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove CRA's ModuleScopePlugin so aliased node_modules paths are allowed
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        plugin => !(plugin instanceof ModuleScopePlugin)
      );
      // Force all React imports to the single root copy (fixes duplicate instance from --legacy-peer-deps)
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      };
      // Stub out PostHog in development — avoids loading the 36MB SDK in the dev bundle
      if (process.env.NODE_ENV !== 'production') {
        webpackConfig.resolve.alias['posthog-js'] = path.resolve(__dirname, 'src/utils/posthog-stub.js');
        webpackConfig.resolve.alias['posthog-js/react'] = path.resolve(__dirname, 'src/utils/posthog-stub.js');
        // Cheaper source maps: drops column precision but keeps line numbers, cuts ~50-70% source map memory
        webpackConfig.devtool = 'eval-cheap-source-map';
      }
      webpackConfig.ignoreWarnings = [/Failed to parse source map/];
      return webpackConfig;
    },
  },
};
