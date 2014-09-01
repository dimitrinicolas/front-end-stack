
/**
 * core/log.js
 *
 * Fonction de log du serveur.
 */

function log(message, type) {

	if (!message) { return; }

	if (typeof message !== "string") {

		console.log(message);

	}

	else {

		if (type === "error") {

			var intro = "\x1B[31m\x1b[1m",
				outro = "\x1B[39m";

		}

		else if (type === "good") {

			var intro = "\x1B[36m\x1b[1m",
				outro = "\x1B[39m";

		}

		else {

			var intro = "\x1B[29m\x1b[1m",
				outro = "\x1B[39m";

		}

		console.log(intro + message + outro);

	}

}