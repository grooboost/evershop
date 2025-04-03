const {
  setContextValue
} = require('@evershop/evershop/src/modules/graphql/services/contextHelper');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response) => {
  setContextValue(request, 'pageInfo', {
    title: 'Create a new cms variable',
    description: 'Create a new cms variable'
  });
};
