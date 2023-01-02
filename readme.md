# Application de gestion des réservations pour l'entreprise LOCAMAT (projet génie logiciel)
Cette application a été développée à l'occasion du cours de Génie Logiciel pour la partie concernant les tests autours d'un projet.

### Groupe de projet
Polytech Groupe 2 (2022-2023)
- Alain CHAMPIGNY
- Chloé DUAULT
- Killian DENÉCHÈRE
- Teddy ASTIE
- Théo DAVOUST

### Nos choix techniques
Pour mettre en place ce projet, nous avons fait plusieurs choix techniques listés ci-dessous :

##### Langage
Nous nous sommes tournés vers le langage de développement "Javascript" car l'utilsiation de ce dernier est majoritairement orientée web.
##### Server / Back-end
Afin de construire une architecture client/serveur en Javascript, nous nous sommes tournés vers "Node.js" et son estionnaire de paquets "npm".
Ainsi, nous avons contruit notre serveur grâce à la librairie "Express.js".
Les données sont sauvegardées dans un fichier "JSON" qui sont ensuites lues et instanciées dans des classes écrites en "Typescript" qui est compilé pour fomrer des fichiers "Javascript".
##### Front-end
Pour ce qui est de la partie visible de l'application, nous avons souhaité mettre en place un système de modèles, c'est-à-dire des vues dont le contenu n'est pas fixe : il est dynamiquement généré au chargement de la page.
Pour faire cela, nous utilisons le paquet et les fichiers "ejs" qui sont en réalité du "html" dans lequel sont insérés des variables transmises par le serveur.
Pour que l'affichage soit agréable à observer et à utiliser, nous avons intégré des fichiers de style écrits en "SCSS" qui est compilé en fichier "CSS" ensuite importés dans les pages web.
De même, pour rendre l'utilisation de nos pages dynamique et ne pas avoit à recharger la page courante à chaque utilisation d'un bouton, nous avons intégré des scripts "Javacript" dans les pages.
##### Tests
Pour s'assurer du bon fonctionnement de notre application, nous avons utilisé les méthodes fournits par le paquet "assert" de base de Node.js.
À cela, nous avons rajouté l'utilisation du paquet "Mocka" qui nous permet de tester nos classes, structures de données.
En ce qui concerne le test de nos interfaces, nous nous sommes tournés vers le paquet "Sélémnium".

### Organisation du projet
Depuis la racine, voici l'organisation du projet suivant un modèle MVC (modèles, vues, controlleurs):
- `lib/` Dossier contenant les classes format la structure des données de l'application (ce sont des fichiers TypeScript à compiler pour obtenir des fichiers Javascript utilisés par l'application).
- `public/` Dossier cotentant toutes les ressources accessibles au serveur web. Cela comprend donc les images/icones, les fichiers de styles et scripts nécéssaires au fonctionnement et au bon affichage des pages web. 
- `routes/` Dossier contenant les fonctions exécutées par le serveur en fonction de chaque route (url) de l'application sur laquelle se rend une personne via l'interace web.
- `tests/` Dossier contenant tous les fichiers Javascripts permettant l'exécution des tests sur les classes que nous avons créées, mais aussi sur l'interface web grâce à selenium.
- `tests/report/` Dossier contenant le rapport de test au format html.
- `translations/` Dossier contenant les traductions des messages d'erreurs pour les langues Français et Anglais.
- `views/` Dossier contenant les diffférentes vues correspondantes à différentes routes de l'application.
- `db.jdon` Fichier contenant les données de l'application de façon persistante de sorte que les données utilisées par l'application ne soient pas perdues une fois celle-ci fermée.
- `index.js` Fichier principal de l'application permettant le lancement du serveur et ainsi le fonctionnement des routes web.
- `package.json` Fichier contenant tous les modules dont l'application a besoin afin de fonctionner. 


### Comment lancer le projet
Vous pouvez lancer ce projet sous Windows tout comme sous Linux.
Pour cela, il faut posséder une version de Node.js v17.0.1 ou supérieur.
Une fois Node.js installé, le gestionnaire de paquets `npm` associé à Node.js doit être installé par défaut.

À la racine du projet, effectuez les commandes suivantes :
```bash
# Pour installer les paquets nécéssaires au lancement du projet
npm install

# Pour lancer le projet, puis rendez-vous dans votre navigateur à l'url http://localhost:5000
node index.js

# Pour lancer les tests
npm run test 
```