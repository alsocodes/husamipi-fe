import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import HttpCall from '../../utils/HttpCall/index.js';
import { SetToastData } from '../ConfigSlice/index.ts';

export enum Access {
  dashboard_view = 'dashboard_view',

  user_create = 'user_create',
  user_read = 'user_read',
  user_update = 'user_update',
  user_delete = 'user_delete',

  role_create = 'role_create',
  role_read = 'role_read',
  role_update = 'role_update',
  role_delete = 'role_delete',

  company_create = 'company_create',
  company_read = 'company_read',
  company_update = 'company_update',
  company_delete = 'company_delete',

  employee_create = 'employee_create',
  employee_read = 'employee_read',
  employee_update = 'employee_update',
  employee_delete = 'employee_delete',

  forum_create = 'forum_create',
  forum_read = 'forum_read',
  forum_update = 'forum_update',
  forum_delete = 'forum_delete',
  forum_moderator = 'forum_moderator',

  elearning_create = 'elearning_create',
  elearning_read = 'elearning_read',
  elearning_update = 'elearning_update',
  elearning_delete = 'elearning_delete',

  products_create = 'product_create',
  product_read = 'product_read',
  product_update = 'product_update',
  product_delete = 'product_delete',
}

export type RoleType = {
  _action?: string;
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  accesses: Access[];
};

type DataType = {
  count: number;
  page: number;
  totalPage: number;
  rows: RoleType[];
};
export type RoleState = {
  progress: boolean;
  formResult: any;
  data: DataType | null;
  opt: any[];
  detail: RoleType | null;
  accesses: string[];
};

const initialState: RoleState = {
  progress: false,
  data: null,
  formResult: null,
  opt: [],
  detail: null,
  accesses: [],
};

export const GetAllAccess = createAsyncThunk(
  'role/getAllAccess',
  async (data: any, { dispatch }) => {
    const { result } = (await HttpCall.get('/role/accesses')).data;
    return result;
  }
);

export const CreateRole = createAsyncThunk(
  'role/createRole',
  async (data: any, { dispatch }) => {
    const { result } = (await HttpCall.post('/role', { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const UpdateRole = createAsyncThunk(
  'role/updateRole',
  async ({ id, ...data }: any, { dispatch }) => {
    const { result } = (await HttpCall.put(`/role/${id}`, { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const GetRole = createAsyncThunk(
  'role/getRole',
  async (params: any, { dispatch }) => {
    const { result } = (await HttpCall.get(`/role`, { params })).data;
    return result;
  }
);

export const GetOptRole = createAsyncThunk(
  'user/GetOpt',
  async (search, { dispatch }) => {
    const { result } = (await HttpCall.get(`/role/opt`, { params: { search } }))
      .data;
    return result;
  }
);

export const GetOneRole = createAsyncThunk(
  'role/getOneRole',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.get(`/role/${id}`)).data;
    return result;
  }
);

export const DeleteRole = createAsyncThunk(
  'role/deleteRole',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.delete(`/role/${id}`)).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const roleSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    NullFormResult: (state: RoleState, _) => {
      state.formResult = null;
    },
    SetDetail: (state: RoleState, param: any) => {
      const { payload } = param;
      state.detail = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateRole.pending, (state: RoleState) => {
      state.progress = true;
    });
    builder.addCase(CreateRole.fulfilled, (state: RoleState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(CreateRole.rejected, (state: RoleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(UpdateRole.pending, (state: RoleState) => {
      state.progress = true;
    });
    builder.addCase(UpdateRole.fulfilled, (state: RoleState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(UpdateRole.rejected, (state: RoleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(DeleteRole.pending, (state: RoleState) => {
      state.progress = true;
    });
    builder.addCase(DeleteRole.fulfilled, (state: RoleState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(DeleteRole.rejected, (state: RoleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetRole.pending, (state: RoleState) => {
      state.progress = true;
    });
    builder.addCase(GetRole.fulfilled, (state: RoleState, { payload }) => {
      state.progress = false;
      state.data = payload;
    });
    builder.addCase(GetRole.rejected, (state: RoleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOneRole.pending, (state: RoleState) => {
      state.progress = true;
    });
    builder.addCase(GetOneRole.fulfilled, (state: RoleState, { payload }) => {
      state.progress = false;
      state.detail = payload;
    });
    builder.addCase(GetOneRole.rejected, (state: RoleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOptRole.pending, (state: RoleState) => {
      state.progress = true;
    });
    builder.addCase(GetOptRole.fulfilled, (state: RoleState, { payload }) => {
      state.progress = false;
      state.opt = payload;
    });
    builder.addCase(GetOptRole.rejected, (state: RoleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetAllAccess.pending, (state: RoleState) => {
      state.progress = true;
    });
    builder.addCase(GetAllAccess.fulfilled, (state: RoleState, { payload }) => {
      state.progress = false;
      state.accesses = payload;
    });
    builder.addCase(GetAllAccess.rejected, (state: RoleState) => {
      state.progress = false;
    });
  },
});

// Create and export the selector:
export const selectRole = (state: RootState) => state.role;
export const { NullFormResult, SetDetail } = roleSlice.actions;

// It is a convention to export reducer as a default export:
export default roleSlice.reducer;
