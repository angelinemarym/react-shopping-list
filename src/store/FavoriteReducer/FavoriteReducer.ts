import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {act} from 'react-test-renderer';
import {IProductItem} from '../../interfaces';

interface FavoriteState {
  favProducts: IProductItem[];
}

const initialState = {
  favProducts: [],
} as FavoriteState;

const productSlice = createSlice({
  name: 'favProduct',
  initialState,
  reducers: {
    addFavProduct(state, action: PayloadAction<IProductItem>) {
      const i = state.favProducts.find(({id}) => id === action.payload.id);
      if (!i) {
        state.favProducts.unshift(action.payload);
      } else {
        state.favProducts;
      }
    },
    deleteFavProduct(state, action: PayloadAction<IProductItem>) {
      state.favProducts = state.favProducts.filter(
        ({id}) => id !== action.payload.id,
      );
    },
  },
});

export const {addFavProduct, deleteFavProduct} = productSlice.actions;
export default productSlice.reducer;
