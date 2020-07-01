# URL-Shortner-API Node.js

A URL Shorter API made with Node.js

### To run this project, do the following:

##### create .env with the following code (update credentials). Make sure to create .env in the root directory of the project. config/dev.env

```
MONGO_URI=mongodb://localhost:27017/nodeapi
PORT=3000
```

##### Then install all dependency with

```
npm install
```

##### Then run the following commands to start up the app

```
npm start
```

IT run your application on http://localhost:3000/

```
GET - "/" : Docs,
POST - "/" : Create short url
GET - "/code" : Redirect to original url
```
