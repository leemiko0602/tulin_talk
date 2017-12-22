/* stylelint-disable property-no-unknown, declaration-no-important  */
import React, { Component } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import * as mobx from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components/native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import Swiper from "react-native-swiper";
import polyline from "@mapbox/polyline";

import images from "./assets";
import { colors, sizes, feedbacks } from "../../Data/constants";

import CommonHeader from "../../Components/CommonHeader";
import LoadingSpinner from "../../Components/LoadingSpinner/Screen";
import ThrottleTouchableOpacity from "../../Components/ThrottleTouchableOpacity";

const { action } = mobx;

const SEARCH_OPTION_HEIGHT = 45;
const LATITUDE_DELTA = 30;
const LONGITUDE_DELTA =30;
const currentRegion = {
  latitude: 39.90960456049752,
  longitude: 116.3972282409668,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};
const coordinates = [];
export default class MapDirection extends Component {
  render() {
    const { navigation, city } = this.props;
    // const { params } = this.props.navigation.state;
    // const {coords} = destination
    console.log("this.props.navigation", this.props.navigation);
    return (
      <Container>
        <CommonHeader title="地图" navigation={navigation} />
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={{
            position: "absolute",
            top: 64,
            left: 0,
            bottom: 0,
            right: 0
          }}
          showsUserLocation={true}
          userLocationAnnotationTitle={"我的位置"}
          showsMyLocationButton={true}
          showsPointsOfInterest={true}
          pitchEnabled={false}
          showsScale={true}
          loadingEnabled={true}
          region={currentRegion}
        >
          {this.renderOriginMarker({
            name: "北京",
            geometry: { location: { lat:39.90960456049752, lng: 116.3972282409668 } }
          })}
          {this.renderDestinationMarker({
            name: "上海",
            geometry: { location: { lat: 31.2303904, lng: 121.47370209999997 } }
          })}
          <MapView.Polyline
            coordinates={[
              { latitude: 39.90960456049752, longitude: 116.3972282409668 },
              { latitude: 31.2303904, longitude: 121.47370209999997 }
            ]}
          />
          <MapView.Circle
            center={{
              latitude: 39.90960456049752,
              longitude: 116.3972282409668
            }}
            radius={400000}
            strokeColor={"red"}
          />
        </MapView>
        {/* {this.renderPlaceTrigger()} */}
      </Container>
    );
  }

  renderOriginMarker(originPlace) {
    return (
      <MapView.Marker
        title="出发地"
        flat
        description={originPlace.name}
        coordinate={{
          latitude: originPlace.geometry.location.lat,
          longitude: originPlace.geometry.location.lng
        }}
      />
    );
  }

  renderDestinationMarker(destinationPlace) {
    return (
      <MapView.Marker
        title="目的地"
        description={destinationPlace.name}
        coordinate={{
          latitude: destinationPlace.geometry.location.lat,
          longitude: destinationPlace.geometry.location.lng
        }}
      />
    );
  }

  出发地和目的地的选择框;
  renderPlaceTrigger(
    allRoutes,
    origin,
    originPlace,
    destination,
    destinationPlace
  ) {
    // const { isSearching, trafficMode, trafficModes } = mapStore;
    const { navigation } = this.props;
    return (
      <SearchBox style={{ shadowOffset: { width: 1, height: 1 } }}>
        <SearchOption
          activeOpacity={feedbacks.activeOpacity}
          onPress={() => {
            navigation.navigate("MapPlacePicker", {
              title: "选择出发地",
              query: originPlace ? originPlace.name : origin,
              onPick: place => this.pickOrigin(place)
            });
          }}
        >
          <SearchSuggestIcon
            name="circle-o"
            size={15}
            color={colors.primaryDark}
            style={{ marginTop: 15 }}
          />
          <SearchOptionContent>
            <SearchSuggestText numberOfLines={1}>
              {originPlace ? originPlace.name : origin || "点击选择出发地点"}
            </SearchSuggestText>
          </SearchOptionContent>
        </SearchOption>
        <SearchOption
          activeOpacity={feedbacks.activeOpacity}
          onPress={() => {
            navigation.navigate("MapPlacePicker", {
              title: "选择目的地",
              query: destinationPlace ? destinationPlace.name : destination,
              onPick: place => this.pickDestination(place)
            });
          }}
        >
          <SearchSuggestIcon
            name="map-marker"
            size={20}
            color={colors.primaryDark}
            style={{ marginTop: 13 }}
          />
          <SearchOptionContent>
            <SearchSuggestText numberOfLines={1}>
              {destinationPlace
                ? destinationPlace.name
                : destination || "点击选择到达地点"}
            </SearchSuggestText>
          </SearchOptionContent>
        </SearchOption>
        <DirectionModes>
          {/* {
            trafficModes.map(mode =>
              <DirectionMode key={mode} activeOpacity={feedbacks.activeOpacity} onPress={() => this.onChangeMode(mode)}>
                <DirectionModeIcon source={images[trafficMode === mode ? `${mode}Active` : mode]} resizeMode="cover" />
                <DirectionModeDuration active={trafficMode === mode}>
                  {allRoutes[mode] ? allRoutes[mode][0].legs[0].duration.text.replace(/\s/g, '') : '无线路'}
                </DirectionModeDuration>
              </DirectionMode>
            )} */}
        </DirectionModes>
      </SearchBox>
    );
  }
}

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.primaryDark};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const SearchBox = styled.View`
  width: 92%;
  margin-left: 4%;
  margin-right: 4%;
  position: absolute;
  top: 80;
  padding: 0;
  background-color: ${colors.primaryLight};
  border-radius: 3;
  border-width: 1;
  border-color: ${colors.borderLight};
  shadow-color: ${colors.primaryDark};
  shadow-opacity: 0.6;
  shadow-radius: 3;
`;

