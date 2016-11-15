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
  formats_path_in_repo: 'formats/',
  output_path: pwd + '/'
               + (pwd.match(/tools/) ? '../' : './')
               + 'build/formats.js',
};
config.repos_path = path.normalize(config.repos_path);
config.formats_path_in_repo = path.normalize(config.formats_path_in_repo);
config.output_path = path.normalize(config.output_path);


//------------------------------------------------------
// Helpful functions
//------------------------------------------------------

function getTypesFromDir(path, parentString) {
  parentString = parentString || '';

  // make sure this is a folder:
  if (!fs.lstatSync(path).isDirectory()) {
    return {}; // if this is just a file, ignore it
  }

  // Get the list of files/folders in this folder
  var dir_contents = fs.readdirSync(path);
  
  // Figure out if this is a bottom-level directory (i.e. has a schema):
  if (_.includes(dir_contents, 'schema.js')) {
    // Get the list of all examples from 'examples/' folder
    var examples_list = fs.readdirSync(path+'/examples');
    // Build up an object for this media type with examples and schema:
    var type = {
      schema: 'require("'+path+'/schema.js'+'")',
      examples: _.reduce(examples_list, function(acc, ex) {
        acc[ex] = 'require("'+path+'/examples/'+ex+'")'
        return acc;
      }, {}),
    };
    // Return an object that contains this media type info at the proper key:
    var ret = {};
    ret[parentString] = type;
    return ret;
  }

  // Otherwise, loop through all files in this folder and look for types in them:
  return _.reduce(dir_contents, function(acc, l) {
    // Normally, type strings are built with 'dots' between names
    var combiner = '.';
    // But if it's the +json on the end, no combining string is needed (the '+' is the combiner)
    if (l.startsWith('+')) combiner = '';
    // And the first one (application) should end with a '/'
    if (parentString === 'application') combiner = '/';
    if (parentString === '') combiner = '';
    return _.merge(acc, getTypesFromDir(path+'/'+l, parentString + combiner + l));
  }, {});
}

function getKnownRepos(basepath) {
  if (!fs.lstatSync(basepath).isDirectory()) {
    console.log('ERROR: base path ('+basepath+') for getKnownRepos is not a directory.');
    return {};
  }
  var dir_contents = fs.readdirSync(basepath);
  return _.reduce(dir_contents, function(results,repo_name) {
    results[repo_name] = getTypesFromDir(basepath + repo_name + '/' + config.formats_path_in_repo.replace(/\/$/,''));
    return results;
  },{});
}



//-----------------------------------------------------------
// Run the recursive calls:
//-----------------------------------------------------------

var repos = getKnownRepos(config.repos_path);
// returns: repos[repo_name][type_path][schema] = "require(...)"
//                                     [examples][example_filename] = "require(...)"

//----------------------------------------------------------
// Build a string with final file contents and write file.
//----------------------------------------------------------

var str = '// WARNING: this file is auto-generated by tools/buildFormatRequiresFromDirs.  Don\'t change it.\n';
str += 'module.exports = {\n';
str += _.reduce(_.keys(repos), function(total_str, repo_key) {
  var types = repos[repo_key];
  return total_str
    + '  "' + repo_key + '": {\n'
    + _.reduce(_.keys(types), function(type_str, type_key) {
        var t = types[type_key];
        return type_str
          + '    "'+type_key+'": {\n'
          + '      schema: ' + t.schema + ',\n' // require('../formats/application/vnd/oada/bookmarks/1/+json/schema.js')
          + '      examples: {\n'
          + _.reduce(_.keys(t.examples), function(ex_str,e) {
            return ex_str + '        "' + e + '": ' + t.examples[e] + ',\n';
          },'')
          + '      },\n' // end examples
          + '    },\n'; // end type
      },'')
    + '  },\n';
},'');
str += '};';
fs.writeFileSync(config.output_path, str);
console.log(path.normalize(config.output_path) + ' written successfully');


