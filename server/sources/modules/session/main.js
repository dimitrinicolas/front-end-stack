
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