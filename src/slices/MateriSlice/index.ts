import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import HttpCall from '../../utils/HttpCall/index.js';
import { SetToastData } from '../ConfigSlice/index.ts';

export type AttachmentType = {
  name: string;
  type: 'image' | 'pdf' | 'video' | 'doc' | 'xls' | 'ppt';
  source: string;
};

export type MateriType = {
  _action?: string;
  id: number;
  title: string;
  description: string;
  user: { id: number; name: string };
  product: { id: number; name: string };
  createdAt?: Date;
  updatedAt?: Date;
  attachments?: AttachmentType[];
};

type DataType = {
  count: number;
  page: number;
  totalPage: number;
  rows: MateriType[];
};
export type MateriState = {
  progress: boolean;
  formResult: any;
  data: DataType | null;
  opt: any[];
  detail: MateriType | null;
  accesses: string[];
};

const initialState: MateriState = {
  progress: false,
  data: null,
  formResult: null,
  opt: [],
  detail: null,
  accesses: [],
};

export const CreateMateri = createAsyncThunk(
  'materi/createMateri',
  async (data: any, { dispatch }) => {
    const { result } = (await HttpCall.post('/materi', { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const UpdateMateri = createAsyncThunk(
  'materi/updateMateri',
  async ({ id, ...data }: any, { dispatch }) => {
    const { result } = (await HttpCall.put(`/materi/${id}`, { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const GetMateri = createAsyncThunk(
  'materi/getMateri',
  async (params: any, { dispatch }) => {
    const { result } = (await HttpCall.get(`/materi`, { params })).data;
    return result;
  }
);

export const GetOptMateri = createAsyncThunk(
  'user/GetOpt',
  async (search, { dispatch }) => {
    const { result } = (
      await HttpCall.get(`/materi/opt`, { params: { search } })
    ).data;
    return result;
  }
);

export const GetOneMateri = createAsyncThunk(
  'materi/getOneMateri',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.get(`/materi/${id}`)).data;
    return result;
  }
);

export const DeleteMateri = createAsyncThunk(
  'materi/deleteMateri',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.delete(`/materi/${id}`)).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const UploadAttachments = async (file: any) => {
  const formData = new FormData();
  formData.append('attachment', file);

  const res = (
    await HttpCall.post(`/materi/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event) => {
        const percentage = Math.round(
          (100 * event.loaded) / (event?.total || 1)
        );
        console.log(percentage);
      },
    })
  ).data;
  return res;
};

export const materiSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    NullFormResult: (state: MateriState, _) => {
      state.formResult = null;
    },
    SetDetail: (state: MateriState, param: any) => {
      const { payload } = param;
      state.detail = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateMateri.pending, (state: MateriState) => {
      state.progress = true;
    });
    builder.addCase(
      CreateMateri.fulfilled,
      (state: MateriState, { payload }) => {
        state.progress = false;
        state.formResult = payload;
      }
    );
    builder.addCase(CreateMateri.rejected, (state: MateriState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(UpdateMateri.pending, (state: MateriState) => {
      state.progress = true;
    });
    builder.addCase(
      UpdateMateri.fulfilled,
      (state: MateriState, { payload }) => {
        state.progress = false;
        state.formResult = payload;
      }
    );
    builder.addCase(UpdateMateri.rejected, (state: MateriState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(DeleteMateri.pending, (state: MateriState) => {
      state.progress = true;
    });
    builder.addCase(
      DeleteMateri.fulfilled,
      (state: MateriState, { payload }) => {
        state.progress = false;
        state.formResult = payload;
      }
    );
    builder.addCase(DeleteMateri.rejected, (state: MateriState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetMateri.pending, (state: MateriState) => {
      state.progress = true;
    });
    builder.addCase(GetMateri.fulfilled, (state: MateriState, { payload }) => {
      state.progress = false;
      state.data = payload;
    });
    builder.addCase(GetMateri.rejected, (state: MateriState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOneMateri.pending, (state: MateriState) => {
      state.progress = true;
    });
    builder.addCase(
      GetOneMateri.fulfilled,
      (state: MateriState, { payload }) => {
        state.progress = false;
        state.detail = payload;
      }
    );
    builder.addCase(GetOneMateri.rejected, (state: MateriState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOptMateri.pending, (state: MateriState) => {
      state.progress = true;
    });
    builder.addCase(
      GetOptMateri.fulfilled,
      (state: MateriState, { payload }) => {
        state.progress = false;
        state.opt = payload;
      }
    );
    builder.addCase(GetOptMateri.rejected, (state: MateriState) => {
      state.progress = false;
    });

    // ---
  },
});

// Create and export the selector:
export const selectMateri = (state: RootState) => state.materi;
export const { NullFormResult, SetDetail } = materiSlice.actions;

// It is a convention to export reducer as a default export:
export default materiSlice.reducer;
