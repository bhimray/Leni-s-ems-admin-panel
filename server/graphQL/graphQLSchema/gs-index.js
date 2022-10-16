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
type adminRegisterType implements loginInterface{
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
type createOrderType{
  numberOfItems:String!
  status:String!
  customer:String!
  deliveryTime:String!
  comment:String
}


input createOrderInput{
  numberOfItems:String!
  comment:String!
}
input adminRegisterInput{
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
  adminLogin(email:String, password:String):authDataType
  order(id:String):[Order]
}

type RootMutation {
  adminRegister(adminInput:adminRegisterInput):adminRegisterType
  createUser(name:String, email:String, password:String): createUserType
  login(email:String, password:String): authDataType
  createOrder(createOrderInput: createOrderInput):createOrderType
}


schema {
    query: RootQuery
    mutation: RootMutation
}
`);