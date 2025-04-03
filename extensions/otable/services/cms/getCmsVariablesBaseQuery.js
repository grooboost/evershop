const { select } = require('@evershop/postgres-query-builder');

module.exports.getCmsVariablesBaseQuery = () => {
  const query = select().from('cms_variable');

  return query;
};
