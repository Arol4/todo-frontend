# **Procédure de lancement du Frontend en local**
## **Pré-requis**
    1. Installer Node.js dans son PC;
    2. Avoir déployé en local le projet https://github.com/Arol4/todo-api selon son README
## **Procédure**
1. Cloner ce répo avec la commande ``git clone https://github.com/Arol4/todo-frontend``;
2. Dans le répertoire courant du repertoire cloné, lancer la commande ``npm install``;
3. Dans le fichier *src/services/api.jsx*,  remplacer la ligne 4 par `baseURL: 'http://localhost:5000/api', `
4. Dans ce même répertoire, lancer la commande ``npm start``;
5. Ouvrir le lien *http://localhost:3000* dans le navigateur;