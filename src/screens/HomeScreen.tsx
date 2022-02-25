import {
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Text,
  ListRenderItemInfo,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackParamList';
import axios from 'axios';
import {IProductItem} from '../interfaces/index';
import {useDispatch, useSelector} from 'react-redux';
import {saveProduct} from '../store/ProductReducer/ProductReducer';
import {RootState} from '../store';

const HomeScreen = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>
    >();
  const navigateFavoriteScreen = () => {
    navigation.navigate('FavoriteScreen');
  };

  // const [IProductItem, setIProductItem] = useState<IProductItem[]>([]);
  useEffect(() => {
    if (productState.products.length == 0) {
      fetchProducts();
    }
  }, []);

  const productState = useSelector((state: RootState) => state.product);
  // productState.products;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = 'https://fakestoreapi.com/products';
      const response = await axios.get<IProductItem[]>(url);
      // setIProductItem(response.data);
      dispatch(saveProduct(response.data));
    } catch (ex) {
      console.log(ex);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const navigateToDetailScreen = (item: IProductItem) => {
    navigation.navigate('DetailScreen', {
      item: item,
    });
  };

  const renderProductItem = (
    renderItemInfo: ListRenderItemInfo<IProductItem>,
  ) => {
    const {item, index} = renderItemInfo;
    return (
      <TouchableOpacity onPress={() => navigateToDetailScreen(item)}>
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={{uri: `${item.image}`}} />
          <View style={styles.prodContainer}>
            <Text style={styles.titleTxt}>{item.title}</Text>
            <View style={styles.descContainer}>
              <Text style={styles.text}>
                ${item.price} | {item.category}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.home}>HomeScreen</Text>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={navigateFavoriteScreen}>
          <Image
            style={styles.favBtn}
            source={require('../../assets/heart.png')}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList data={productState.products} renderItem={renderProductItem} />
      )}
    </View>
  );
};

export default HomeScreen;

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
  favBtn: {
    width: 32,
    height: 32,
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
    width: 210,
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
