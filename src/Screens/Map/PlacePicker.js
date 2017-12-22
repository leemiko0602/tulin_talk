import _ from 'lodash';
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import * as mobx from 'mobx';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';

import { colors, sizes, feedbacks } from '../../Data/constants';
import { mapStore, cityStore } from '../../Services/store';

import CommonHeader from '../../Components/CommonHeader';
import LoadingSpinner from '../../Components/LoadingSpinner';
import ThrottleTouchableOpacity from '../../Components/ThrottleTouchableOpacity';

const SEARCH_OPTION_HEIGHT = 45;
const { action } = mobx;

@observer
export default class MapPlacePicker extends Component {
  @action
  componentWillMount() {
    const { name, country } = cityStore.current;
    if (!mapStore.queryPrefix) {
      mapStore.queryPrefix = `${country.name} ${name}`;
    }
    mapStore.query = this.props.navigation.state.params.query;
    logger.debug('map.placepicker.didMount', { query: mapStore.query, queryPrefix: mapStore.queryPrefix });
  }

  componentWillUnmount() {
    mapStore.clearPlacePicker();
  }

  render() {
    const { isSearching, query, searchResults } = mapStore;
    const resultList = mobx.toJS(searchResults) || [];

    logger.debug('map.placepicker.render', { query, isSearching, resultList });

    return (
      <Container>
        <CommonHeader title={this.props.navigation.state.params.title || '选择地点'} navigation={this.props.navigation} />
        <SearchBox isFlex={resultList.length > 0} style={{ shadowOffset: { width: 0, height: 0 } }}>
          {this.renderSearchInput(resultList)}
          {!isSearching && this.renderSearchSuggests(resultList)}
        </SearchBox>
      </Container>
    );
  }

  // @autobind
  // onQueryChange(query = '') {
  //   mapStore.query = query;
  //   if (mapStore.query && query.trim() === mapStore.query) {
  //     mapStore.doPlaceSearch();
  //   }
  //   if (!mapStore.query) {
  //     mapStore.clearSearch();
  //   }
  // }

  // 未选定地点的情况下
  renderSearchInput(resultList) {
    const { isSearching } = mapStore;
    return (
      <SearchInput noBorder={!resultList.length || isSearching}>
        <SearchInputField
          autoFocus={true}
          placeholder="请输入想查找的地址..."
          value={mapStore.query}
          returnKeyType="search"
          onSubmitEditing={() => mapStore.doPlaceSearch()}
          onChangeText={_.throttle(this.onQueryChange, 200)}
        />
        <SearchActions>
          {isSearching && <SearchSpinner><LoadingSpinner background="transparent" animate={true} /></SearchSpinner>}
          {!isSearching && !!mapStore.query &&
            <ThrottleTouchableOpacity activeOpacity={feedbacks.activeOpacity} onPress={() => mapStore.clearSearch()}>
              <SearchActionClear name="md-close" size={22} color={colors.secondaryDark} />
            </ThrottleTouchableOpacity>}
          {!isSearching &&
            <ThrottleTouchableOpacity activeOpacity={feedbacks.activeOpacity} onPress={() => mapStore.doPlaceSearch()}>
              <SearchActionSubmit noBorder={!mapStore.query}>
                <SearchActionSubmitText>搜索</SearchActionSubmitText>
              </SearchActionSubmit>
            </ThrottleTouchableOpacity>}
        </SearchActions>
      </SearchInput>
    );
  }

  // 渲染地址搜索
  renderSearchSuggests(resultList) {
    const { dispatch, state } = this.props.navigation;
    return (
      <SearchSuggests>
        {resultList.map((place, i) =>
          <SearchSuggest
            key={place.id}
            activeOpacity={feedbacks.activeOpacity}
            onPress={async () => {
              await mapStore.setCurrentPlace(place);
              if (typeof state.params.onPick === 'function') {
                state.params.onPick(mapStore.currentPlace);
              }
              dispatch(NavigationActions.back());
            }}>
            <SearchSuggestIcon name="map-marker" size={20} color={colors.secondaryDark} />
            <SearchSuggestContent noBorder={i === resultList.length - 1}>
              <SearchSuggestText numberOfLines={1}>{place.description}</SearchSuggestText>
            </SearchSuggestContent>
          </SearchSuggest>
        )}
      </SearchSuggests>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.borderLight};
`;

const SearchBox = styled.View`
  display: flex;
  width: 92%;
  margin-left: 4%;
  margin-right: 4%;
  padding: 0;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: ${sizes.marginDefault};
  background-color: ${colors.primaryLight};
  border-radius: 2;
  border-width: 1;
  border-color: ${colors.borderLight};
  shadow-color: ${colors.primaryDark};
  shadow-opacity: 0.6;
  shadow-radius: 3;
`;

const SearchInput = styled.View`
  display: flex;
  height: ${SEARCH_OPTION_HEIGHT};
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom-width: ${props => (props.noBorder ? 0 : 1)};
  border-bottom-color: #ccc;
`;

const SearchInputField = styled.TextInput`
  color: ${colors.secondaryDark};
  width: ${() => Dimensions.get('window').width - 130};
  font-size: ${sizes.fontSmall};
  height: ${SEARCH_OPTION_HEIGHT};
  line-height: ${SEARCH_OPTION_HEIGHT};
  margin-left: ${sizes.marginDefault};
  margin-right: ${sizes.marginDefault};
`;

const SearchActions = styled.View`
  display: flex;
  width: 75;
  height: ${SEARCH_OPTION_HEIGHT};
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

const SearchActionClear = styled(IoniconsIcon)`
  width: 20;
  height: 20;
  margin-bottom: 14;
  margin-right: 5;
`;

const SearchActionSubmit = styled.View`
  margin-top: 16;
  margin-bottom: 16;
  padding-left: ${sizes.marginSmall};
  margin-right: ${sizes.marginDefault};
  border-left-width: ${props => (props.noBorder ? 0 : 1)};
  border-left-color: ${colors.borderDark};
`;

const SearchActionSubmitText = styled.Text`
  font-size: ${sizes.fontSmall};
  color: ${colors.primaryDark};
`;

const SearchSpinner = styled.View`
  width: 20;
  height: 20;
  margin-bottom: 13;
  margin-right: ${sizes.marginDefault};
`;

const SearchSuggests = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${colors.primaryLight};
`;

const SearchSuggest = styled(ThrottleTouchableOpacity)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  height: ${SEARCH_OPTION_HEIGHT};
  background-color: ${colors.primaryLight};
`;

const SearchSuggestIcon = styled(FontAwesomeIcon)`
  width: 20;
  height: 20;
  margin-top: 15;
  margin-bottom: 15;
  margin-left: ${sizes.marginDefault};
  margin-right: 5;
`;

const SearchSuggestContent = styled.View`
  height: ${SEARCH_OPTION_HEIGHT - 1};
  width: ${() => Dimensions.get('window').width - 165};
  flex-grow: 1;
  flex-direction: row;
  overflow: hidden;
  border-bottom-width: ${props => (props.noBorder ? 0 : 1)};
  border-bottom-color: #ededed;
`;

const SearchSuggestText = styled.Text`
  width: 100%;
  overflow: hidden;
  color: ${colors.primaryDark};
  font-size: ${sizes.fontSmall};
  line-height: ${SEARCH_OPTION_HEIGHT};
`;
