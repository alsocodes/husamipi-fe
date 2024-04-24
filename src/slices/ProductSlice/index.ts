import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import HttpCall from '../../utils/HttpCall/index.js';
import { SetToastData } from '../ConfigSlice/index.ts';

export type ProductType = {
  _action?: string;
  id: number;
  name: string;
  price: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type DataType = {
  count: number;
  page: number;
  totalPage: number;
  rows: ProductType[];
};
export type ProductState = {
  progress: boolean;
  formResult: any;
  data: DataType | null;
  opt: any[];
  detail: ProductType | null;
  accesses: string[];
};

const initialState: ProductState = {
  progress: false,
  data: null,
  formResult: null,
  opt: [],
  detail: null,
  accesses: [],
};

export const CreateProduct = createAsyncThunk(
  'product/createProduct',
  async (data: any, { dispatch }) => {
    const { result } = (await HttpCall.post('/product', { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const UpdateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, ...data }: any, { dispatch }) => {
    const { result } = (await HttpCall.put(`/product/${id}`, { ...data })).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const GetProduct = createAsyncThunk(
  'product/getProduct',
  async (params: any, { dispatch }) => {
    const { result } = (await HttpCall.get(`/product`, { params })).data;
    return result;
  }
);

export const GetOptProduct = createAsyncThunk(
  'product/GetOpt',
  async (search, { dispatch }) => {
    const { result } = (
      await HttpCall.get(`/product/opt`, { params: { search } })
    ).data;
    return result;
  }
);

export const GetOneProduct = createAsyncThunk(
  'product/getOneProduct',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.get(`/product/${id}`)).data;
    return result;
  }
);

export const DeleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: number, { dispatch }) => {
    const { result } = (await HttpCall.delete(`/product/${id}`)).data;
    dispatch(SetToastData({ type: 'success', message: 'Berhasil' }));
    return result;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    NullFormResult: (state: ProductState, _) => {
      state.formResult = null;
    },
    SetDetail: (state: ProductState, param: any) => {
      const { payload } = param;
      state.detail = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateProduct.pending, (state: ProductState) => {
      state.progress = true;
    });
    builder.addCase(
      CreateProduct.fulfilled,
      (state: ProductState, { payload }) => {
        state.progress = false;
        state.formResult = payload;
      }
    );
    builder.addCase(CreateProduct.rejected, (state: ProductState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(UpdateProduct.pending, (state: ProductState) => {
      state.progress = true;
    });
    builder.addCase(
      UpdateProduct.fulfilled,
      (state: ProductState, { payload }) => {
        state.progress = false;
        state.formResult = payload;
      }
    );
    builder.addCase(UpdateProduct.rejected, (state: ProductState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(DeleteProduct.pending, (state: ProductState) => {
      state.progress = true;
    });
    builder.addCase(
      DeleteProduct.fulfilled,
      (state: ProductState, { payload }) => {
        state.progress = false;
        state.formResult = payload;
      }
    );
    builder.addCase(DeleteProduct.rejected, (state: ProductState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetProduct.pending, (state: ProductState) => {
      state.progress = true;
    });
    builder.addCase(
      GetProduct.fulfilled,
      (state: ProductState, { payload }) => {
        state.progress = false;
        state.data = payload;
      }
    );
    builder.addCase(GetProduct.rejected, (state: ProductState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOneProduct.pending, (state: ProductState) => {
      state.progress = true;
    });
    builder.addCase(
      GetOneProduct.fulfilled,
      (state: ProductState, { payload }) => {
        state.progress = false;
        state.detail = payload;
      }
    );
    builder.addCase(GetOneProduct.rejected, (state: ProductState) => {
      state.progress = false;
    });

    // ---
    builder.addCase(GetOptProduct.pending, (state: ProductState) => {
      state.progress = true;
    });
    builder.addCase(
      GetOptProduct.fulfilled,
      (state: ProductState, { payload }) => {
        state.progress = false;
        state.opt = payload;
      }
    );
    builder.addCase(GetOptProduct.rejected, (state: ProductState) => {
      state.progress = false;
    });

    // ---
  },
});

// Create and export the selector:
export const selectProduct = (state: RootState) => state.product;
export const { NullFormResult, SetDetail } = productSlice.actions;

// It is a convention to export reducer as a default export:
export default productSlice.reducer;
