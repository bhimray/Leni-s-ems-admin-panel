const { buildSchema } = require('graphql');

module.exports = buildSchema(`

interface loginInterface{
  name:String
  email:String!
  password:String!
}


type createUserType {
  name:String
  email: String!
  password: String
}

type loginType {
  userId: ID!
}

type Order{
  name:String!
  amount:String!
  service:String!
  user:String!
}
type adminInputType implements loginInterface{
  name:String
  email:String!
  password:String!
  number:String
}
type authDataType{
  user:String!
  token:String!
  tokenExpiration:String!
}



input adminInput{
  name:String
  email:String!
  password:String!
  number:String
}
input loginInput{
  email:String!
  password:String!
}
input createUserInputData {
  name:String!
  email: String!
  password: String
}



type RootQuery {
  adminLogin(adminInput:adminInput):authDataType
  login(loginInput: loginInput): loginType!
  order(id:String):[Order]
}

type RootMutation {
  adminRegister(adminInput:adminInput):adminInputType
  createUser(createUserInput: createUserInputData): createUserType
  createOrder(name:String, amount:String, service:String, user:String):Order
}


schema {
    query: RootQuery
    mutation: RootMutation
}
`);