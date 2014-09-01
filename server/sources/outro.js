
/**
 * outro.js
 *
 * Vérification de la variable "server"
 */

if (typeof server === "object") {

	log("Server started", "good");

	for (var i = 0; i < server.loadListeners.length; i++) {
		
		server.loadListeners[i]();

	}

}

else {

	log("Erreur: La variable `server` est invalide.", "error");

}