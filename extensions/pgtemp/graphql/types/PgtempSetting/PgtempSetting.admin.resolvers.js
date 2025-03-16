const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');

module.exports = {
  Setting: {
    pgtempPublishableKey: (setting) => {
      const pgtempConfig = getConfig('system.pgtemp', {});
      if (pgtempConfig.publishableKey) {
        return pgtempConfig.publishableKey;
      }
      const pgtempPublishableKey = setting.find(
        (s) => s.name === 'pgtempPublishableKey'
      );
      if (pgtempPublishableKey) {
        return pgtempPublishableKey.value;
      } else {
        return null;
      }
    },
    pgtempSecretKey: (setting, _, { user }) => {
      const pgtempConfig = getConfig('system.pgtemp', {});
      if (pgtempConfig.secretKey) {
        return `${pgtempConfig.secretKey.substr(
          0,
          5
        )}*******************************`;
      }
      if (user) {
        const pgtempSecretKey = setting.find(
          (s) => s.name === 'pgtempSecretKey'
        );
        if (pgtempSecretKey) {
          return pgtempSecretKey.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    pgtempEndpointSecret: (setting, _, { user }) => {
      const pgtempConfig = getConfig('system.pgtemp', {});
      if (pgtempConfig.endpointSecret) {
        return `${pgtempConfig.endpointSecret.substr(
          0,
          5
        )}*******************************`;
      }
      if (user) {
        const pgtempEndpointSecret = setting.find(
          (s) => s.name === 'pgtempEndpointSecret'
        );
        if (pgtempEndpointSecret) {
          return pgtempEndpointSecret.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }
};
