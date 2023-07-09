<<<<<<< HEAD
=======
# Devloppement-Full-Stack-2-Mern
>>>>>>> 5fa1d908f0b31031276183b5d987a54cde118bb3
Quelle est la différence entre React, React JS et React Native ?
React is use too create and modify components in thosse component we use all the function and html in the same page using jsx. 

React js is a term too the JavaScript library for building user interfaces, it's a term we use too when we create web api with react.

React native it's a framework too be able too create api on mobile. it's use too build mobile application with the same approach you would use for a web application in React, while having a real mobile application, not just a "web app".



React est-il un framework ou une bibliothèque ? Quelle est la différence ?
React is considered a library because it provides components (like functions or classes) that you can use in your application, but how those components are used to build your application is up to you.



En quelques phrases, comparez et contrastez HTML et JSX.
in html we use a separated .js too be able too give the function and variable . In Jsx with react like i told you before we are able too implement the function and the html in the same js. HTML is a static markup language used directly by browsers to render web pages, whereas JSX is a dynamic JavaScript-based syntax extension used in React to generate HTML in a more flexible and powerful way.



Qu'est-ce qui rend React attrayant pour notre cas ?
React uses DOM (Document Object Model) to efficiently update only the parts of the web page that need to change when the state of the application changes.



Quelles sont les piles technologiques alternatives ?
The MERN stack is a JavaScript-based tech stack that comprises four open-source components: MongoDB for the database, Express.js as the backend web framework, React.js for the frontend, and Node.js as the runtime environment.

Here are some alternative technology stacks:

MEAN Stack: This is very similar to the MERN stack, but uses Angular.js for the frontend instead of React.js. So it's MongoDB, Express.js, Angular.js, and Node.js.

LAMP Stack: This is a classic web development stack which stands for Linux (operating system), Apache (web server), MySQL (database), and PHP (server-side programming language).

MEVN Stack: This stack uses Vue.js as the frontend JavaScript framework instead of React.js, hence MongoDB, Express.js, Vue.js, and Node.js.

Django Stack: Python-based, featuring Django (web framework), Python (programming language), Apache (web server), and MySQL (database).

Ruby on Rails Stack: This includes Ruby (programming language), Rails (web framework), and SQLite or PostgreSQL as the database.

JAMstack: This isn't a stack in the traditional sense, but represents a modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup. "JAM" stands for JavaScript, APIs, and Markup.

.NET Stack: This includes .NET/C# for server-side programming, SQL Server for the database, and often Angular or React for the frontend.



Pourquoi MERN est-il un bon choix pour le développement complet ?
<<<<<<< HEAD
Unified Language: The MERN stack is entirely written in JavaScript, the most commonly used programming language. This language uniformity simplifies the development process as developers only need to be proficient in one language to work on both the frontend and backend.
=======
Unified Language: The MERN stack is entirely written in JavaScript, the most commonly used programming language. This language uniformity simplifies the development process as developers only need to be proficient in one language to work on both the frontend and backend.




link too interesting project 
https://github.com/scalablescripts/react-auth?ref=morioh.com&utm_source=morioh.com
https://youtu.be/OUP-urBy1k4
link github et youtube too add a jwt token with cookies

link for github and youtube really interesting too understand all the "use"
https://github.com/machadop1407/react-hooks-course?u=t&m=o&ref=morioh.com&utm_source=morioh.com
https://youtu.be/LlvBzyy-558

>>>>>>> 5fa1d908f0b31031276183b5d987a54cde118bb3
>>>>
>>>>



Un composant est un fichier .js qui regroupe les données des fonctions et prend également en charge le HTML "JSX". Dans les fonctions, nous pouvons effectuer des requêtes fetch, post, get à partir de la même page que le "HTML". Un composant est souvent lié à un schéma, et le fichier app.js supervise toutes les "landing pages" du côté client. Avec un composant, nous devons créer une route mjs qui prend les informations liées au composant pour ensuite les transmettre à une base de données, ou aller chercher des réponses dans notre Postman pour voir si tout est validé.

Un props est utilisé pour envoyer des données d'une page à une autre. Si j'ai bien compris, les valeurs de chaque composant vérifient d'abord le fichier app.js pour appliquer certaines fonctions à une page, puis les transfèrent du côté client, qui vérifie la route et prend ensuite en compte le fichier server.mjs. Un props est simplement une option qui permet de passer des données plus facilement d'une page à une autre sans avoir d'erreur.

Un state utilise deux fonctions : la première fonction est la valeur actuelle de l'état, et la deuxième est une fonction pour le mettre à jour.
