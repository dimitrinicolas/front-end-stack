
/**
 * core/socket.js
 *
 * Initialisation de socket.io
 */

var httpServer = http.createServer(),

	io = new socketIo();

httpServer.listen(3000);

io.listen(httpServer);

io.sockets.on("connection", function(socket) {

	Actions.initListeners(socket);

});