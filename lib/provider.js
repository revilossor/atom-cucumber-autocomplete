'use babel';

const STEP_DEFINITION_GLOB_CONFIG_KEY = 'cucumber-autocomplete-multipath.stepDefinitionGlob';
const CUCUMBER_STEP_DEF_PATTERN = /(Given|And|When|Then)\(\/\^(.*?)\$/g;
const GROUP_CAPTURE = /([^\\]?)(\(.*?(?:[^\\])\))/g;

function makeSuggestion(match) {
  
  try {
    CUCUMBER_STEP_DEF_PATTERN.lastIndex = 0;
    var subgroups = CUCUMBER_STEP_DEF_PATTERN.exec(match.lineText);
    
    var paramCount = 0;
    var snippet = subgroups[2].replace(GROUP_CAPTURE, (match, p1, p2) => {
      return `${p1}\${${++paramCount}:${p2}}`;
    });
    
    return {
      snippet: snippet
    };
  }
  catch(error) {
    console.error(error);
    console.error(match);
  }
  
}

module.exports = {
  selector: '.source.feature, .feature',
  filterSuggestions: true,
  
  getSuggestions: function( { editor } ) {

    return new Promise(function(resolve) {
      
      var pathGlob = [atom.config.get(STEP_DEFINITION_GLOB_CONFIG_KEY)];
      var projectPath = atom.project.relativizePath(editor.getPath())[0];
      var suggestions = [];
      atom.workspace.scan(CUCUMBER_STEP_DEF_PATTERN, { paths: pathGlob }, function(match) {
        if(match.filePath.startsWith(projectPath)) {
          match.matches.map(hit => {
            let suggestion = makeSuggestion(hit);
            if(suggestion) suggestions.push(suggestion);
          });
        }
      }).then(() => {
        suggestions.sort((a, b) => { return a.snippet.localeCompare(b.snippet); });
        resolve(suggestions);
      });
    });
  },
};
