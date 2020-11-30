/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
var {width} = Dimensions.get('window');
// import icons
import Icon from 'react-native-vector-icons/Ionicons';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('cart')
      .then((cart) => {
        if (cart !== null) {
          // We have data!!
          const cartfood = JSON.parse(cart);
          this.setState({dataCart: cartfood});
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  onChangeQual(i, type) {
    const dataCar = this.state.dataCart;
    let cantd = dataCar[i].quantity;

    if (type) {
      cantd = cantd + 1;
      dataCar[i].quantity = cantd;
      this.setState({dataCart: dataCar});
    } else if (type === false && cantd >= 2) {
      cantd = cantd - 1;
      dataCar[i].quantity = cantd;
      this.setState({dataCart: dataCar});
    } else if (type === false && cantd === 1) {
      dataCar.splice(i, 1);
      this.setState({dataCart: dataCar});
    }
  }
  onLoadTotal() {
    var total = 0;
    const cart = this.state.dataCart;

    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].quantity;
    }
    return total;
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{height: 20}} />
        <Text style={{fontSize: 32, fontWeight: 'bold', color: '#33c37d'}}>
          Cart food
        </Text>
        <View style={{height: 10}} />

        <View style={{flex: 1}}>
          <ScrollView>
            {this.state.dataCart.map((item, i) => {
              return (
                <View
                  style={{
                    width: width - 20,
                    margin: 10,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    borderBottomWidth: 2,
                    borderColor: '#cccccc',
                    paddingBottom: 10,
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: width / 3, height: width / 3}}
                    source={{uri: item.food.image}}
                  />
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'trangraysparent',
                      padding: 10,
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {item.food.name}
                      </Text>
                      <Text>Lorem Ipsum de food</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#33c37d',
                          fontSize: 20,
                        }}>
                        ${item.price * item.quantity}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => this.onChangeQual(i, false)}>
                          <Icon
                            name="ios-remove-circle"
                            size={35}
                            color={'#33c37d'}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            paddingHorizontal: 8,
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.onChangeQual(i, true)}>
                          <Icon
                            name="ios-add-circle"
                            size={35}
                            color={'#33c37d'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}

            <View style={{height: 20}} />
            <Text style={{fontSize: 28, color: '#33c37d', textAlign: 'center'}}>
              ${this.onLoadTotal()}
            </Text>

            <View style={{height: 20}} />
            <TouchableOpacity
              style={{
                backgroundColor: '#33c37d',
                width: width - 40,
                alignItems: 'center',
                padding: 10,
                borderRadius: 5,
                margin: 20,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                CHECKOUT
              </Text>
            </TouchableOpacity>

            <View style={{height: 20}} />
          </ScrollView>
        </View>
      </View>
    );
  }
}
