
# Démarrer le projet

## 1. Démarrer le Backend

Depuis la racine du projet :

cd Backend
docker compose up -d --build

L'API est disponible sur :

`http://localhost:3000`

## 2. Démarrer le Frontend

Ouvrir un deuxième terminal puis :

cd frontend
npm install
npm run dev

L'application est disponible sur :

`http://localhost:5173`

## Arrêter le projet

Dans le dossier `Backend` :

docker compose down




## Questions 

### Pourquoi aucune variable VITE_ ne contient de secret ?

Les variables VITE sont intégrées dans le JavaScript envoyé au navigateur.

### Pourquoi la validation du frontend ne suffit pas ?

Le frontend peut être contourné en envoyant directement une requête à l'API.

### Pourquoi l'application n'a pas besoin de bandeau cookies ?

L'application n'utilise aucun outil de tracking, pixel publicitaire ou autre outils de tracking.
