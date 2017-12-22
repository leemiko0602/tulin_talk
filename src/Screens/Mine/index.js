import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity, Dimensions,processColor} from "react-native";
import styled from "styled-components/native";
import { colors, sizes } from "../../Data/constants";
import MapView from "react-native-maps";
import getDirections from "react-native-google-maps-directions";
import MapMarker from "./MapMarker";
import Browser from "react-native-tobrowser";
import Swiper from 'react-native-swiper'


export default class gmapsDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {},
      city: {}
    };
  }
  componentDidMount() {
    this.getCurrentPosition();
  }
  /**
 * 获取当前的网络位置
 *
 * @link https://facebook.github.io/react-native/docs/geolocation.html
 */
  getCurrentPosition = () =>
    new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log("geolocation.success", { position });
          this.setState({
            city: position
          });
          resolve(position.coords);
        },
        err => {
          console.warn("geolocation.error", { err });
          resolve({ latitude: 22.396428, longitude: 114.109497 }); 
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    });

  handleGetDirections = () => {
    const data = {
      source: {
        latitude: 39.90960456049752,
        longitude: 116.3972282409668
      },
      destination: {
        latitude: 31.2303904,
        longitude: 121.47370209999997
      },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    };

    getDirections(data);
  };
  

  render() {
    console.log("in");
    console.log("this.props", this.props);
    
    return (
        <Container>
        <Button onPress={() => this.handleGetDirections()} title="Get Directions" />
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("MapDirection", {
              destination: this.state.city
            })}
        >
          <MapMarker city="故宫" />
        </TouchableOpacity>
        <Button onPress={() =>  this.props.navigation.navigate("Drawer")} title="Drawer" />
        </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${colors.blackDark};
`;
const MapWrapper = styled.View`
  margin-top: 30;
  width: 100;
  height: 100;
  border: red;
`;


