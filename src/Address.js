/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      latitude: 37.78825,
      longitude: -122.4324,
    };
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Address</Text>
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}>
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
}
