const createVariable = require('@evershop/otable/services/cms/variable/createVariable');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate) => {
  const data = request.body;
  const result = await createVariable(data, {
    routeId: request.currentRoute.id
  });

  return result;
};
