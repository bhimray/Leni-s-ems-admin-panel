const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type createUserType {
  name:String
  email: String!
  password: String
}

type loginType {
  userId: ID!
}

input createUserInputData {
  name:String!
  email: String!
  password: String
}
type Order{
  name:String!
  amount:String!
  service:String!
  user:String!
}
input loginInput{
  email:String!
  password:String!
}

type RootQuery {
    login(loginInput: loginInput): loginType!
    order(id:String):[Order]
}

type RootMutation {
    createUser(createUserInput: createUserInputData): createUserType
    createOrder(name:String, amount:String, service:String, user:String):Order
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);