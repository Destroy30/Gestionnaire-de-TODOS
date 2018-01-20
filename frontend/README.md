# Frontend : Gestionnaire de todo

*(Auteur : **Malo Gasquet**)*

Rendu pour le TP Vue-JS

## Sommaire

- [Instructions d'installation et de lancement](#instructions-dinstallation-et-de-lancement)

- [Fonctionnalités](#fonctionnalités)

  -[Liste des tâches](#liste-des-tâches)
  
  -[Détail des tâches](#détail-des-tâches)
  
  -[Creation de tâche](#creation-de-tâche)
  
  -[Mise à jour de tâche](#mise-à-jour-de-tâche)
  
  -[Suppression de tâche](#suppression-de-tâche)
  
  -[Pagination](#pagination)

- [Composants](#composants)

  - [Composant page](#composant-page)
  
  - [Composant TodosList](#composant-todoslist)
 
  - [Composant todo](#composant-todo)
  
  - [Composant todoForm](#composant-todoform)

  - [Composant createTodo](#composant-createtodo)
  
  - [Composant updateTodo](#composant-updatetodo)
  
- [Modules](#modules)

- [Conclusion et difficultés](#conclusion-et-difficultés)
  
## Instructions d'installation et de lancement

- Pour installer l'application, rendez vous dans le dossier frontend et éxécutez la commande suivante :

  *npm install*

- Pour le lancement :

  *npm run build*

L'application est normalement accessible, par défaut, à l'adresse http://localhost:8080

## Fonctionnalités

Cette partie va présenter les différentes fonctionnalités de l'application

### Liste des tâches

Tout d'abord, sur la page d'accueil, on peut voir la liste des tâches en cours de la plus récente à la plus ancienne.
Chaque liste possède un bouton pour :

- Voir la todo

- Mettre à jour la todo

- Supprimer la todo

Sur cette page d'accueil, tout en haut, est également disponnible un bouton pour créer une todo

![liste](https://user-images.githubusercontent.com/22858977/35188511-8c270786-fe36-11e7-81b7-5d306365c764.png)

Il est à noter que cette page présente 6 todos maximum, un système de pagination est mis en place, chaque page contenant une liste de 6 todos

### Détail des tâches

Le détail des tâches (leur description) est visible, via une modal, lors du clic sur le nom de la todo dans la liste

![detail](https://user-images.githubusercontent.com/22858977/35188510-8c0d7712-fe36-11e7-885b-7119fa7d983b.png)

### Creation de tâche

En cliquant sur le bouton "Ajouter une tâche", on accède à un formulaire de création de la tâche demandant un nom et une description.

![createButton](https://user-images.githubusercontent.com/22858977/35188504-8b74be32-fe36-11e7-9b3a-0f8c4972f6ea.png)

![create](https://user-images.githubusercontent.com/22858977/35188506-8ba868ae-fe36-11e7-85db-cae937ef4ab8.png)

Attention, le nom ne peut pas être vide, si vous entre un nom vide, la page vous préviendra et empêchera la création de la tâche.

![createBlocage](https://user-images.githubusercontent.com/22858977/35188505-8b8ea86a-fe36-11e7-8696-3396487ef583.png)

Une fois la tâche créee, on est ramené une page en arrière et la tâche est alors visible


### Mise à jour de tâche

Un bouton de mise à jour (crayon, bouton jaune) est disponible à côté de chaque todo dans la liste.
Ce bouton amène sur le même formulaire que pour la création de tâche, sauf que celui-ci est prérempli avec les données de la todo sélectionnée.

![updateButton](https://user-images.githubusercontent.com/22858977/35188515-8c89a9ae-fe36-11e7-9f2b-a35355409602.png)

![update](https://user-images.githubusercontent.com/22858977/35188514-8c70f2f6-fe36-11e7-9890-4f1d0a20497d.png)

Le fonctionnement et les règles (nom, retour en arrière...) sont les mêmes que pour la création.

### Suppression de tâche

En cliquant sur le bouton de suppression (croix, bouton rouge) à côté d'une tâche de la liste, celle-ci est immédiatement supprimée.

![deleteButton](https://user-images.githubusercontent.com/22858977/35188509-8bf5b7da-fe36-11e7-859d-64621d4da738.png)

La liste est automatiquement mise à jour, les tâches d'autres pages peuvent remonter également.

![deleteBefore](https://user-images.githubusercontent.com/22858977/35188508-8bdafdaa-fe36-11e7-9a6c-91a5137910e7.png)

![deleteAfter](https://user-images.githubusercontent.com/22858977/35188507-8bc1fe7c-fe36-11e7-93fc-87a7ae0cacac.png)

Si jamais il s'agit de la dernière tâche de la page, on est ramené une page en arrière (sauf pour la page d'accueil évidemment)

### Pagination

Un système de pagination est mis en place.
Chaque page contient une liste de 6 tâches.
Des boutons correspondants aux numéros de pages sont disponibles en bas de chaque page pour en changer.
Ces numéros de pages et leur contenu sont générées, affichés et mis à jour automatiquement lors de l'ajout/supression de todos

![pageButtons](https://user-images.githubusercontent.com/22858977/35188513-8c58244c-fe36-11e7-92a4-a1b5c6de943d.png)

![pageOther](https://user-images.githubusercontent.com/22858977/35188512-8c4089b8-fe36-11e7-88da-84936e41feb1.png)

(Par exemple, si on est sur la page 1 et qu'il y a 7 tâches, donc 2 pages, si on supprime une tâche de la page 1, la tâche de la page 2 remonte et le bouton pour aller à la page 2 disparait)

## Composants

Cette section va présenter le rôle de chaque composant de l'application

### Composant page

Ce composant va gérer l'affichage d'une TodoList spécifique correspondant au numéro de page donné.
Il s'agit du composant principal, c'est celui-ci qui est affiché sur l'accueil.
A la création, le composant va calculer le nombre de todo à afficher, et va initialiser le composant TodoList avec.

### Composant TodosList

Ce composant correspond à une liste de todos, elle va être initialisée en allant chercher les données de chaque todo sur l'API Node, par rapport au numéro de page, elle va donc faire uen requête en demandant un nombre spécifique de todo à partir d'un point de départ lui aussi spécifique à la page.
Enfin, avec les données récupérées, elle va initialiser chaque composant todo

### Composant todo

Ce composant gère l'affichage d'une todo.
Il s'agit d'une ligne avec :

- Un bouton avec le nom de la todo
- Un bouton modifier
- Un bouton supprimer

Et également une modal, cachée, avec la description de la todo.

Le composant fournit également une méthode pour se supprimer et déclenchera un évènement, interceptable par les composants parents afin de mettre à jour leur affichage

### Composant todoForm

Ce composant gère le formulaire de todo, avec un champ nom et un champ description.
Ce composant n'a pas pour objectif d'être affiché ou utilisé seul, il doit être utilisé par d'autres composants (createTodo et updateTodo) et couplé à des actions.

Il définit juste donc le corps d'un formulaire ré-utilisable

### Composant createTodo

Ce composant va utiliser le composant todoForm et définir l'action de création d'une todo.
Ce composant fera donc une requête spécifique vers l'API Node lors de la soumission du formulaire afin d'enregistrer la todo.
Il vérifie également les données (le nom) avant l'envoi des données

### Composant updateTodo

Ce composant va utiliser le composant todoForm et définir l'action de mise à jour d'une todo.
Ce composant fera donc une requête spécifique vers l'API Node lors de la soumission du formulaire afin de mettre à jour la todo.
Il vérifie également les données (le nom) avant l'envoi des données

## Modules

L'application utilise, pour son fonctionnement et son design, divers modules externes :

- Router : Pour la navigation entre les pages

- Axios : Pour les requêtes vers l'API Node

- SweetModal : Pour l'affichage de modal (détails des todos)

- Bootstrap : Pour la mise en forme

## Conclusion et difficultés

En conclusion, je pense que la partie Vue-JS a été la plus dure et la plus longue à mettre en place.

La principale difficulté était de réfléchir à un découpage intelligent des composants.
Une autre difficulté a également été la propagation des mises à jour vers les parents, notamment avec le système de pagination.
Enfin, un problème concernant les requêtes vers l'API Node a été fastidieux à corriger, j'ai dû installer le module cors sur l'API Node et rajouter le paramètre "withCredentials: true"  à toutes les requêtes de l'application Vue-JS afin de prendre en compte le cookie de session.

Je suis assez content du résultat, j'ai réussi à implémenter toutes les fonctionnalités du TD et à corriger tous les bugs que j'ai pu constater.

Pour plus de détails, n'hésitez pas à consulter le code, il est commenté au niveau de chaque composant.








