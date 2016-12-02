'use babel';
var provider = require('./provider');

module.exports = {
  config: {
    stepDefinitionGlob: {
      type: 'string',
      title: 'Step Definitions Pattern',
      default: '**/features/step_definitions/**/*.js',
      description: 'Pattern matching the files with step definitions in them'
    }
  },
  getProvider: function() {
    return provider;
  }
};
