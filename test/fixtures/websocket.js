(function() {
  // all we need to do is verify that the socket is opened that is
  // enough to tell us that the plugin works....
  new WebSocket('ws://localhost:60001');
}());
