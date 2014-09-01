
/**
 * core/node-modules.js
 *
 * Définition des modules nodeJs utilisés.
 */

var http = require("http"),

	socketIo = require("socket.io"),

	sha1 = require("sha1"),

	mysql = require("mysql"),

	ip = require("ip")

	useragent = require("useragent");

/**
 * core/main.js
 *
 * Création de la variable principale "server".
 */

var server = {

	website: "MarmWork",

	sessions: {}

};

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

/**
 * core/utils/each.js
 *
 * Créer simplement une boucle dans un objet.
 */

function each(object, fn) {

	if (typeof object === "object") {

		if (object instanceof Array) {

			var length = object.length,
				i;

			for (i = 0; i < length; i++) {

				fn(object[i], i);

			}

		}

		else {

		    for (var name in object) {

		        if (object.hasOwnProperty(name)) {

		        	fn(object[name], name);

		        }

		    }

		}

	}

}

/**
 * core/utils/is-function.js
 *
 * Vérifier si une variable est une fonction.
 */

function is_function(fn) {

	return typeof fn === "function";

}

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

/**
 * modules/Session/main.js
 *
 * Fichier principal du module Session.
 */

var Session = function(socket) {

	var now = Date.now();

	this.ip = ip.address();
	this.socketId = socket.id;

	this.referer = socket.client.request.headers.referer;
	this.userAgent = socket.client.request.headers["user-agent"];
	this.acceptLanguage = socket.client.request.headers["accept-language"];
	this.language = this.acceptLanguage.substr(0, 2);

	this.time_start = now;

	var useragent_parsed = useragent.parse(this.userAgent);

	this.client = {

		navigator: useragent_parsed.family,
		navigator_version: useragent_parsed.major,

		os: useragent_parsed.os.family,
		device: useragent_parsed.device.family

	};

	log("New Session `" + this.socketId + "`");

};

/**
 * actions/intro.js
 *
 * Introduction de la définition des Actions.
 */

var Actions = {};

Actions.initListeners = function(socket) {

/**
 * actions/session/connection.js
 *
 * Initialisation d'une Session.
 */

var session = new Session(socket);

server.sessions[session.socket_id] = session;

/**
 * actions/outro.js
 *
 * Fermeture des Actions.
 */

};

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