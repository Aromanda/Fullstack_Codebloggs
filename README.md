
***Login Page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side:  pas de données.

- Server side:  pas de données.

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?
    
- Client side: submit login form afin de valider email et password. 

- Server side: 
```
    POST/session

Paramètres

TYPE	NOM	                Description
Body	email, password	    Brève description

{
  status:"ok",
  data:{
    email: "John_Doe@gmail.com",
    password: "Codeboxx"
  },
  message:"message descriptif"
}
```

---

***Registration page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side: POST sur /user pour créer un user dans la database Mongodb

- Server side: il fait un POST pour aider à créer un nouveau record grace à un InsertOne. Il fait aussi un PATCH pour updater la db grace a UpdateOne.

```
VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 
Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}
```

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side: 
    - le client doit compléter les champs indiqués, et cliquer sur le bouton register. Un modal va apparaitre avec une fenetre de confirmation une fois les actions finies.
    - Cliquer sur bouton register pour envoyer le POST

- Server side: pas d'action. 

```
VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 
Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}
```

---

***Main page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side: Faire un Fetch pour passer en revue la liste des users pour afficher son profil.

- Server side: pas de données requises. 

```
VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 
Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}
```

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side: 
    - création dropdown pour afficher paramètre du compte et deconnexion. Cliquer sur les boutons pour nous rediriger vers les autres pages.
    - création dropdown pour afficher paramètre du compte et deconnexion. Cliquer sur les boutons pour nous rediriger vers les autres pages.

- Server side: pas d'action.

```
VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 
Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}
```

---

***Publication page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side: création d'un POST pour générer les publications. 

- Server side: Envoie de la création de la publication vers une collection Mongodb.

```
    VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}

```

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side:
    - cliquer sur le bouton "post" pour générer la publication. 
    - Cliquer sur les autres boutons pour aller dans les autres pages ou sur le menu deroulant. 
    - cliquer sur le bouton "post" pour générer la publication. 
    - Cliquer sur les autres boutons pour aller dans les autres pages ou sur le menu deroulant.

- Server side: enregistrer les publications passées dans la db Mongo.

```
    VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}

```
---

***User view page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side:  
    - GET pour avoir l'objet complet de l'utilisateur.
    - GET pour avoir l'objet complet des publications.

- Server side:  pas de données.

```
    GET/user/{userID}

Paramètres

TYPE	NOM	    Description
Query	user_id	Brève description
 

Réponse d'exemple
{
    status:"ok",
  data:{
    first_name: "John",
    last_name: "Doe", 
    birthday: "01/01/2020", 
    email: "john_doe@gmail.com", 
    password: "Codeboxx", 
    status: "je suis content", 
    location: "Montreal", 
    occupation: "Dev", 
    auth_level: "basic"
  },
  message:"message descriptif"
}


GET/post/{user_id}

Paramètres

TYPE	NOM	    Description
Query	user_id	Brève description
 
Réponse d'exemple

{
    status:"ok",
  data:{
    [
        {
            _id: ObjectID
            content:"I am a post #1",
            user_id: ObjectID,
            likes: "3",
            timestamps: "2023-05-14",
            comment: [
                {

            _id: ObjectID,
            content: "I am a comment #1",
            post_id: 1,
            user_id: 1,
            likes: 3,
            time_stamps: "string"
                },
                {
                    ...
                }
                ]
        },
        {
            ...
        },
    ]
  },
  message:"message descriptif"
}

```

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?
    
- Client side: 
    - POST pour créer un "like".
    - POST au comment Endpoint qui est relié à son POST _id.

- Server side:

```
    VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}

```
---

***Bloggs View page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side: 

- Server side: 

```
    VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}

```

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side:

- Server side:

```
    VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}

```
---

***Network View page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side:

- Server side:

```
    VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}

```

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side:

- Server side:

```
    VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}

```
---

***Administration View page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?

- Client side:

- Server side:

```
    VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}

```

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side:

- Server side:

```
    VERBE /route/{path_param}?query_param=param_value

Paramètres

TYPE	NOM	Description
Path	path_param	Brève description
Query	query_param	Brève description
Body	body_param	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    key:value
  },
  message:"message descriptif"

}

```