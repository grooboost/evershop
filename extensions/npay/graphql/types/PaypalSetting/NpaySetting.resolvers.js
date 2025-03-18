const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');

module.exports = {
  Setting: {
    npayDislayName: (setting) => {
      const npayDislayName = setting.find(
        (s) => s.name === 'npayDislayName'
      );
      if (npayDislayName) {
        return npayDislayName.value;
      } else {
        return 'Npay';
      }
    },
    npayEnvironment: (setting) => {
      const npayConfig = getConfig('system.npay', {});
      if (npayConfig.environment) {
        return npayConfig.environment;
      }
      const npayEnvironment = setting.find(
        (s) => s.name === 'npayEnvironment'
      );
      if (npayEnvironment) {
        return npayEnvironment.value;
      } else {
        return {};
      }
    }
  }
};
