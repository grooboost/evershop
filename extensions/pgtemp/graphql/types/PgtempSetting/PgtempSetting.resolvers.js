const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');

module.exports = {
  Setting: {
    pgtempPaymentStatus: (setting) => {
      const pgtempConfig = getConfig('system.pgtemp', {});
      if (pgtempConfig.status) {
        return pgtempConfig.status;
      }
      const pgtempPaymentStatus = setting.find(
        (s) => s.name === 'pgtempPaymentStatus'
      );
      if (pgtempPaymentStatus) {
        return parseInt(pgtempPaymentStatus.value, 10);
      } else {
        return 0;
      }
    },
    pgtempDislayName: (setting) => {
      const pgtempDislayName = setting.find(
        (s) => s.name === 'pgtempDislayName'
      );
      if (pgtempDislayName) {
        return pgtempDislayName.value;
      } else {
        return 'Credit Card';
      }
    },
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
    pgtempPaymentMode: (setting) => {
      const pgtempPaymentMode = setting.find(
        (s) => s.name === 'pgtempPaymentMode'
      );
      if (pgtempPaymentMode) {
        return pgtempPaymentMode.value;
      } else {
        return 'capture';
      }
    }
  }
};
