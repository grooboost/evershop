const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { OK } = require('@evershop/evershop/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const variable = await delegate.createVariable;
  response.status(OK);
  response.json({
    data: {
      ...variable,
      links: [
        {
          rel: 'cmsVariableGrid',
          href: buildUrl('cmsVariableGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('cmsVariableEdit', { id: variable.uuid }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
