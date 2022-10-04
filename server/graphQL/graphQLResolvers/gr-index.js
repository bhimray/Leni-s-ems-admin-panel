const graphqlResolversOrder = require('./r-order')
const graphqlResolversUser = require('./r-users')
const graphqlResolversAdmin = require('./r-admin')
const rootResolver = {
    ...graphqlResolversOrder,
    ...graphqlResolversUser,
    ...graphqlResolversAdmin,
  };
  
  module.exports = rootResolver;
    