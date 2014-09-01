
/**
 * actions/session/connection.js
 *
 * Initialisation d'une Session.
 */

var session = new Session(socket);

server.sessions[session.socket_id] = session;