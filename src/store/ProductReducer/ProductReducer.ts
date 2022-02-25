import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProductItem} from '../../interfaces';

interface ProductState {
  products: IProductItem[];
}

const initialState = {
  products: [],
} as ProductState;

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    saveProduct(state, action: PayloadAction<IProductItem[]>) {
      state.products = action.payload;
    },
  },
});

export const {saveProduct} = productSlice.actions;
export default productSlice.reducer;
