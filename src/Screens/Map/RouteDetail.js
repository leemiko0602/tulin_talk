import React, { Component } from 'react';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import striptags from 'striptags';

import CommonHeader from '../../Components/CommonHeader';
import { colors, sizes } from '../../Data/constants';
import { mapStore } from '../../Services/store';
import images from './assets';

export default class MapRouteDetail extends Component {
  render() {
    const ds = this.props.navigation ? this.props.navigation.state.params : this.props;
    const { route, origin, destination, trafficMode } = ds;

    return (
      <Container>
        {this.props.navigation && <CommonHeader title="路线详情" navigation={this.props.navigation} />}
        <RouteInfo>
          {this.renderRouteIntro(route)}
          <RouteSteps>
            {trafficMode !== 'transit' &&
            <RouteStep>
              <RouteStepIcon name="circle" size={15} color={colors.primaryRed} style={{ marginTop: 10 }} />
              <RouteStepContent noBorder={true}>
                <RouteStepText numberOfLines={2}>
                  {origin}
                </RouteStepText>
              </RouteStepContent>
            </RouteStep>}
            {route.steps.map((step, i) => this.renderRouteStep(step, i, route))}
            {trafficMode !== 'transit' &&
            <RouteStep>
              <RouteStepIcon name="map-marker" size={20} color={colors.primaryRed} style={{ marginTop: 10 }} />
              <RouteStepContent>
                <RouteStepText numberOfLines={2}>
                  {destination}
                </RouteStepText>
              </RouteStepContent>
            </RouteStep>}
          </RouteSteps>
        </RouteInfo>
      </Container>
    );
  }

  renderRouteIntro(route) {
    const { trafficMode } = mapStore;
    if (trafficMode !== 'transit') {
      return (
        <RouteSummary>
          <RouteDuration>
            {route.duration.text}
          </RouteDuration>
          <RouteDistance>
            {route.distance.text}
          </RouteDistance>
        </RouteSummary>
      );
    }

    const getIcon = step => {
      if (step.travel_mode === 'WALKING') {
        return images.walkingActive;
      }

      if (step.travel_mode === 'TRANSIT') {
        return images[step.transit_details.line.vehicle.type.toLowerCase()];
      }

      return images.walkingActive; // FIXME
    };

    return (
      <RouteSummary>
        <RouteIntro>
          {route.steps.slice(0, 2).map((step, i) =>
            <StepSummary key={i}>
              <StepSummaryIcon source={getIcon(step)} resizeMode="contain" />
              <StepSummaryTime>
                {step.duration.text}
              </StepSummaryTime>
              {i < route.steps.length - 1 && <StepSummaryArrow name="angle-right" size={20} />}
            </StepSummary>
          )}
          <StepSummary>
            <StepSummaryTime>...</StepSummaryTime>
          </StepSummary>
          {route.steps.slice(route.steps.length - 1).map((step, i) =>
            <StepSummary key={i}>
              <StepSummaryIcon source={getIcon(step)} resizeMode="contain" />
              <StepSummaryTime>
                {step.duration.text}
              </StepSummaryTime>
            </StepSummary>
          )}
        </RouteIntro>
        <StepDuration>
          {route.duration.text}
        </StepDuration>
      </RouteSummary>
    );
  }

  renderRouteStep(step, i, route) {
    const { trafficMode } = mapStore;
    if (trafficMode !== 'transit') {
      return (
        <RouteStep key={`step-${i}`}>
          <RouteStepImage source={images[step.maneuver || 'straight']} style={{ marginTop: 10 }} resizeMode="contain" />
          <RouteStepContent>
            <RouteStepText numberOfLines={2}>
              {striptags(step.html_instructions)} ({step.distance.text})
            </RouteStepText>
            <RouteStepSubText numberOfLines={1}>
              {step.duration.text}
            </RouteStepSubText>
          </RouteStepContent>
        </RouteStep>
      );
    }

    const getStepTime = () => {
      if (step.transit_details) {
        return (
          <RouteStepTime>
            <TimeDeparture>
              {step.transit_details.departure_time.text}
            </TimeDeparture>
            <TimeArrival>
              {step.transit_details.arrival_time.text}
            </TimeArrival>
          </RouteStepTime>);
      }

      if (i === 0) {
        return (
          <RouteStepTime>
            <TimeDeparture>
              {route.departure_time.text}
            </TimeDeparture>
            <TimeArrival />
          </RouteStepTime>);
      }

      if (i === route.steps.length - 1) {
        return (
          <RouteStepTime>
            <TimeDeparture />
            <TimeArrival>
              {route.arrival_time.text}
            </TimeArrival>
          </RouteStepTime>);
      }

      return (<RouteStepTime />);
    };

    const getStepImage = () => {
      if (step.travel_mode === 'TRANSIT') {
        return images.transitLine;
      }
      if (step.travel_mode === 'WALKING') {
        if (i === 0) {
          return images.walkingLineStart;
        }
        if (i === route.steps.length - 1) {
          return images.walkingLineEnd;
        }
        return images.walkingLine;
      }
    };

    return (
      <RouteStep key={`step-${i}`} condensed={true}>
        {getStepTime()}
        <RouteStepImage height={80} source={getStepImage()} resizeMode="contain" />
        <RouteStepContent noBorder={true} condensed={true} height={84}>
          <RouteStepText condensed={true} numberOfLines={1}>
            {step.travel_mode === 'TRANSIT' && step.transit_details.departure_stop.name}
            {step.travel_mode !== 'TRANSIT' && i === 0 && striptags(route.start_address)}
          </RouteStepText>
          <RouteStepSubTextWrapper>
            <RouteStepSubImage
              source={
                images[step.transit_details ? step.transit_details.line.vehicle.type.toLowerCase() : 'walkingActive']
              }
              resizeMode="contain"
            />
            <RouteStepSubText condensed={true} numberOfLines={1} color={colors.secondaryDark}>
              {step.travel_mode === 'TRANSIT'
                ? `${step.transit_details.num_stops}站 (${step.duration.text})`
                : `${step.distance.text} (${step.duration.text})`}
            </RouteStepSubText>
          </RouteStepSubTextWrapper>
          <RouteStepText condensed={true} numberOfLines={1}>
            {step.travel_mode === 'TRANSIT' ? step.transit_details.arrival_stop.name : ''}
            {step.travel_mode !== 'TRANSIT' && i === route.steps.length - 1 && striptags(route.end_address)}
          </RouteStepText>
        </RouteStepContent>
      </RouteStep>
    );
  }
}

