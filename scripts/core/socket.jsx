
/**
 * core/socket.js
 *
 * Socket var define
 */

var socket = io.connect('http://localhost:3000');

Application.socket = socket;

console.log(socket);