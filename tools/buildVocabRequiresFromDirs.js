// Node.js script to build a list of requires necessary for webpack to
// statically require things from the set of formats/ directories.
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var pwd = __dirname.toString();
var config = {
  repos_path: pwd + '/' 
              + (pwd.match(/tools/) ? '../' : '')
              + 'format-repos/',
  vocabs_path_in_repo: 'vocabs/',
  output_path: pwd + '/'
               + (pwd.match(/tools/) ? '../' : './')
               + 'tools-build/vocabs.js',
};
config.repos_path = path.normalize(config.repos_path);
config.vocabs_path_in_repo = path.normalize(config.vocabs_path_in_repo);
config.output_path = path.normalize(config.output_path);


//------------------------------------------------------
// Helpful functions
//------------------------------------------------------

function getVocabsFromDir(basepath) {
  if (!fs.lstatSync(basepath).isDirectory()) {
    console.log('ERROR: vocabs path ('+basepath+') for getVocabsFromDir is not a directory.');
    return {};
  }
  var dir_contents = fs.readdirSync(basepath);
  // This one is simple: each entry here should be a folder with an 'index.js' inside it.
  // Require that directly here, get the list of terms from it, and use that (combined with 
  // the vocab function) to put all the vocab schemas into this object
  return _.reduce(dir_contents, function(result,vocabname) {
    var v = require(basepath + '/' + vocabname);
    var known_terms = v();
    result[vocabname] = _.reduce(known_terms, function(term_collection, t) {
      term_collection[t] = v(t); // call the vocab function on 't' to get the actual schema for it
      return term_collection;
    },{});
    return result;
  },{});
}

function getKnownRepos(basepath) {
  if (!fs.lstatSync(basepath).isDirectory()) {
    console.log('ERROR: base path ('+basepath+') for getKnownRepos is not a directory.');
    return {};
  }
  var dir_contents = fs.readdirSync(basepath);
  return _.reduce(dir_contents, function(results,repo_name) {
    results[repo_name] = getVocabsFromDir(basepath + repo_name + '/' + config.vocabs_path_in_repo.replace(/\/$/,''));
    return results;
  },{});
}



//-----------------------------------------------------------
// Load the vocabs for each repo:
//-----------------------------------------------------------

var repos = getKnownRepos(config.repos_path);

//----------------------------------------------------------
// Build a string with final file contents and write file.
//----------------------------------------------------------

var str = '// WARNING: this file is auto-generated by tools/buildVocabRequiresFromDirs.  Don\'t change it.\n';
str += 'module.exports = '+JSON.stringify(repos, false, '  ')+';\n';
fs.writeFileSync(config.output_path, str);
console.log(path.normalize(config.output_path) + ' written successfully');


