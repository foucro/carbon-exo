Carte aux trésors
=================

Contexte
--------
Réalisation d'un exercice technique précisé dans le fichier `consigne.txt`. 

J'ai choisi le javascript et les techonologies web en général puisque c'est là où je suis le plus à l'aise étant spécialisé dans le développement front end.

Ceci dit j'ai rarement l'occasion de travailler avec du javascript natif mais ça n'avait pas trop de sens d'utiliser un framework front pour réaliser ce type d'exercice. 

### Règles
Quelques précision sur les règles que j'ai mises en place.
* Si le fichier d'entrée ne contient pas de joueur ou pas de trésor, la partie ne se lance pas
* Si un joueur A veut se déplacer sur une case où il y a un joueur B qui va se déplacer dans le même tour, c'est impossible (ex: 2 joueurs côte à côte ne peuvent pas échanger leurs places)
* Si une montagne et un trésor ont les même coordonnées, le trésor l'emporte
* Si le joueur démarre sur une montagne il peut descendre

How to
------

### Lancer 
On a juste besoin d'un navigateur et d'y ouvrir le fichier `index.htm`.

### Utiliser
Via le bouton d'ajout de fichier, on peut insérer un fichier d'inputs(exemples dans le dossier `examples`).

Ensuite, on a 3 boutons : 
* un bouton pour avancer d'un seul tour
* un bouton pour avancer tour à tour jusqu'au bout
* un bouton pour aller directement à la position finale

A la fin, un textarea s'affiche avec les données de sortie et un bouton donne la possibilité de télécharger le texte dans un fichier.

### Tester
Toujours dans le navigateur ouvrir le fichier `test/test.htm`.

