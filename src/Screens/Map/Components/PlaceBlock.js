import React, { Component } from 'react';
import { Alert, Dimensions } from 'react-native';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import styled from 'styled-components/native';
import StartRating from 'react-native-star-rating';
import CachedImage from 'react-native-cached-image';

import images from '../assets';
import placeholder from '../../../assets/placeholder';
import LoadingSpinner from '../../../Components/LoadingSpinner/Screen';
import ThrottleTouchableOpacity from '../../../Components/ThrottleTouchableOpacity';
import { colors, sizes, feedbacks } from '../../../Data/constants';

const { width } = Dimensions.get('window');

@observer
export default class PlaceBlock extends Component {
  @autobind
  gotoDetail(place) {
    if (this.props.onPress) {
      this.props.onPress();
      return;
    }

    logger.debug('map.list.gotodetail', { place });
    const { navigate } = this.props.navigation;
    if (place.scope === 'weego') {
      if (place.type === 'hotels') {
        navigate('HotelDetail', { hotel: place });
      } else {
        navigate('POIDetail', { poi: place });
      }
    } else if (place.href) {
      navigate('GooglePOI', { poi: place });
    } else {
      Alert.alert('提示', '跳转链接无效');
    }
  }

  render() {
    const { place, condensed = false } = this.props;
    return (
      <Container condensed={condensed} activeOpacity={feedbacks.activeOpacity} onPress={() => this.gotoDetail(place)}>
        <POIMedia
          condensed={condensed}
          source={{ uri: place.cover_image_url }}
          useQueryParamsInCacheKey={true}
          resizeMode="cover"
          loadingIndicator={LoadingSpinner}
          fallbackSource={placeholder[place.type]}
        />
        <POIBody condensed={condensed}>
          <POITitle numberOfLines={1}>{place.name}</POITitle>
          {['attractions'].includes(place.type) && <POITitleEN numberOfLines={1}>{place.name_en}</POITitleEN>}
          <POIMeta>
            {typeof place.rating !== 'undefined' &&
              <StartRating
                disabled={true}
                maxStars={5}
                rating={place.rating}
                starSize={12}
                starColor={colors.primaryRed}
                starStyle={{ marginRight: 3 }}
              />}
            {typeof place.rating !== 'undefined' && <POIRating>{`${place.rating}分`}</POIRating>}
            {typeof place.rating === 'undefined' && <POIRating>暂无评价</POIRating>}
            <POIDistance>{`${place.distance}km`}</POIDistance>
          </POIMeta>
          {condensed === false &&
            ['hotels', 'restaurants'].includes(place.type) &&
            <POIMeta>
              {['hotels', 'restaurants'].includes(place.type) &&
                !!place.price &&
                <POIPrice numberOfLines={1}>{place.price}</POIPrice>}
              {['restaurants'].includes(place.type) &&
                <ImageTag style={{ position: 'absolute', right: 0 }} source={images[place.is_open ? 'open' : 'closed']} width={50} resizeMode="cover" />}
            </POIMeta>}
          <POIMeta>
            {place.scope === 'weego' &&
              !!Array.isArray(place.tags) &&
              place.tags.length > 0 &&
              <POITag numberOfLines={1}>{place.tags[0].name}</POITag>}
            {place.scope === 'google' && <ImageTag source={images.google} resizeMode="cover" />}
          </POIMeta>
        </POIBody>
      </Container>
    );
  }
}

const Container = styled(ThrottleTouchableOpacity)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-top: ${props => (props.condensed ? 10 : sizes.marginDefault)};
  padding-bottom: ${props => (props.condensed ? 10 : sizes.marginDefault)};
  padding-left: ${props => (props.condensed ? 10 : sizes.marginDefault)};
  padding-right: ${props => (props.condensed ? 10 : sizes.marginDefault)};
  border-bottom-width: 1;
  border-bottom-color: ${colors.borderLight};
`;

const POIMedia = styled(CachedImage)`
  width: ${props => (props.condensed ? 90 : 120)};
  height: ${props => (props.condensed ? 75 : 100)};
  margin-right: 10;
`;

const POIBody = styled.View`
  width: ${props => width - (props.condensed ? 148 : 165)};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const POIMeta = styled.View`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${sizes.fontNormal};
  margin-top: 6;
  margin-bottom: 5;
`;

const POITitle = styled.Text`
  color: ${colors.primaryLight};
  font-size: ${sizes.fontNormal};
`;

const POITitleEN = styled.Text`
  margin-top: 5;
  color: ${colors.secondaryLight};
  font-size: ${sizes.fontSmall};
`;

const POIRating = styled.Text`
  margin-left: 3;
  font-size: ${sizes.fontSmall};
  color: ${colors.secondaryLight};
`;

const POIPrice = styled.Text`
  font-size: ${sizes.fontSmall};
  color: ${colors.primaryLight};
  margin-right: ${sizes.marginDefault};
  margin-top: -5;
`;

const POIDistance = styled.Text`
  flex-grow: 1;
  text-align: right;
  font-size: ${sizes.fontSmall};
  color: ${colors.primaryLight};
`;

const POITag = styled.Text`
  line-height: ${sizes.fontSmall};
  font-size: ${sizes.fontSmall};
  color: ${colors.primaryLight};
  margin-right: 5;
  border-width: 1;
  border-radius: 4;
  border-color: ${colors.primaryRed};
  padding-top: 3;
  padding-bottom: 3;
  padding-left: 6;
  padding-right: 6;
`;

const ImageTag = styled.Image`
  width: ${props => props.width || 20};
  height: 20;
  margin-left: 5;
`;
