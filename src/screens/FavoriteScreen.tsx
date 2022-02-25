import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {deleteFavProduct} from '../store/FavoriteReducer/FavoriteReducer';
import {IProductItem} from '../interfaces';

const FavoriteScreen = () => {
  const favProductState = useSelector((state: RootState) => state.favProduct);

  const dispatch = useDispatch();
  const onDeleteFavProduct = (item: IProductItem) => {
    dispatch(deleteFavProduct(item));
    Alert.alert('Info', 'Product has been removed from Favorite', [
      {
        text: 'Ok',
      },
    ]);
  };

  const renderFavProductItem = (
    renderItemInfo: ListRenderItemInfo<IProductItem>,
  ) => {
    const {item, index} = renderItemInfo;
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={{uri: `${item.image}`}} />
        <TouchableOpacity onPress={() => onDeleteFavProduct(item)}>
          <Image
            style={styles.deleteBtn}
            source={require('../../assets/delete.png')}
          />
        </TouchableOpacity>
        <View style={styles.prodContainer}>
          <Text style={styles.titleTxt}>{item.title}</Text>
          <View style={styles.descContainer}>
            <Text style={styles.text}>
              ${item.price} | {item.category}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={favProductState.favProducts}
        renderItem={renderFavProductItem}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  touchableOpacity: {
    width: 32,
    height: 32,
    right: 15,
    alignSelf: 'flex-end',
    top: 12,
    position: 'absolute',
  },
  deleteBtn: {
    width: 20,
    height: 20,
    alignSelf: 'flex-start',
    left: 200,
  },
  home: {
    color: 'black',
    fontWeight: '500',
    fontSize: 21,
    padding: 15,
  },
  header: {
    backgroundColor: 'white',
    elevation: 5,
    height: 56,
  },
  itemContainer: {
    padding: 12,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 1,
    alignContent: 'center',
    shadowRadius: 3,
    flexDirection: 'row',
  },
  prodContainer: {
    justifyContent: 'center',
    width: 200,
  },
  titleTxt: {
    color: 'black',
    fontWeight: '500',
    paddingLeft: 10,
  },
  descContainer: {
    left: 10,
  },
  text: {
    color: '#787878',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 15,
  },
  loading: {
    justifyContent: 'center',
    alignContent: 'center',
    display: 'flex',
    flex: 1,
  },
});
