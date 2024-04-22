import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import HttpCall from '../../utils/HttpCall/index.js';
import { SetToastData } from '../ConfigSlice/index.ts';

export type UserType = {
  _action?: string;
  id: number;
  nama: string;
  username: string;
  email: string;
  hp: string;
  alamat: string;
  // jabatan: JabatanType;
  avatar: string;
  isBlocked: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

type DataType = {
  count: number;
  page: number;
  totalPage: number;
  rows: UserType[];
};
export type UserState = {
  progress: boolean;
  formResult: any;
  data: DataType | null;
  opt: any[];
  detail: UserType | null;
};

const initialState: UserState = {
  progress: false,
  data: null,
  formResult: null,
  opt: [],
  detail: null,
};

export const CreateUser = createAsyncThunk(
  'user/createUser',
  async (data: any, { dispatch }) => {
    const { result } = (await HttpCall.post('/user', { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const UpdateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, ...data }: any, { dispatch }) => {
    const { result } = (await HttpCall.put(`/user/${id}`, { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const GetUser = createAsyncThunk(
  'user/getUser',
  async (params: any, { dispatch }) => {
    const { result } = (await HttpCall.get(`/user`, { params })).data;
    return result;
  }
);

export const GetOptUser = createAsyncThunk(
  'user/getOptUser',
  async (_, { dispatch }) => {
    const { result } = (await HttpCall.get(`/user/opt`)).data;
    return result;
  }
);

export const GetOneUser = createAsyncThunk(
  'user/getOneUser',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.get(`/user/${id}`)).data;
    return result;
  }
);

export const DeleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.delete(`/user/${id}`)).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const ResetDevice = createAsyncThunk(
  'employee/resetDevice',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.patch(`/user/reset-device/${id}`)).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const ResetPassword = createAsyncThunk(
  'employee/resetPassword',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.patch(`/user/reset-password/${id}`))
      .data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    NullFormResult: (state: UserState, _) => {
      state.formResult = null;
    },
    SetDetail: (state: UserState, param: any) => {
      const { payload } = param;
      state.detail = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateUser.pending, (state: UserState) => {
      state.progress = true;
    });
    builder.addCase(CreateUser.fulfilled, (state: UserState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(CreateUser.rejected, (state: UserState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(UpdateUser.pending, (state: UserState) => {
      state.progress = true;
    });
    builder.addCase(UpdateUser.fulfilled, (state: UserState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(UpdateUser.rejected, (state: UserState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(DeleteUser.pending, (state: UserState) => {
      state.progress = true;
    });
    builder.addCase(DeleteUser.fulfilled, (state: UserState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(DeleteUser.rejected, (state: UserState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(ResetDevice.pending, (state: UserState) => {
      state.progress = true;
    });
    builder.addCase(ResetDevice.fulfilled, (state: UserState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(ResetDevice.rejected, (state: UserState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(ResetPassword.pending, (state: UserState) => {
      state.progress = true;
    });
    builder.addCase(
      ResetPassword.fulfilled,
      (state: UserState, { payload }) => {
        state.progress = false;
        state.formResult = payload;
      }
    );
    builder.addCase(ResetPassword.rejected, (state: UserState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetUser.pending, (state: UserState) => {
      state.progress = true;
    });
    builder.addCase(GetUser.fulfilled, (state: UserState, { payload }) => {
      state.progress = false;
      state.data = payload;
    });
    builder.addCase(GetUser.rejected, (state: UserState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOneUser.pending, (state: UserState) => {
      state.progress = true;
    });
    builder.addCase(GetOneUser.fulfilled, (state: UserState, { payload }) => {
      state.progress = false;
      state.detail = payload;
    });
    builder.addCase(GetOneUser.rejected, (state: UserState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOptUser.pending, (state: UserState) => {
      state.progress = true;
    });
    builder.addCase(GetOptUser.fulfilled, (state: UserState, { payload }) => {
      state.progress = false;
      state.opt = payload;
    });
    builder.addCase(GetOptUser.rejected, (state: UserState) => {
      state.progress = false;
    });
  },
});

// Create and export the selector:
export const selectUser = (state: RootState) => state.user;
export const { NullFormResult, SetDetail } = userSlice.actions;

// It is a convention to export reducer as a default export:
export default userSlice.reducer;
