suite('test-agent-firefox-launcher', function() {
  var spawn = require('child_process').spawn,
      executable = __dirname + '/../../bin/test-agent-firefox-launcher',
      firefox = __dirname + '/../../firefox',
      // this also spawns the server!
      url = testServer(),
      WebSocketServer = require('ws').Server;

  function launch(args) {
    var proc = spawn(executable, args);
    if (process.env.DEBUG) {
      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stderr);
    }
    return proc;
  }

  function verifyNonZeroExit(proc, done) {
    proc.on('exit', function(status) {
      assert(status !== 0, 'should exit process with a status other than 0');
      done();
    });
  }

  test('failure - no exec argument', function(done) {
    var proc = launch();
    verifyNonZeroExit(proc, done);
  });

  test('failure - missing firefox', function(done) {
    var proc = launch(['--exec', '/iam/not/heere']);
    verifyNonZeroExit(proc, done);
  });

  suite('success - launch', function() {
    var wsServer, proc;
    setup(function() {
      wsServer = new WebSocketServer({ port: 60001 });
    });

    teardown(function() {
      wsServer.close();
    });

    test('client connects to ws server', function(done) {
      proc =  launch(['--exec', firefox, url]);
      wsServer.on('connection', function() {
        proc.kill();
        proc.on('exit', function() {
          done();
        });
      });
    });
  });

});
