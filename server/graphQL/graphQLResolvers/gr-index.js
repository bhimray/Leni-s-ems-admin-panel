const graphqlResolversOrder = require('./r-order')
const graphqlResolversUser = require('./r-users')

const rootResolver = {
    ...graphqlResolversOrder,
    ...graphqlResolversUser,
  };
  
  module.exports = rootResolver;
    