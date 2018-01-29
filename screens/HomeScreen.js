// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// const util = require('util')
//
//
//
// export default class FirstScreen extends Component {
//   static navigationOptions = {
//     title: 'First screen',
//   }
//   render() {
//     console.log('this.props.navigation = ' + util.inspect(this.props.navigation, false, null));
//     var {navigate} = this.props.navigation
//     return(
//       <View>
//         <Text>This is screen 1</Text>
//         <Button
//           onPress={
//             () => navigate('Second', {name: 'brett', email: 'brett@gmail'})
//           }
//           title="Go to screen 2">
//         </Button>
//       </View>
//     )
//   }
// }



import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
const util = require('util')


export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home Screen',
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      latitude: null,
      longitude: null,
      error: null
    }
  }

  componentDidMount() {
    this._loadFontsAsync();


    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );


  }

  _loadFontsAsync = async () => {
    await Font.loadAsync({thirsty: require('../assets/fonts/Thirsty.otf')});
    this.setState({loaded: true});
  }


  render() {
    var {navigate} = this.props.navigation

    if (!this.state.loaded) {
      return <AppLoading />;
    }

    return (
      <ImageBackground
        style={styles.background}
        source={require('../assets/images/eat.png')}
      >
      <StatusBar hidden={true} />
      <TouchableOpacity
        onPress={
          () => navigate('SecondScreen', {lat: this.state.latitude, long: this.state.longitude})
        }
        style={styles.primaryButton}
      >
        <Text style={styles.fontLogo}>eat</Text>
      </TouchableOpacity>
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    height: 20,
    width: '100%',
    position: 'absolute',
    top: 0
  },
  background: {
    backgroundColor: '#ccc',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: 120,
    width: 120,
    borderRadius: 100
  },
  fontLogo: {
    color: '#fff',
    fontFamily: 'thirsty',
    fontSize: 50,
    padding: 5,
    marginRight: 5
  }
});
