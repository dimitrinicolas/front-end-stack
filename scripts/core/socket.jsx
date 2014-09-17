
/**
 * core/socket.jsx
 *
 * Socket var define
 */

if (typeof io === "undefined") {

	console.error("Le serveur WebSocket n'est pas lancé.");

}

else {

	var socket = io.connect('http://localhost:3000');

	Application.socket = socket;

}