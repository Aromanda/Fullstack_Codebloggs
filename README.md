
***Login Page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side:  pas de données.

- Server side:  pas de données.

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?
    
- Client side: 
  - submit login form afin de valider email et password. 
  - link qui emmene à la page register

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
- Client side: pas de données.

- Server side: pas de données.

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side: 
    - POST sur /user pour créer un user dans la database Mongodb.

- Server side: 
```
POST/user

Paramètres

TYPE	NOM	    Description
Body	first_name, last_name, email, birthdate, password, occupation, location	Brève description
 
Réponse d'exemple

{
  status:"ok",
  data:{
    first_name: "John",
    last_name: "Doe",
    email: "john_doe@gmail.com",
    birthdate: "01/01/2020",
    password: "Codeboxx",
    status:"il fait beau dehors",
    occupation: "Dev",
    location: "Montreal",
    auth_level: "basic"
  },
  message:"message descriptif"

}
```

---

***Main page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side: pas de données.

- Server side:

```
GET/user/{userID}

Paramètres

TYPE	NOM	    Description
Query	user_id Brève description
 
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
```

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side: 
    - Dropdown button: 
        - pour afficher paramètre du compte (ALERT).
        - faire un POST sur le bouton deconnexion.

    - Sidebar:
        - Home: main page.
        - Bloggs: Navigate vers la page Bloggs view.
        - Network: Navigate vers la page Network view.

- Server side: pas d'action.

---

***Publication page (MODAL)***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side: pas de données. 

- Server side: pas de données. 

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side:
    - faire un POST sur /post.

- Server side: 

```
    POST/post

Paramètres

TYPE	NOM	Description
Body	user_id, content	Brève description
 

Réponse d'exemple

{
    status:"ok",
  data:{
    [
        {
            _id: ObjectID,
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
            _id: ObjectID,
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
    POST/comment/{user_id}

Paramètres

TYPE	NOM	Description
Query	user_id	Brève description

 

Réponse d'exemple

{
  status:"ok",
  data:{
    _id: ObjectID,
            content: "I am a comment #1",
            post_id: 1,
            user_id: 1,
            likes: 3,
            time_stamps: "string"
  },
  message:"message descriptif"

}

```
---

***Bloggs View page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side: 
    - GET pour avoir toutes les publications.

- Server side: 

```
    GET/post/{user_id}

Paramètres

TYPE	NOM	Description
Query	user_id	Brève description
 

Réponse d'exemple

{
    status:"ok",
  data:{
    [
        {
            _id: ObjectID,
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
    POST/comment/{user_id}

Paramètres

TYPE	NOM	Description
Query	user_id	Brève description

 

Réponse d'exemple

{
  status:"ok",
  data:{
    _id: ObjectID,
            content: "I am a comment #1",
            post_id: 1,
            user_id: 1,
            likes: 3,
            time_stamps: "string"
  },
  message:"message descriptif"

}

```
---

***Network View page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?
- Client side:
    - GET sur /user 

- Server side:

```
    GET /user

Paramètres

TYPE	NOM	Description
Body	user_id	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    first_name: "John",
    last_name: "Doe",
    email: "john_doe@gmail.com",
    birthdate: "01/01/2020",
    password: "Codeboxx",
    occupation: "Dev",
    location: "Montreal",
    auth_level: "basic"
  },
  message:"message descriptif"

}

```

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side:
    - GET sur /user

- Server side:

```
    GET/user/{user_id}

Paramètres

TYPE	NOM	    Description
Body	user_id	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    first_name: "John",
    last_name: "Doe",
    email: "john_doe@gmail.com",
    birthdate: "01/01/2020",
    password: "Codeboxx",
    occupation: "Dev",
    location: "Montreal",
    auth_level: "basic"
  },
  message:"message descriptif"

}

```
---

***Administration View page***

### Quelles sont les DONNÉES, le cas échéant, requises à partir du backend pour afficher le wireframe ?

- Client side: 
    - GET sur /admin pour vérifier si user a l'authentification.

- Server side: 

```
    GET /admin
Paramètres

TYPE	NOM	Description
Body	body_param	Brève description
 

Réponse d'exemple

{
  status:"ok",
  data:{
    email:"valid"
  },
  message:"message descriptif"

}

```

### Quelles sont les ACTIONS, le cas échéant, pour lesquelles ce wireframe est responsable ?

- Client side: Alert box. 

- Server side: pas d'action

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