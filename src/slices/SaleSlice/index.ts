import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import HttpCall from '../../utils/HttpCall/index.js';
import { SetToastData } from '../ConfigSlice/index.ts';

export type SaleType = {
  _action?: string;
  id: number;
  soNumber: string;
  invoiceNumber: string;
  date: Date;
  customer: string;
  total: number;
  saleDetails: {
    product: { id: number; name: string };
    price: number;
    ppn: number;
    total: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};

type DataType = {
  count: number;
  page: number;
  totalPage: number;
  rows: SaleType[];
};
export type SaleState = {
  progress: boolean;
  formResult: any;
  data: DataType | null;
  opt: any[];
  detail: SaleType | null;
  accesses: string[];
};

const initialState: SaleState = {
  progress: false,
  data: null,
  formResult: null,
  opt: [],
  detail: null,
  accesses: [],
};

export const CreateSale = createAsyncThunk(
  'sale/createSale',
  async (data: any, { dispatch }) => {
    const { result } = (await HttpCall.post('/sale', { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const UpdateSale = createAsyncThunk(
  'sale/updateSale',
  async ({ id, ...data }: any, { dispatch }) => {
    const { result } = (await HttpCall.put(`/sale/${id}`, { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const GetSale = createAsyncThunk(
  'sale/getSale',
  async (params: any, { dispatch }) => {
    const { result } = (await HttpCall.get(`/sale`, { params })).data;
    return result;
  }
);

export const GetOptSale = createAsyncThunk(
  'sale/GetOpt',
  async (search, { dispatch }) => {
    const { result } = (await HttpCall.get(`/sale/opt`, { params: { search } }))
      .data;
    return result;
  }
);

export const GetOneSale = createAsyncThunk(
  'sale/getOneSale',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.get(`/sale/${id}`)).data;
    return result;
  }
);

export const DeleteSale = createAsyncThunk(
  'sale/deleteSale',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.delete(`/sale/${id}`)).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    NullFormResult: (state: SaleState, _) => {
      state.formResult = null;
    },
    SetDetail: (state: SaleState, param: any) => {
      const { payload } = param;
      state.detail = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateSale.pending, (state: SaleState) => {
      state.progress = true;
    });
    builder.addCase(CreateSale.fulfilled, (state: SaleState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(CreateSale.rejected, (state: SaleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(UpdateSale.pending, (state: SaleState) => {
      state.progress = true;
    });
    builder.addCase(UpdateSale.fulfilled, (state: SaleState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(UpdateSale.rejected, (state: SaleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(DeleteSale.pending, (state: SaleState) => {
      state.progress = true;
    });
    builder.addCase(DeleteSale.fulfilled, (state: SaleState, { payload }) => {
      state.progress = false;
      state.formResult = payload;
    });
    builder.addCase(DeleteSale.rejected, (state: SaleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetSale.pending, (state: SaleState) => {
      state.progress = true;
    });
    builder.addCase(GetSale.fulfilled, (state: SaleState, { payload }) => {
      state.progress = false;
      state.data = payload;
    });
    builder.addCase(GetSale.rejected, (state: SaleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOneSale.pending, (state: SaleState) => {
      state.progress = true;
    });
    builder.addCase(GetOneSale.fulfilled, (state: SaleState, { payload }) => {
      state.progress = false;
      state.detail = payload;
    });
    builder.addCase(GetOneSale.rejected, (state: SaleState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOptSale.pending, (state: SaleState) => {
      state.progress = true;
    });
    builder.addCase(GetOptSale.fulfilled, (state: SaleState, { payload }) => {
      state.progress = false;
      state.opt = payload;
    });
    builder.addCase(GetOptSale.rejected, (state: SaleState) => {
      state.progress = false;
    });

    // ---
  },
});

// Create and export the selector:
export const selectSale = (state: RootState) => state.sale;
export const { NullFormResult, SetDetail } = saleSlice.actions;

// It is a convention to export reducer as a default export:
export default saleSlice.reducer;
