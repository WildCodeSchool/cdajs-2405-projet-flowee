Documentation du Projet
=======================

Architecture du Projet
----------------------

Nous avons opté pour une **architecture n-tiers**, qui est une approche classique permettant d'organiser une application en couches distinctes. Chaque couche a un rôle bien défini, ce qui rend l'application **plus modulaire, évolutive et maintenable**.

Notre projet est structuré en **quatre couches** :

1.  **Couche de Données (Data Layer)**

    -   Cette couche correspond à notre **base de données PostgreSQL**.

    -   Elle stocke et gère les données de l'application.

    -   Elle est responsable de la persistance des données et de leur intégrité.

    -   Nous utilisons **TypeORM** pour la gestion des entités et des requêtes SQL.

2.  **Couche Métier (Business Layer)**

    -   Il s'agit de notre **backend**, qui implémente la logique métier de l'application.

    -   Il expose des API via **Apollo Server** (GraphQL).

    -   Il gère les règles métier, les validations et les interactions avec la base de données.

    -   Le backend est développé avec **Node.js, Express et TypeGraphQL**.

3.  **Couche de Présentation (Presentation Layer)**

    -   C'est notre **frontend**, qui est développé en **React avec Next.js**.

    -   Il est responsable de l'affichage des données et de l'interaction avec l'utilisateur.

    -   Il consomme l'API du backend pour récupérer et envoyer les données.

    -   Il utilise **Tailwind CSS** pour le stylisme et **React Query** pour la gestion des requêtes asynchrones.

4.  **Couche d'Intégration (Integration Layer)**

    -   Elle comprend les services tiers et l'orchestration entre les différentes couches.

    -   On y trouve la configuration des middlewares, des outils comme **Docker**, ainsi que l'intégration avec des services externes si nécessaire.

Développement et Maintenabilité
-------------------------------

-   **Monorepo** : Le projet est organisé en **monorepo**, permettant de centraliser le développement du frontend et du backend.

-   **Tests** :

    -   Tests unitaires dans le backend avec **Jest**.

    -   Tests d'intégration et end-to-end dans le frontend avec **Vitest**.

    -   Un **workflow GitHub Actions** est configuré pour l'exécution automatique des tests à chaque push.

-   **Déploiement** :

    -   Frontend hébergé sur **Vercel**.

    -   Backend déployé avec **Docker** et une base de données PostgreSQL hébergée.

Technologies Utilisées
----------------------

| Couche | Technologies |
| Data Layer | PostgreSQL, TypeORM |
| Business Layer | Node.js, Express, TypeGraphQL, Apollo Server |
| Presentation Layer | React, Next.js, Tailwind CSS, React Query |
| Integration Layer | Docker, GitHub Actions |

Conclusion
----------

Cette architecture permet de **séparer les responsabilités**, ce qui facilite la maintenance et l'évolution du projet. En utilisant des outils modernes et adaptés, nous assurons une bonne scalabilité ainsi qu'une organisation efficace du code.