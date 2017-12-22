import React, { Component } from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import BrowserView from "./Screens/BrowserView";
import { colors } from "./Data/constants";
import { Image } from "react-native";

import MapDirection from "./Screens/Map/Direction";
import Main from "./Screens/Main";
import Chat from './Screens/Chat';
import Mine from './Screens/Mine';
import Drawer from './Screens/DrawerScreen'

// tabbar icons
const icons = {
  explore: require("./assets/index-icon.png"),
  city: require("./assets/explore-icon.png"),
  market: require("./assets/package-icon.png"),
  ucenter: require("./assets/user-center-icon.png")
};

// Tabbar: TabNavigator
const TabbarNavigator = TabNavigator(
  {
    ExploreTab: {
      screen: Main,
      navigationOptions: {
        title: "主页",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={icons.explore}
            style={[{ width: 18.5, height: 19 }, { tintColor }]}
          />
        )
      }
    },
    CityTab: {
      screen: MapDirection,
      navigationOptions: {
        title: "地图",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={icons.city}
            style={[{ width: 16, height: 18.5 }, { tintColor }]}
          />
        )
      }
    },
    TalkTab: {
      screen: Chat,
      navigationOptions: {
        title: "聊天",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={icons.market}
            style={[{ width: 18.5, height: 18.5 }, { tintColor }]}
          />
        )
      }
    },
    UCenterTab: {
      screen: Mine,
      navigationOptions: {
        title: "我的",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={icons.ucenter}
            style={[{ width: 16, height: 18.5 }, { tintColor }]}
          />
        )
      }
    }
  },
  {
    lazy: true,
    headerMode: "none",
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: "ExploreTab",
    tabBarOptions: {
      style: {
        backgroundColor: colors.primaryDark
      },
      inactiveTintColor: colors.primaryLight,
      activeTintColor: colors.primaryRed,
      labelStyle: {
        marginBottom: 6.5
      }
    }
  }
);

// MainApp: StackNavigator
const MainNavigator = StackNavigator(
  {
    BrowserView: { screen: BrowserView },
    Main: { screen: Main },
    MainScreen: { screen: TabbarNavigator },
    MapDirection: { screen: MapDirection },
    Drawer: {screen: Drawer}
  },
  {
    initialRouteName: "MainScreen",
    headerMode: "none"
  }
);

class App extends Component {
  render() {
    return <MainNavigator />;
  }
}

module.exports = App;
