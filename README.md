# MarmWork

> Commencer un projet facilement en Sass et JavaScript avec MarmWork.

## Dépendances
Require NodeJs, Ruby et Grunt `~0.4.0`

MarmWork nécessite plusieurs dépendances indispensables :

###NodeJs

Si NodeJs n'es pas installé sur votre ordinateur : [nodejs.org](http://nodejs.org/)

###Ruby

Si Ruby n'est pas installé sur votre ordinateur sous Windows : [rubyinstaller.org](http://rubyinstaller.org/) Attention ! Il faut absolument cocher la case "Add Ruby executables to your PATH".

*Ruby est normalement déjà installé sur Mac et Linux*

###Sass

Il faut maintenant installer Sass dans votre dossier, pour cela, ouvrez l'invite de commande dans votre dossier et lancez cette commande :

```shell
gem install sass
```

###Grunt et ses plugins

Pour installer Grunt et ses plugins, il sufit de lancer cette commande encore une fois dans la racine de votre dossier :

```shell
npm install
```

##Lancer les processus de compilations

Pour lancer les processus de compilation du Sass et du JavaScript, il suffit de lancer cette commande dans le dossier :

```shell
grunt
```

Pour éviter de devoir lancer la compilation à chaque modification, on peut utiliser cette commande :

```shell
grunt auto
```