const Container = styled.View`
  flex: 1;
  height: 100%;
  background-color: ${colors.primaryLight};
`;

const RouteInfo = styled.ScrollView``;

const RouteSummary = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: ${sizes.marginDefault};
`;

const RouteDuration = styled.Text`
  color: ${colors.primaryRed};
  font-size: ${sizes.fontNormal};
  font-weight: bold;
  margin-right: ${sizes.marginDefault};
`;

const RouteDistance = styled.Text`
  color: ${colors.primaryDark};
  font-size: ${sizes.fontNormal};
`;

const RouteIntro = styled.View`
  flex-grow: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const StepSummary = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const StepSummaryIcon = styled.Image`
  width: 15;
  height: 20;
  margin-right: 2;
`;

const StepSummaryTime = styled.Text`
  color: ${colors.secondaryDark};
  font-size: ${sizes.fontTiny};
`;

const StepSummaryArrow = styled(FontAwesomeIcon)`
  width: 15;
  height: 20;
  margin-left: 5;
  color: ${colors.secondaryDark};
`;

const StepDuration = styled.Text`
  color: ${colors.primaryDark};
  font-size: ${sizes.fontTiny};
`;

const RouteSteps = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${colors.primaryLight};
  border-top-width: ${props => (props.noBorder ? 0 : 1)};
  border-top-color: #ededed;
  margin-bottom: 50;
  padding: ${sizes.marginDefault};
`;

const RouteStep = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${colors.primaryLight};
  padding-bottom: ${sizes.marginSmall};
`;

const RouteStepTime = styled.View`
  justify-content: space-between;
  align-items: center;
  width: 80;
  height: 84;
  margin-top: -2;
`;

const TimeDeparture = styled.Text`
  color: ${colors.secondaryDark};
  font-size: ${sizes.fontSmall};
`;

const TimeArrival = styled.Text`
  color: ${colors.secondaryDark};
  font-size: ${sizes.fontSmall};
`;

const RouteStepImage = styled.Image`
  width: 20;
  height: ${props => (props.height ? props.height : 20)};
  margin-top: ${props => (props.height ? 0 : 25)};
  margin-right: 15;
`;

const RouteStepIcon = styled(FontAwesomeIcon)`
  width: 20;
  height: 20;
  margin-top: 15;
  margin-right: 15;
`;

const RouteStepContent = styled.View`
  height: ${props => (props.height ? props.height : 'auto')};
  margin-top: ${props => (props.height ? -2 : 0)};
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: ${props => (props.condensed ? 0 : sizes.marginSmall)};
  border-top-width: ${props => (props.noBorder ? 0 : 1)};
  border-top-color: #ededed;
`;

const RouteStepText = styled.Text`
  color: ${colors.primaryDark};
  font-size: ${sizes.fontSmall};
  line-height: ${props => (props.condensed ? 0 : sizes.fontNormal * 1.2)};
  margin-bottom: ${props => (props.condensed ? 0 : sizes.marginSmall)};
`;

const RouteStepSubText = styled.Text`
  color: ${props => (props.color ? props.color : colors.primaryDark)};
  font-size: ${sizes.fontSmall};
  line-height: ${sizes.fontSmall * 1.2};
  margin-left: 5;
`;

const RouteStepSubTextWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 30;
`;

const RouteStepSubImage = styled.Image`
  width: 14;
  height: 14;
`;
