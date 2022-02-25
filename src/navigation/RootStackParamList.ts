import {IProductItem} from '../interfaces';

export type RootStackParamList = {
  HomeScreen: undefined;
  FavoriteScreen: undefined;
  DetailScreen: {
    item: IProductItem;
  };
};
