Guide d'utilisation de Biome dans un projet TypeScript

1\. Pourquoi choisir Biome ?

Biome permet de remplacer les extensions et outils suivants :

-   Prettier (formatteur de code)

-   ESLint (analyseur de code statique)

1.1 Prettier vs Biome

Prettier est un outil de formatage de code qui applique des règles de style définies, garantissant un code propre et lisible. L'objectif principal est de rendre le code plus maintenable en l'alignant sur des standards définis.

Biome intègre ces fonctionnalités de formatage, supprimant ainsi le besoin d'utiliser Prettier séparément.

1.2 ESLint vs Biome

ESLint est un analyseur de code statique permettant de détecter les erreurs courantes, telles que :

-   Les erreurs de syntaxe

-   Les problèmes de formatage

-   Les violations des règles de style

-   Les bogues potentiels

Biome remplace également ESLint en intégrant un moteur d'analyse statique performant.

1.3 Suppression des dépendances inutiles

Lors du passage à Biome, il est recommandé de désinstaller les extensions suivantes de VS Code et les dépendances associées dans le projet :

Extensions VS Code à désinstaller :

-   Prettier

-   ESLint

Librairies npm à désinstaller :

npm uninstall eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react prettier prettier-plugin-tailwindcss

En moyenne, cela permet de réduire la taille du projet en supprimant 10 dépendances inutiles.

* * * * *

2\. Configuration de Biome

2.1 Ajout du fichier biome.json

Le fichier biome.json permet de configurer Biome pour adapter son comportement à vos besoins.

Ignorer certains fichiers et dossiers Dans la section files, nous ajoutons une configuration pour exclure node_modules et tsconfig.node.json :

"files": {

  "ignoreUnknown": false,

  "ignore": ["node_modules", "frontend/tsconfig.node.json"]

}

Configuration des règles de linting Les règles de linting remplacent celles d'ESLint. Voici quelques règles essentielles :

"linter": {

  "rules": {

"correctness": {

    "noUnusedImports": "error",

    "noUnusedVariables": "error",

    "useExhaustiveDependencies": "warn"

}

  }

}

Explication des règles :

-   noUnusedImports: Émet une erreur si des imports non utilisés sont détectés.

-   noUnusedVariables: Émet une erreur si des variables déclarées ne sont jamais utilisées.

-   useExhaustiveDependencies: Émet un avertissement si les dépendances d'un useEffect ne sont pas correctement déclarées.

* * * * *

3\. Configuration de VS Code

Pour que VS Code utilise Biome correctement, ajoutez les configurations suivantes dans .vscode/settings.json :

"editor.codeActionsOnSave": {

  "quickfix.biome": "explicit",

  "source.organizeImports": "always"

},

"editor.defaultFormatter": "biomejs.biome"

Explication des paramètres :

-   quickfix.biome": "explicit" → Applique uniquement les corrections Biome lorsqu'elles sont déclenchées manuellement.

-   source.organizeImports": "always" → Réorganise et supprime automatiquement les imports inutilisés à l'enregistrement.

-   editor.defaultFormatter: Définit Biome comme formateur par défaut pour éviter d'utiliser Prettier ou ESLint.

* * * * *

4\. Exécution des commandes

Après installation et configuration, exécutez les commandes suivantes pour appliquer le formatage et le linting :

npm run format

npm run lint

-   npm run format → Applique le formatage Biome à tout le projet.

-   npm run lint → Vérifie la conformité du code avec les règles définies dans biome.json.

* * * * *

5\. Intégration continue (CI/CD)

Biome permet d'être utilisé avec GitHub Actions et les Pull Requests pour formater uniquement les fichiers modifiés.

Ajoutez la section suivante dans biome.json :

"vcs": {

  "enabled": true,

  "clientKind": "git",

  "useIgnoreFile": true,

  "defaultBranch": "dev"

}

Cela permet d'instruire Biome pour qu'il ne formate que les fichiers modifiés depuis la dernière commande.

Commande pour n'exécuter le formatage que sur les fichiers modifiés :

npx biome format --changed

* * * * *

6\. Conclusion

En adoptant Biome, nous avons :

-   Supprimé Prettier et ESLint ainsi que leurs dépendances.

-   Réduit la taille des dépendances du projet.

-   Simplifié la configuration de formatage et de linting.

-   Intégré un formateur et un analyseur statique performants dans un seul outil.

-   Optimisé l'intégration continue pour ne formater que les fichiers modifiés.

Avec cette configuration, votre projet est propre, optimisé et facile à maintenir grâce à Biome.