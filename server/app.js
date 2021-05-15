const express = require('express');
const{ graphqlHTTP }= require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require("mongoose")
const cors = require('cors')
const {MONGO_URL} = require('../config');
const app = express();
app.use(cors()) 
mongoose.connect(MONGO_URL,
{ useNewUrlParser: true, useUnifiedTopology: true  })
mongoose.connection.once("open", ()=>
console.log("connected to db"))
// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // ==> real live fetch + docs 
}));

app.listen(4001, () => {
    console.log('now listening for requests on port 4001');
});