const updateVariable = require('@evershop/otable/services/cms/variable/updateVariable');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate) => {
  const data = request.body;
  const variable = await updateVariable(request.params.id, data, {
    routeId: request.currentRoute.id
  });

  return variable;
};
