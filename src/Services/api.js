import axios from 'axios';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

const { WEEGO_API_BASE_URL, ENV } = Config;

axios.defaults.timeout = 20000;
axios.defaults.baseURL = WEEGO_API_BASE_URL;

// common headers
// axios.defaults.headers.common['X-BundleId'] = DeviceInfo.getBundleId();
// axios.defaults.headers.common['X-UserAgent'] = DeviceInfo.getUserAgent();
// axios.defaults.headers.common['X-AppVersion'] = DeviceInfo.getVersion();
// axios.defaults.headers.common['X-DeviceId'] = DeviceInfo.getUniqueID();
// axios.defaults.headers.common['X-DeviceInfo'] = `${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`;
// axios.defaults.headers.common['X-System'] = `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`;
// axios.defaults.headers.common[
//   'X-Environment'
//   ] = `${DeviceInfo.getDeviceCountry()} ${DeviceInfo.getDeviceLocale()} ${DeviceInfo.getTimezone()}`; // eslint-disable-line

// post headers
axios.defaults.headers.post['Content-Type'] = 'application/json';


// 响应拦截，后续可能在这里容错、统计性能
axios.interceptors.response.use(
  res => {
    console.debug('api.response', {
      headers: res.config.headers,
      params: res.config.params,
      baseUrl: res.config.baseURL,
      url: res.config.url,
      data: res.data,
    });
    return res;
  },
  err => {
    console.warn('api.response.error', err);
    return Promise.reject(err);
  }
);

module.exports = axios;
