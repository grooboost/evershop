const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  setContextValue
} = require('@evershop/evershop/src/modules/graphql/services/contextHelper');

module.exports = async (request, response, delegate, next) => {
  try {
    const query = select();
    query.from('cms_variable');
    query.andWhere('cms_variable.uuid', '=', request.params.id);

    const cmsVariable = await query.load(pool);

    if (cmsVariable === null) {
      response.status(404);
      next();
    } else {
      setContextValue(request, 'cmsVariableId', cmsVariable.cms_variable_id);
      setContextValue(request, 'cmsVariableUuid', cmsVariable.uuid);
      setContextValue(request, 'pageInfo', {
        title: cmsVariable.name,
        description: cmsVariable.name
      });
      next();
    }
  } catch (e) {
    next(e);
  }
};
