const { default: axios } = require('axios');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { getApiBaseUrl } = require('@evershop/npay/services/getApiBaseUrl');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');

async function createAxiosInstance(request) {
  const axiosInstance = axios.create({
    baseURL: await getApiBaseUrl(),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const tokenObj = request.app.locals.npayAccessToken; // {access_token: , expires_in: , created_at: }
    const now = new Date().getTime();
    if (!tokenObj || now - tokenObj.created_at > tokenObj.expires_in * 1000) {
      const npayAccessToken = await requestAccessToken();
      request.app.locals.npayAccessToken = {
        access_token: npayAccessToken.data.access_token,
        expires_in: npayAccessToken.data.expires_in,
        created_at: new Date().getTime()
      };
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${npayAccessToken.data.access_token}`;
    } else {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${tokenObj.access_token}`;
    }
    return config;
  });
  return axiosInstance;
}

async function requestAccessToken() {
  const npayConfig = getConfig('system.npay', {});
  let clientId;
  let clientSecret;
  if (npayConfig.clientSecret) {
    clientSecret = npayConfig.clientSecret;
  } else {
    clientSecret = await getSetting('npayClientSecret', '');
  }

  if (npayConfig.clientId) {
    clientId = npayConfig.clientId;
  } else {
    clientId = await getSetting('npayClientId', '');
  }

  const params = new URLSearchParams({ grant_type: 'client_credentials' });
  // Get npay access token using Axios
  const npayAccessToken = await axios.post(
    `${await getApiBaseUrl()}/v1/oauth2/token`,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString('base64')}`
      }
    }
  );
  return npayAccessToken;
}

module.exports.createAxiosInstance = createAxiosInstance;
