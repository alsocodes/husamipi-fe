import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AUTH_KEY } from '../../app/type.d';
import HttpCall from '../../utils/HttpCall';
import { SetMenu, SetToastData } from '../ConfigSlice/index.ts';

type Role = {
  nama: string;
  accesses: string[];
};

export type UserData = {
  id: number;
  nama: string;
  email: string;
  refreshToken: string;
  accessToken: string;
  role: Role | null;
};

export type AuthState = {
  loggedIn: boolean;
  progress: boolean;
  error: string | null;
  userData: UserData | null;
  formResult: any;
};

const initialState: AuthState = {
  loggedIn: false,
  progress: false,
  error: null,
  userData: null,
  formResult: null,
};

export const PostLogin = createAsyncThunk(
  'auth/postLogin',
  async ({ username, password }: any, { dispatch }) => {
    const { results } = (
      await HttpCall.post('/auth/login', { username, password })
    ).data;
    dispatch(SetToastData({ type: 'success', message: 'Login Berhasil' }));
    const { menu, ...authData } = results;
    dispatch(SetMenu(menu));
    return authData;
  }
);

// export const fetchTodos = createAsyncThunk<
//   Todo[],
//   // The second type-parameter in `createAsyncThunk`
//   // tells what argument takes the function inside:
//   number
// >(
//   'todos/fetch',

//   // Here, we can use this argument:
//   async (limit: number) => {
//     // For example, we could pass it
//     // as a GET-parameter in the request URL:
//     // fetch(`/todos?limit=${limit}`)
//     // ...
//     return data;
//   }
// );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Logout: (state: AuthState) => {
      state.loggedIn = false;
      state.userData = null;
      state.progress = false;
    },

    LoginByRefresh: (state: AuthState, { payload }) => {
      try {
        state.loggedIn = payload !== null && payload !== undefined;
        state.progress = false;
        state.error = null;
        state.userData = {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          id: payload.user.id,
          nama: payload.user.nama,
          email: payload.user.email,
          role: {
            nama: payload.user.role.nama,
            accesses: payload.user.role.accesses,
          },
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
  extraReducers: (builder) => {
    // login reducer
    builder.addCase(PostLogin.pending, (state: AuthState) => {
      state.progress = true;
    });
    builder.addCase(PostLogin.fulfilled, (state: AuthState, { payload }) => {
      // console.log('yyyyn', payload);
      state.loggedIn = payload !== null && payload !== undefined;
      state.progress = false;
      state.error = null;
      state.userData = {
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        id: payload.user.id,
        nama: payload.user.nama,
        email: payload.user.email,
        role: {
          nama: payload.user.role.nama,
          accesses: payload.user.role.accesses,
        },
      };
    });
    builder.addCase(PostLogin.rejected, (state: AuthState, { payload }) => {
      // console.log('xx', 'rejected');
      state.progress = false;
    });
  },
});

// Create and export the selector:
export const selectAuth = (state: RootState) => state.auth;
export const { Logout, LoginByRefresh } = authSlice.actions;

// It is a convention to export reducer as a default export:
export default authSlice.reducer;
