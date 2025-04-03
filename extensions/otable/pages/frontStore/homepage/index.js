const { setContextValue } = require("@evershop/evershop/src/modules/graphql/services/contextHelper");
const { getCmsVariablesBaseQuery } = require("@evershop/otable/services/cms/getCmsVariablesBaseQuery");
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');

module.exports = async (request) => {
  const query = getCmsVariablesBaseQuery();
  query.where('name', '=', 'home');
  const variable = await query.load(pool);
  const result = variable ? camelCase(variable) : null;
  const varsFromAdmin = result?.data || {};
  setContextValue(request, 'filtersFromVars', [{ key: 'id', operation: 'in', value: varsFromAdmin.bestReviews.join(',') }]);
};