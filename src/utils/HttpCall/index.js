import axios from 'axios';
import { store } from '../../app/store.ts';
import { Logout, LoginByRefresh } from '../../slices/AuthSlice/index.ts';
import { SetProgress, SetToastData } from '../../slices/ConfigSlice/index.ts';
// import 'dotenv';
// @ts-expect-error: i dont know why
export const baseUrl = process.env.REACT_APP_API_URL;
// console.log(baseUrl);
export const imageUrl = process.env.IMG_URL;
const axiosApiInstance = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    console.log(config.url, 'pre');
    store.dispatch(SetProgress(true));
    const userData = store.getState().auth.userData;
    // console.log('yyy at', userData?.accessToken);
    const token =
      config.url === '/auth/refresh-login'
        ? userData?.refreshToken
        : userData?.accessToken;
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    if (!config.url.startsWith('/history')) config.timeout = 30000; //30s
    // config.query = {
    //   ...config.query,
    //   isApp: false,
    // };
    // console.log(config);
    return config;
  },
  (error) => {
    console.log('err xx');
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    store.dispatch(SetProgress(false));
    return response;
  },
  async function (error) {
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      console.log('Request timed out');
      store.dispatch(
        SetToastData({
          type: 'error',
          message: 'Request timeout, please try again!',
        })
      );
      store.dispatch(SetProgress(false));
      return Promise.reject(error);
    }

    const exceptList = ['/auth/login', '/auth/logout'];

    if (error.response.status === 401) {
      const originalRequest = error.config;
      const userData = store.getState().auth.userData;
      if (
        !originalRequest._retry &&
        userData?.refreshToken &&
        !exceptList.includes(error.config.url)
      ) {
        originalRequest._retry = true;
        store.dispatch(SetProgress(true));
        // const { payload } = await store.dispatch(RefreshLogin());
        const rs = await axios
          .get(`${baseUrl}/auth/refresh-login`, {
            headers: {
              Authorization: `Bearer ${userData?.refreshToken}`,
            },
          })
          .then((res) => {
            // console.log(res, 'rs res');
            store.dispatch(SetProgress(false));
            return res;
          })
          .catch((error) => {
            // console.log(error, 'rs error');
            store.dispatch(SetProgress(false));
            store.dispatch(Logout());
            throw new Error(error);
          });
        // console.log(rs, 'rs');
        const refrshData = rs.data.results;
        store.dispatch(LoginByRefresh(refrshData));

        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${refrshData.accessToken}`;
        // console.log('HEREX');

        return axiosApiInstance({
          ...originalRequest,
          data: originalRequest.data
            ? { ...JSON.parse(originalRequest.data), rerty: true }
            : undefined,
        });
      }

      if (error.config.url === '/auth/login') store.dispatch(Logout());
    }

    const msg =
      error.response.status === '404'
        ? 'Not found'
        : error?.response.data.message || 'error';
    // const message =
    //   error.config.url === '/auth/refresh-login'
    //     ? 'Session timout, please re-signin'
    //     : typeof msg === 'string'
    //     ? msg
    //     : msg.join(', ');
    // console.log(message);
    // alert('herex');
    store.dispatch(
      SetToastData({
        type: 'error',
        message: msg,
      })
    );
    store.dispatch(SetProgress(false));
    return Promise.reject(error);
  }
);

export const downloadBlob = async (url, params, filename) => {
  try {
    // Create request
    const response = await axiosApiInstance({
      url,
      method: 'GET',
      params,
      responseType: 'blob',
    });
    console.log('rs', response);

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    console.log('blobUrl', blobUrl);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);

    // Download file
    link.click();
    setTimeout(() => link.remove(), 1000);
  } catch (err) {
    store.dispatch(
      SetToastData({
        type: 'error',
        message: err.message,
      })
    );
  }
};

export default axiosApiInstance;
