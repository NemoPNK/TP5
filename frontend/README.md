# Frontend - TP5

Interface React permettant de gérer les tâches de l'API du backend.

## Technologies

- React
- Vite
- Sass
- ESLint
- eslint-plugin-jsx-a11y

## Installation

Créer un fichier `.env` dans le dossier frontend à partir de `.env.example`.

Exemple :

VITE_API_URL=http://localhost:3000

Puis lancer :

npm install
npm run dev

L'application est disponible sur :

http://localhost:5173

## Fonctionnalités

- Afficher toutes les tâches
- Filtrer les tâches complétées
- Filtrer les tâches en attente
- Ajouter une tâche
- Supprimer une tâche
- Marquer une tâche comme complétée ou non
- Assigner un prénom à une tâche
- Retirer le prénom d'un bénévole sans supprimer la tâche
- Afficher des messages de succès ou d'erreur

## Accessibilité

L'interface respecte plusieurs bonnes pratiques d'accessibilité :

- un seul `<h1>`
- utilisation de `header`, `main`, `ul` et `li`
- labels visibles reliés aux champs
- boutons utilisables au clavier
- cases à cocher accessibles
- messages de succès avec `role="status"`
- messages d'erreur avec `role="alert"`
- navigation possible avec Tab, Entrée et Espace

Vérifications effectuées :

- Lighthouse Accessibilité : 100
- WAVE : aucune erreur bloquante relevée
- navigation clavier testée

## Sécurité

- l'URL de l'API est stockée dans `frontend/.env`
- aucune donnée sensible n'est placée dans une variable `VITE_`
- test XSS effectué avec :

<img src=x onerror=alert(1)>

Le contenu est affiché comme du texte et n'est pas exécuté.

- `npm audit` : 0 vulnérabilité

## RGPD

Le frontend permet d'associer uniquement un prénom à une tâche.

Le prénom :
- sert uniquement à attribuer une tâche
- peut être retiré sans supprimer la tâche
- est supprimé automatiquement si la tâche est supprimée

Un message d'information indique à l'utilisateur pourquoi le prénom est collecté.

Aucun outil de tracking, pixel publicitaire ou outil statistique n'est utilisé.

## Build de production

Pour générer la version de production :

npm run build

Pour la tester localement :

npm run preview