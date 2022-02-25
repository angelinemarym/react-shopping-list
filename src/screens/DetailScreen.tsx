import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackParamList';
import {useDispatch} from 'react-redux';
import {IProductItem} from '../interfaces';
import {
  addFavProduct,
  deleteFavProduct,
} from '../store/FavoriteReducer/FavoriteReducer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailScreen'>>();
  const {id, title, price, category, description, image} = route.params.item;

  const dispatch = useDispatch();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'DetailScreen'>
    >();

  const [addedFav, setAddedFav] = useState(false);
  const onAddFavorite = () => {
    const addedFavProduct: IProductItem = {
      id: id,
      title: title,
      price: price,
      category: category,
      description: description,
      image: image,
    };
    setAddedFav(prevAddFav => (prevAddFav = true));
    dispatch(addFavProduct(addedFavProduct));
    Alert.alert(
      'Congratulation',
      'Product has been successfully added to Favorite',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('FavoriteScreen'),
        },
      ],
    );
  };

  const onDeleteFavProduct = (item: IProductItem) => {
    setAddedFav(prevAddFav => (prevAddFav = false));
    dispatch(deleteFavProduct(item));
    Alert.alert('Info', 'Product has been removed from Favorite', [
      {
        text: 'Ok',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: `${image}`}} />
      <Text style={[styles.text, styles.txtCategory]}>{category}</Text>
      <Text style={[styles.text, styles.txtTitle]}>{title}</Text>
      <Text style={[styles.text, styles.txtPrice]}>Price: ${price}</Text>
      <Text style={styles.desc}>Description</Text>
      <ScrollView>
        <Text style={[styles.text, styles.txtDescription]}>{description}</Text>
      </ScrollView>
      <Button
        title={addedFav ? 'Remove from Favorite' : 'Add to Favorite'}
        color={addedFav ? '#575757' : '#000'}
        onPress={
          addedFav ? () => onDeleteFavProduct(route.params.item) : onAddFavorite
        }
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  text: {
    color: '#000000',
  },
  txtTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  txtCategory: {
    textTransform: 'uppercase',
    color: '#171717',
    paddingLeft: 20,
    paddingBottom: 5,
    paddingTop: 20,
  },
  txtPrice: {
    paddingLeft: 20,
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  txtDescription: {
    padding: 20,
    lineHeight: 24,
  },
  desc: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    paddingTop: 15,
    paddingLeft: 20,
  },
  image: {
    height: '35%',
    width: '100%',
  },
});
