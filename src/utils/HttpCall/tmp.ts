// import axios from 'axios';
// import { store } from '../../app/store';
// import { Logout, RefreshLogin } from '../../slices/AuthSlice';
// import { SetProgress, SetToastData } from '../../slices/ConfigSlice';

// // @ts-expect-error: i dont know why
// export const baseUrl = process.env.API_URL;
// const axiosApiInstance = axios.create({
//   baseURL: baseUrl,
//   timeout: 30000,
// });

// // Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
//   async (config) => {
//     store.dispatch(SetProgress(true));
//     const userData = store.getState().auth.userData;
//     // console.log('yyy at', userData?.accessToken);
//     const token =
//       config.url === '/auth/refresh-login'
//         ? userData?.refreshToken
//         : userData?.accessToken;
//     config.headers = {
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//     };
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// // Response interceptor for API calls
// axiosApiInstance.interceptors.response.use(
//   (response) => {
//     store.dispatch(SetProgress(false));
//     return response;
//   },
//   async function (error) {
//     store.dispatch(SetProgress(false));
//     // console.log('yyy error', error.response.status);
//     // if (error.response.status === 401) {
//     //   const originalRequest = error.config;
//     //   const userData = store.getState().auth.userData;
//     //   console.log('orixxx', userData?.refreshToken);
//     //   if (
//     //     !originalRequest._retry &&
//     //     userData?.refreshToken &&
//     //     !['/auth/refresh-login', '/auth/logout'].includes(error.config.url)
//     //   ) {
//     //     console.log('iam gere');
//     //     originalRequest._retry = true;
//     //     const { payload }: any = await store.dispatch(RefreshLogin());

//     //     console.log('yyy original', JSON.parse(originalRequest.data));
//     //     axios.defaults.headers.common['Authorization'] =
//     //       'Bearer ' + payload.accessToken;
//     //     return axiosApiInstance({
//     //       ...originalRequest,
//     //       data: JSON.parse(originalRequest.data),
//     //     });
//     //   }

//     //   if (error.config.url === '/auth/login') store.dispatch(Logout());
//     // }

//     const msg = error.response.data.message;
//     const message =
//       error.config.url === '/auth/refresh-login'
//         ? 'Session timout, please re-signin'
//         : typeof msg === 'string'
//         ? msg
//         : msg.join(', ');
//     // console.log(message);

//     store.dispatch(
//       SetToastData({
//         type: 'error',
//         message,
//       })
//     );

//     return Promise.reject(error);
//   }
// );

// export const downloadBlob = async (
//   url: string,
//   params: any,
//   filename: string
// ) => {
//   try {
//     // Create request
//     const response: any = await axiosApiInstance({
//       url,
//       method: 'GET',
//       params,
//       responseType: 'blob',
//     });
//     console.log('rs', response);

//     const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
//     console.log('blobUrl', blobUrl);
//     const link = document.createElement('a');
//     link.href = blobUrl;
//     link.setAttribute('download', filename);
//     document.body.appendChild(link);

//     // Download file
//     link.click();
//     setTimeout(() => link.remove(), 1000);
//   } catch (err) {
//     // store.dispatch(
//     //   showAlert({
//     //     message: 'Gagal export file',
//     //     type: 'danger',
//     //     show: true,
//     //   })
//     // );
//     // store.dispatch(showToast("Gagal unduh file! err: " + err.message, "error"));
//   }
// };

// export default axiosApiInstance;
