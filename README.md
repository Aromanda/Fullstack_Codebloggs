
***Login Page***

Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
    Client side: création de POST pour créer la session, afin de valider email et password. 

    Server side: le POST verifie les données (email, password), et si valide se connecte et crée un cookie propre pour le user. 

Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

    Frontend Action Only: mettre l'email et le password pour se connecter. Sinon, cliquer sur le lien en bas du boutton submit pour créer un user. 

    Client side: pas d'action

    Server side: pas d'action


***Registration page***

Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
    Client side: POST sur /user pour créer un user dans la database Mongodb

    Server side: il fait un POST pour aider à créer un nouveau record grace à un InsertOne. Il fait aussi un PATCH pour updater la db grace a UpdateOne.

Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

    Frontend Action Only: le client doit compléter les champs indiqués, et cliquer sur le bouton register. Un modal va apparaitre avec une fenetre de confirmation une fois les actions finies.

    Client side: Cliquer sur bouton register pour envoyer le POST

    Server side: pas d'action. 


***Main page***

Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
    Client side: Faire un Fetch pour passer en revue la liste des users pour afficher son profil.

    Server side: pas de données requises. 


Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

    Frontend Action Only: création dropdown pour afficher paramètre du compte et deconnexion. Cliquer sur les boutons pour nous rediriger vers les autres pages.

    Client side: création dropdown pour afficher paramètre du compte et deconnexion. Cliquer sur les boutons pour nous rediriger vers les autres pages.

    Server side: pas d'action.


***Publication page***

Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
    Client side: création d'un POST pour générer les publications. 

    Server side: Envoie de la création de la publication vers une collection Mongodb.


Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

    Frontend Action Only: cliquer sur le bouton "post" pour générer la publication. Cliquer sur les autres boutons pour aller dans les autres pages ou sur le menu deroulant.

    Client side: cliquer sur le bouton "post" pour générer la publication. Cliquer sur les autres boutons pour aller dans les autres pages ou sur le menu deroulant.

    Server side: enregistrer les publications passées dans la db Mongo.

***User view page***

Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
    Client side: Faire un GET pour avoir les données utilisateur. Faire un GET pour avoir la liste de composants de publication. 

    Server side: Faire un POST pour créer un "like" une fois qu'on clique sur le bouton. Faire un GET pour retrouver le nombre de "like".
                 Faire un GET TimeStamp pour afficher la date de publication


Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

    Frontend Action Only: cliquer sur le bouton "like" pour créer l'action.

    Client side: Écrire un commentaire sur la partie publication individuelle.

    Server side: Cliquer sur le bouton "like" pour afficher que la publication a été likée.


***Bloggs View page***

Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
    Client side:

    Server side:


Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

    Frontend Action Only:

    Client side:

    Server side:


***Network View page***

What, if any DATA is required from the backend to render the wireframe?
    Client side:

    Server side:


What, if any, ACTIONS is this wireframe responsible for?

    Frontend Action Only:

    Client side:

    Server side:


***Administration View page***

What, if any DATA is required from the backend to render the wireframe?
    Client side:

    Server side:


What, if any, ACTIONS is this wireframe responsible for?

    Frontend Action Only:

    Client side:

    Server side: