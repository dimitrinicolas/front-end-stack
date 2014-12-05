# MarmWork

Commencer un projet rapidement en Sass et JavaScript avec MarmWork.

![MarmWork](marmwork.jpg "marmwork")

## Dépendances

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

###Comment utiliser le gestionnaire de components

Installer le gestionnaire globalement avec la commande `npm install -g cm` à la racine du projet

Pour créer un nouveau modèle de component, on lance la commande `cm create header`

Si ce component comporte des sous éléments, on les rajoute à la suite de son nom : `cm create header logo nav`. Cela va créer et organiser les classes `header`, `header__logo` et `header__nav`.