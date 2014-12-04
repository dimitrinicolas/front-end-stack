# MarmWork

> Commencer un projet facilement en Sass et JavaScript avec MarmWork.

![MarmWork](marmwork.jpg "marmwork")

## Dépendances
Require NodeJs et Grunt

MarmWork nécessite plusieurs dépendances indispensables :

###NodeJs

Si NodeJs n'es pas installé sur votre ordinateur sous Windows et Mac : [nodejs.org](http://nodejs.org/)

Pour GNU/Linux on installe NodeJs comme ceci : 

```shell
apt-get install nodejs
```

###Grunt et ses plugins

Pour installer Grunt et ses plugins, il sufit de lancer ces deux commandes dans la racine de votre dossier :

```shell
npm install -g grunt-cli
```
puis
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
grunt dev
```