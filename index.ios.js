/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
 AppRegistry,
StyleSheet,
Dimensions,
Text,
View
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import RNGeocoder from 'react-native-geocoder';
import RNGeocoding from 'react-native-geocoding';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class GoogleMapPlayground extends React.Component {
 constructor(props) {
   super(props);

   this.state = {
      latitude: null,
      longitude: null
    }
}

// watchID = null;

// state = {
//     initialPosition: 'unknown',
//     lastPosition: 'unknown',
//   };

componentDidMount() {

  // Address Geocoding
// RNGeocoder.geocodeAddress('MapAnything,Charlotte,NC').then( 
//   (res) => {
//     // res is an Array of geocoding object (see below)
//     var location = JSON.stringify(res, 'adminArea', 'SEGUN');
//     // var location = JSON.parse(res);
//     var lastPosition = location;
//     this.setState({lastPosition});
//     console.log(location);

//     const { latitude, longitude } = res;
//     this.setState({ latitude, longitude});

// })
// .catch(err => console.log(err))

// Address Geocoding
RNGeocoding.setApiKey('AIzaSyC6v6jBjfFxIy7CH4jAnfGas9eUlv_dN_o'); // use a valid API key 
RNGeocoding.getFromLocation("MapAnything,Charlotte,NC").then(
      json => {
        var loc = json.results[0].geometry.location;
        // alert(loc.lat + ", " + loc.lng);

        const { latitude, longitude } = {latitude: loc.lat, longitude: loc.lng};
        this.setState({ latitude, longitude});
      },
      error => {
        alert(error);
      }
    );

// navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         this.setState({ latitude, longitude});
//       },
//       (error) => alert(JSON.stringify(error)),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 5000}
//     );
//     this.watchID = navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         this.setState({ latitude, longitude});
//     },
//       (error) => alert(JSON.stringify(error)),
//     );

}

// componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchID);
//   }

render() {

  if (!this.state.latitude) {
    return (<View style={styles.container}>
      <View style={{ backgroundColor: 'green', height: 100, justifyContent: 'center', alignItems: 'center'}}>
       <Text>Coordinates are Empty MICHAEL</Text>
     </View>
      </View>
      );
  }

 return (
   <View style={{ flex: 1 }}>
     <View style={{ backgroundColor: 'green', height: 100, justifyContent: 'center', alignItems: 'center'}}>

       <Text>MapAnything Home Office Coordinates Lat: {this.state.latitude}, Lng: {this.state.longitude} </Text>
     </View>
     <View style={styles.container}>
       <MapView.Animated 
         provider={PROVIDER_GOOGLE}
         style={styles.map}

         showsUserLocation={true}      
         showsPointsOfInterest={false}
         showsCompass={false}
         showsScale={false}

         initialRegion={{
           latitude: this.state.latitude,
           longitude: this.state.longitude,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta: LONGITUDE_DELTA,
         }} 

          showsTraffic={false}
          pitchEnabled={false}
          moveOnMarkerPress={false} >

         <MapView.Marker
         coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}}
         title={'MapAnything'}
         description={'Charlotte,NC Office'}/>

       </MapView.Animated >


     </View>
   </View>
 );
}}


const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   top: 100,
   justifyContent: 'flex-end',
   alignItems: 'center'
},
map: {
  ...StyleSheet.absoluteFillObject,
},
});

AppRegistry.registerComponent('GoogleMapPlayground', () => GoogleMapPlayground);