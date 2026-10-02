# Backend - TP5

API Node.js / Express permettant de gérer des tâches stockées dans PostgreSQL.

## Technologies

- Node.js
- Express
- PostgreSQL
- Docker
- Docker Compose

## Installation

Créer un fichier `.env` dans le dossier Backend à partir de `.env.example`.

Exemple :

DB_USER=user
DB_PASSWORD=mot-de-passe
DB_NAME=data

Puis lancer :

docker compose up -d --build

L'API est disponible sur :

http://localhost:3000

## Routes

### Récupérer les tâches

GET /tasks

Filtres :

GET /tasks?status=completed

GET /tasks?status=pending

### Ajouter une tâche

POST /tasks

Exemple :

{
  "id": 4,
  "titre": "Nouvelle tâche",
  "complete": false,
  "assignee": "Paul"
}

### Modifier une tâche

PUT /tasks/:id

### Modifier le statut d'une tâche

PATCH /tasks/:id/completed

Cette route inverse le statut :

false -> true
true -> false

### Retirer le bénévole

PATCH /tasks/:id/assignee

Le prénom associé à la tâche est supprimé sans supprimer la tâche.

### Supprimer une tâche

DELETE /tasks/:id

La suppression de la tâche supprime également le prénom qui lui était associé.

## Sécurité

- Les identifiants PostgreSQL sont stockés dans `.env`.
- Le fichier `.env` n'est jamais envoyé sur GitHub.
- `.env.example` sert de modèle.
- CORS autorise uniquement le frontend.
- L'API ne journalise pas le contenu des requêtes.
- Les requêtes SQL utilisent des paramètres.
- `npm audit` : 0 vulnérabilité.
- Le conteneur API utilise l'utilisateur `node`.

## RGPD

L'application utilise uniquement le prénom du bénévole pour indiquer à qui une tâche est attribuée.

Donnée collectée :
- prénom du bénévole

Durée de conservation :
- le prénom est conservé tant que la tâche existe
- il peut être retiré sans supprimer la tâche

Accès :
- les utilisateurs de l'application peuvent voir le prénom associé à une tâche

Droits :
- le prénom peut être supprimé avec le bouton "Retirer le bénévole"
- supprimer la tâche supprime également le prénom associé

Aucun outil de tracking, pixel publicitaire ou outil statistique n'est utilisé.