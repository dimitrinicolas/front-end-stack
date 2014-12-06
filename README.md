#MarmWork

Commencer un projet rapidement en Sass et JavaScript avec MarmWork.

![MarmWork](marmwork.jpg "marmwork")

##Dépendances

MarmWork nécessite plusieurs dépendances indispensables :

 - Installer NodeJs : [nodejs.org](http://nodejs.org/)
 - Installer Grunt : `npm install -g grunt-cli`
 - Installer les modules : `npm install`

##Lancer les processus de compilations

Pour lancer les processus de compilation du Sass et du JavaScript, il suffit de lancer cette commande dans le dossier :

```shell
grunt
```

Pour éviter de devoir lancer la compilation à chaque modification, on peut utiliser cette commande :

```shell
grunt dev
```

La commande `grunt dev` va également lancer un serveur proxy Browser Sync, vous pouvez définir votre adresse de développement local dans le fichier `dev.json`.