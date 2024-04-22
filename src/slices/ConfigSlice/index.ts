import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { APP_CONFIG_KEY } from '../../app/type.d';
// import { APP_CONFIG_KEY } from "../../app/type.d";
import HttpCall from '../../utils/HttpCall';

export type CabangData = {
  id: number;
  name: string;
  address: string;
};

export type ToastData = {
  type: string;
  message: string;
};

export type MenuType = {
  key: string;
  nama: string;
  url: string;
  icon: string;
  urut: string;
  accesses: string[];
  childs: MenuType[];
};

export type AppConfigState = {
  themeSelected?: string | null;
  hideSidebar: boolean;
  toastData?: any;
  progress: boolean;
  menu: MenuType[];
};

const initialState: AppConfigState = {
  themeSelected: 'mytheme',
  hideSidebar: true,
  toastData: null,
  progress: false,
  menu: [],
};

export const SetToastData = createAsyncThunk(
  'appConfig/toastData',
  (toastData: ToastData) => {
    return toastData;
  }
);

// export const SetProgress = createAsyncThunk(
//   'appConfig/progress',
//   (progress: boolean) => {
//     return progress;
//   }
// );

// export const PersistConfig = createAsyncThunk(
//   'appConfig/persistConfig',
//   async () => {
//     try {
//       const storage = localStorage.getItem(APP_CONFIG_KEY);
//       const config: AppConfigState = storage ? JSON.parse(storage) : null;
//       return config;
//     } catch (err) {
//       throw err;
//     }
//   }
// );

// export const SetSidebar = createAsyncThunk(
//   'appConfig/sidebar',
//   (_, thunkApi) => {
//     const { appConfig } = thunkApi.getState() as RootState;
//     const { hideSidebar } = appConfig;
//     localStorage.setItem(
//       APP_CONFIG_KEY,
//       JSON.stringify({ ...appConfig, hideSidebar: !hideSidebar })
//     );
//     return !hideSidebar;
//   }
// );

export const GetMenu = createAsyncThunk('appConfig/getMenu', async () => {
  const { results } = (await HttpCall.get('/menu/all')).data;
  return results;
});

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    SetProgress: (state: AppConfigState, param: any) => {
      const { payload } = param;
      state.progress = payload;
    },
    SetMenu: (state: AppConfigState, param: any) => {
      const { payload } = param;
      state.menu = payload;
    },

    SetTheme: (state: AppConfigState, param: any) => {
      const { payload } = param;
      state.themeSelected = payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(GetMenu.pending, (state: AppConfigState) => {
    //   state.progress = true;
    // });
    // builder.addCase(GetMenu.fulfilled, (state: AppConfigState, { payload }) => {
    //   // console.log('yyyyn', payload);
    //   state.menu = payload;
    // });
    // builder.addCase(GetMenu.rejected, (state: AppConfigState, { payload }) => {
    //   state.progress = false;
    // });
    builder.addCase(
      SetToastData.fulfilled,
      (state: AppConfigState, { payload }) => {
        // console.log('xxx null kah', payload);
        state.toastData = payload;
      }
    );
    // builder.addCase(
    //   SetThemeSelected.fulfilled,
    //   (state: AppConfigState, { payload }) => {
    //     state.themeSelected = payload;
    //   }
    // );
    // builder.addCase(
    //   PersistConfig.fulfilled,
    //   (state: AppConfigState, { payload }) => {
    //     state.hideSidebar = payload?.hideSidebar;
    //     state.themeSelected = payload?.themeSelected || null;
    //   }
    // );
    // builder.addCase(
    //   SetProgress.fulfilled,
    //   (state: AppConfigState, { payload }) => {
    //     state.progress = payload;
    //   }
    // );
    // builder.addCase(
    //   SetSidebar.fulfilled,
    //   (state: AppConfigState, { payload }) => {
    //     state.hideSidebar = payload;
    //   }
    // );
  },
});

// Create and export the selector:
export const selectAppConfig = (state: RootState) => state.appConfig;
export const { SetProgress, SetMenu, SetTheme } = appConfigSlice.actions;

// It is a convention to export reducer as a default export:
export default appConfigSlice.reducer;
