'use babel';
var provider = require('./provider');

module.exports = {
  config: {
    featuresPath: {
      type: 'string',
      title: 'Path',
      default: '/features',
      description: 'This is the relative path (from your project root) to your projects features directory.'
    },
    stepDefinitionPath: {
      type: 'string',
      title: 'Path',
      default: '/step_definition',
      description: 'This is the relative path (from your project root) to your projects step_definition directory.'
    }
  },
  activate: function() {
    return provider.load();
  },
  getProvider: function() {
    return provider
  }
};
