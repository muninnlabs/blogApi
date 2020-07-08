# blogApi

blogApi is simple crud made with node, mongo, and mongoose, that allows creating, read, update and remove users, and do the same with posts

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install blogApi.

```bash
npm install
```

## Usage

You should create a .env file inside the config folder with the following data defined

DB_HOST= "mongodb://localhost:27017/"  
DB_COLLECTION= 'nameYourCollection'  
SESSION_SECRET='SessionSecretCode'  
SERVER_PORT = define a port to run the application

The documents inside your MongoDB collection should be called users and publications

```bash
node server.js
```

then navigate to localhost:'SERVER_PORT'

### The available routes for the publications are

GET
HTTP://localhost:'SERVER_PORT'/publication  
POST  
HTTP://localhost:'SERVER_PORT'/publication  
PUT  
HTTP://localhost:'SERVER_PORT'/publication  
DELETE  
HTTP://localhost:'SERVER_PORT'/publication/id

### The available routes for the users are

GET
HTTP://localhost:'SERVER_PORT'/user  
POST  
HTTP://localhost:'SERVER_PORT'/user  
PUT  
HTTP://localhost:'SERVER_PORT'/user  
DELETE  
HTTP://localhost:'SERVER_PORT'/user/id

### Data

the Files with the mock data that can be used on the MongoDB are inside the app\mongoCollectionsData.

## License

[MIT](https://choosealicense.com/licenses/mit/)
