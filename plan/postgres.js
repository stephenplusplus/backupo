/**
 * postgres.js
 * 
 * Backup postgres db.
 */
var exec = require('child_process').exec,
  os = require('os'),
  debug = require('debug')('backupo');
module.exports.backup = function(option, cb) {
  var date = new Date();
  var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getTime();
  var file = os.tmpdir() + '/' + option.db + '-db-' + dateStr + '.gz';
  debug('postgres.js', file);
  var command = 'pg_dump -h localhost -U ' + option.user + ' ' + option.db + ' | gzip > ' + file;
  debug('postgres.js', command);
  var child = exec(command, function(error, stdout, stderr) {
    debug('postgres.js', 'stdout', stdout);
    debug('postgres.js', 'stderr', stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  child.on('exit', function(code, signal) {
    console.log('Backup success, file path is : ', file);
    cb(null, file);
  });
}
