
/**
 * core/onload.js
 *
 * Callback lors du chargement complet du script serveur.
 */

server.loadListeners = [];

function $(callback) {

	if (typeof callback === "function") {

		server.loadListeners.push(callback);

	}

}