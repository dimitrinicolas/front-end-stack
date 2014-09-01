
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