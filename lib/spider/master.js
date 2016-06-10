/**
 * @file master
 * @desc 爬虫的主进程
 * @author zhuyingda
 */

var path = require('path');
var spawn = require('child_process').spawn;

var binPath = path.join(__dirname, '..', 'phantomjs_mac', 'bin', 'phantomjs');
var runPath = path.join(__dirname, 'phantom_script.js');

var cp = spawn(binPath, [runPath, "http://xiao.youxi.com"]);
cp.stdout.pipe(process.stdout);
cp.stderr.pipe(process.stderr);

cp.on('error', function (err) {
  console.error('Error executing phantom at', binPath)
  console.error(err.stack)
})

cp.on('exit', function(code){
  // Wait few ms for error to be printed.
  setTimeout(function(){
    process.exit(code)
  }, 20)
});

process.on('SIGTERM', function() {
  cp.kill('SIGTERM')
  process.exit(1)
})
