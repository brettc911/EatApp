import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import key from '../key'
const util = require('util')



export default class FirstScreen extends Component {
  static navigationOptions = {
    title: 'Second screen',
  }

  constructor(props){
    super(props)
    this.state = {
      location: null,
      restaurant: null
    }
  }

  componentWillMount(){
    let lat = this.props.navigation.state.params.lat
    let long = this.props.navigation.state.params.long
    this.setState({ location: `${lat},${long}`})
  }

  componentDidMount(){
    let loc = this.state.location
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&radius=8000&type=restaurant&opennow=True&key=${key}`;

    fetch(url, {
      method: 'GET'
    }).then(res => res.json())
    .catch(error => console.log(error))
    .then(response =>
      this.setState({ restaurant: choose_restaurant(response.results) })
    )



    function choose_restaurant(all_restaurants){
      let rand_int = getRandomInt(0, all_restaurants.length-1);
      if (all_restaurants[rand_int]) {

        return all_restaurants[rand_int]['name']
      }
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

  }











  render() {
    var {params} = this.props.navigation.state
    return(
      <View>
        <Text>{this.state.restaurant}</Text>
      </View>
    )
  }
}
