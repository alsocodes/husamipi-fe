import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import HttpCall from '../../utils/HttpCall/index.js';
import { SetToastData } from '../ConfigSlice/index.ts';

export type ForumType = {
  _action?: string;
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'rejected';
  statusInfo?: string;
  childs?: ForumType[];
  user: { id: true; name: true };
  createdAt?: Date;
  updatedAt?: Date;
};

type DataType = {
  count: number;
  page: number;
  totalPage: number;
  rows: ForumType[];
};
export type ForumState = {
  progress: boolean;
  formResult: any;
  data: DataType | null;
  opt: any[];
  detail: ForumType | null;
  accesses: string[];
};

const initialState: ForumState = {
  progress: false,
  data: null,
  formResult: null,
  opt: [],
  detail: null,
  accesses: [],
};

export const CreateForum = createAsyncThunk(
  'forum/createForum',
  async (data: any, { dispatch }) => {
    const { result } = (await HttpCall.post('/forum', { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const UpdateForum = createAsyncThunk(
  'forum/updateForum',
  async ({ id, ...data }: any, { dispatch }) => {
    const { result } = (await HttpCall.put(`/forum/${id}`, { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const GetForum = createAsyncThunk(
  'forum/getForum',
  async (params: any, { dispatch }) => {
    const { result } = (await HttpCall.get(`/forum`, { params })).data;
    return result;
  }
);

export const GetOptForum = createAsyncThunk(
  'user/GetOpt',
  async (search, { dispatch }) => {
    const { result } = (
      await HttpCall.get(`/forum/opt`, { params: { search } })
    ).data;
    return result;
  }
);

export const GetOneForum = createAsyncThunk(
  'forum/getOneForum',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.get(`/forum/${id}`)).data;
    return result;
  }
);

export const DeleteForum = createAsyncThunk(
  'forum/deleteForum',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.delete(`/forum/${id}`)).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const forumSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    NullFormResult: (state: ForumState, _) => {
      state.formResult = null;
    },
    SetDetail: (state: ForumState, param: any) => {
      const { payload } = param;
      state.detail = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateForum.pending, (state: ForumState) => {
      state.progress = true;
    });
    builder.addCase(CreateForum.fulfilled, (state: ForumState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(CreateForum.rejected, (state: ForumState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(UpdateForum.pending, (state: ForumState) => {
      state.progress = true;
    });
    builder.addCase(UpdateForum.fulfilled, (state: ForumState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(UpdateForum.rejected, (state: ForumState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(DeleteForum.pending, (state: ForumState) => {
      state.progress = true;
    });
    builder.addCase(DeleteForum.fulfilled, (state: ForumState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(DeleteForum.rejected, (state: ForumState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetForum.pending, (state: ForumState) => {
      state.progress = true;
    });
    builder.addCase(GetForum.fulfilled, (state: ForumState, { payload }) => {
      state.progress = false;
      state.data = payload;
    });
    builder.addCase(GetForum.rejected, (state: ForumState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOneForum.pending, (state: ForumState) => {
      state.progress = true;
    });
    builder.addCase(GetOneForum.fulfilled, (state: ForumState, { payload }) => {
      state.progress = false;
      state.detail = payload;
    });
    builder.addCase(GetOneForum.rejected, (state: ForumState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOptForum.pending, (state: ForumState) => {
      state.progress = true;
    });
    builder.addCase(GetOptForum.fulfilled, (state: ForumState, { payload }) => {
      state.progress = false;
      state.opt = payload;
    });
    builder.addCase(GetOptForum.rejected, (state: ForumState) => {
      state.progress = false;
    });

    // ---
  },
});

// Create and export the selector:
export const selectForum = (state: RootState) => state.forum;
export const { NullFormResult, SetDetail } = forumSlice.actions;

// It is a convention to export reducer as a default export:
export default forumSlice.reducer;
