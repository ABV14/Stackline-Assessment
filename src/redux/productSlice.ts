import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts'; 
import { ProductState } from '../components/utils/product.ts';

const initialState: ProductState = {
  products: [],
  view_index: -1,
  error: "",
  loading: false,
};

export const selectCurrentProduct = (state: RootState): any => {

  const products = state.product.products;
  const index = state.product.view_index;
  return index > -1 ? products[index] : {};
};

export const fetchProductDetails = createAsyncThunk('product/fetchSharkNinja', async () => {
  const response = await fetch('data/stackline_frontend_assessment_data.json');
  console.log(response,'response')
  const data = await response.json();
  return data;
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        
      })
      .addCase(fetchProductDetails.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.error = "";
        state.products = action.payload;
        state.view_index = 0;

      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.view_index = 0;
      });
   
  },
});

export default productSlice.reducer;