const SearchOption = styled(ThrottleTouchableOpacity)`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  height: ${SEARCH_OPTION_HEIGHT};
`;

const SearchOptionContent = styled.View`
  height: ${SEARCH_OPTION_HEIGHT - 1};
  width: ${() => Dimensions.get("window").width - 165};
  flex-grow: 1;
  flex-direction: row;
  overflow: hidden;
  border-bottom-width: ${props => (props.noBorder ? 0 : 1)};
  border-bottom-color: #ededed;
`;

const SearchSuggestIcon = styled(FontAwesomeIcon)`
  width: 20;
  height: 20;
  margin-top: 15;
  margin-bottom: 10;
  margin-left: ${sizes.marginDefault};
  margin-right: 5;
`;

const SearchSuggestText = styled.Text`
  width: 100%;
  overflow: hidden;
  color: ${colors.primaryDark};
  font-size: ${sizes.fontSmall};
  line-height: ${SEARCH_OPTION_HEIGHT};
`;

const DirectionModes = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  height: ${SEARCH_OPTION_HEIGHT};
  padding-left: ${sizes.marginDefault};
  padding-right: ${sizes.marginDefault};
`;

const DirectionMode = styled(ThrottleTouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  height: 45;
  padding-top: 12.5;
  padding-bottom: 12.5;
`;

const DirectionModeIcon = styled.Image`
  width: 20;
  height: 20;
`;

const DirectionModeDuration = styled.Text`
  color: ${props => (props.active ? colors.primaryDark : colors.secondaryDark)};
  font-size: 13;
  line-height: 20;
`;

const RouteSwiper = styled.View`
  width: 100%;
  height: 80;
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${sizes.marginDefault};
`;

const RouteCard = styled(ThrottleTouchableOpacity)`
  padding: ${sizes.marginDefault};
  margin-left: 4%;
  margin-right: 4%;
  background-color: ${colors.primaryLight};
  border-radius: 3;
  border-width: 1;
  border-color: ${colors.borderLight};
  shadow-color: ${colors.primaryDark};
  shadow-opacity: 0.6;
  shadow-radius: 3;
`;

const RouteDuration = styled.Text`
  color: ${colors.primaryRed};
  font-size: ${sizes.fontNormal};
  font-weight: bold;
  margin-right: ${sizes.marginDefault};
`;

const RouteDistance = styled.Text`
  color: ${colors.secondaryDark};
  font-size: ${sizes.fontNormal};
`;

const RouteBodyText = styled.Text`
  color: ${colors.secondaryDark};
  font-size: ${sizes.fontSmall};
  line-height: ${sizes.fontNormal * 1.5};
  width: 90%;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CardBody = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: ${sizes.marginSmall};
`;

const RouteListWrapper = styled.View`
  width: 92%;
  height: 60%;
  margin-left: 4%;
  margin-right: 4%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.primaryLight};
  border-radius: 3;
  border-width: 1;
  border-color: ${colors.borderLight};
  shadow-color: ${colors.primaryDark};
  shadow-opacity: 0.6;
  shadow-radius: 3;
`;

const RouteList = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const RouteGroup = styled.View`margin-top: ${sizes.marginDefault};`;

const RouteGroupTitleWrapper = styled.View`
  border-bottom-width: 1;
  border-bottom-color: #ededed;
  padding-bottom: 10;
`;

const RouteGroupTitle = styled.Text`
  padding-left: ${sizes.marginDefault};
  font-size: ${sizes.fontSmall};
  color: ${colors.primaryDark};
  font-weight: bold;
`;

const RouteGroupList = styled.View`margin-bottom: 20;`;

const RouteItem = styled(ThrottleTouchableOpacity)`
  padding: ${sizes.marginDefault};
  border-bottom-width: 1;
  border-bottom-color: #ededed;
`;

const RouteItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RouteTransportWrapper = styled.View`
  background-color: ${colors.primaryRed};
  border-radius: 3;
  padding: 1 3;
  margin-left: 10;
`;

const RouteItemTransport = styled.Text`
  color: ${colors.primaryLight};
  text-align: center;
`;

const RouteArrowWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const RouteItemDuration = styled.Text`color: ${colors.primaryDark};`;

const RouteItemText = styled.Text`
  color: ${colors.primaryDark};
  line-height: ${sizes.fontNormal * 1.1};
`;
