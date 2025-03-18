const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');

module.exports = {
  Setting: {
    npayPaymentStatus: (setting) => {
      const npayConfig = getConfig('system.npay', {});
      if (npayConfig.status) {
        return npayConfig.status;
      }
      const npayPaymentStatus = setting.find(
        (s) => s.name === 'npayPaymentStatus'
      );
      if (npayPaymentStatus) {
        return parseInt(npayPaymentStatus.value, 10);
      } else {
        return 0;
      }
    },
    npayPaymentIntent: (setting) => {
      const npayPaymentIntent = setting.find(
        (s) => s.name === 'npayPaymentIntent'
      );
      if (npayPaymentIntent) {
        return npayPaymentIntent.value;
      } else {
        return 'CAPTURE';
      }
    },
    npayClientId: (setting) => {
      const npayConfig = getConfig('system.npay', {});
      if (npayConfig.clientId) {
        return npayConfig.clientId;
      }
      const npayClientId = setting.find((s) => s.name === 'npayClientId');
      if (npayClientId) {
        return npayClientId.value;
      } else {
        return null;
      }
    },
    npayClientSecret: (setting, _, { user }) => {
      const npayConfig = getConfig('system.npay', {});
      if (npayConfig.clientSecret) {
        return '*******************************';
      }
      if (user) {
        const npayClientSecret = setting.find(
          (s) => s.name === 'npayClientSecret'
        );
        if (npayClientSecret) {
          return npayClientSecret.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    npayChainId: (setting) => {
      const npayConfig = getConfig('system.npay', {});
      if (npayConfig.clientId) {
        return npayConfig.clientId;
      }
      const npayChainId = setting.find((s) => s.name === 'npayChainId');
      if (npayChainId) {
        return npayChainId.value;
      } else {
        return null;
      }
    },
    npayWebhookSecret: (setting, _, { user }) => {
      const npayConfig = getConfig('system.npay', {});
      if (npayConfig.webhookSecret) {
        return '*******************************';
      }
      if (user) {
        const npayWebhookSecret = setting.find(
          (s) => s.name === 'npayWebhookSecret'
        );
        if (npayWebhookSecret) {
          return npayWebhookSecret.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }
};
