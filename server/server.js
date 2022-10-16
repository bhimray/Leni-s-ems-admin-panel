const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()


//importing components
const graphqlSchema = require('./graphQL/graphQLSchema/gs-index')
const graphqlResolvers = require('./graphQL/graphQLResolvers/gr-index')
const checkAuthorized = require('./middleware/checkAuthorized')

//
const app = express();
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method=== 'OPTIONS'){
    return res.sendStatus(200)
  }
  next();
})
//importing .env file
const MONGO_DB = process.env.MONGO_URI;
const port = process.env.PORT || 8000;

app.use(bodyParser.json())

// checking if the user is authenticated or not
// app.use(checkAuthorized)
// console.log(req.header, "is the header")

//importing graphql
app.use(
    '/',
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue:graphqlResolvers,
    })
)
async function run() {
  // Create a new connection and connect to MongoDB...
  const conn = await mongoose.
    createConnection(MONGO_DB).
    asPromise().then((res)=>{
      console.log("server is connected", res.models)
    }).catch((err)=>{
      console.log("Failed to connect the server", err)
    })
  console.log("mongodb is connected")
}
run()
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error, "this is server error");
  }
};

start();