const { v4: uuidv4 } = require('uuid');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const {
  getCmsVariablesBaseQuery
} = require('@evershop/otable/services/cms/getCmsVariablesBaseQuery');
const { CMSVariableCollection } = require('@evershop/otable/services/cms/CMSVariableCollection');

module.exports = {
  Query: {
    cmsVariableByName: async (root, { name }, { pool }) => {
      const query = getCmsVariablesBaseQuery();
      query.where('name', '=', name);
      const variable = await query.load(pool);
      return variable ? camelCase(variable) : null;
    },
    cmsVariable: async (root, { id }, { pool }) => {
      const query = getCmsVariablesBaseQuery();
      query.where('cms_variable_id', '=', id);
      const variable = await query.load(pool);
      return variable ? camelCase(variable) : null;
    },
    cmsVariables: async (_, { filters = [] }, { user }) => {
      const query = getCmsVariablesBaseQuery();
      const root = new CMSVariableCollection(query);
      await root.init(filters, !!user);
      return root;
    }
  },
  CmsVariable: {
    editUrl: ({ uuid }) => buildUrl('cmsVariableEdit', { id: uuid }),
    updateApi: (variable) => buildUrl('updateCmsVariable', { id: variable.uuid }),
    deleteApi: (variable) => buildUrl('deleteCmsVariable', { id: variable.uuid }),
  }
};
