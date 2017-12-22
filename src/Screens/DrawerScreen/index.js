import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions,processColor} from "react-native";
import styled from "styled-components/native";
import { colors, feedbacks } from "../../Data/constants";


export default class Drawer extends Component { 
  static navigationOptions = {
    drawerLabel: 'DrawerScreen',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("../../assets/index-icon.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  }
  render() {
    return (
      <Container>
        <Text>Drawer screen</Text>
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
background-color: ${colors.primaryLight};
`;