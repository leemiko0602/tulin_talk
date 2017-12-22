import React, { Component } from 'react';
import { ListView } from 'react-native';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import { SwRefreshListView } from 'react-native-swRefresh';

import { colors, sizes } from '../../Data/constants';
import { mapStore } from '../../Services/store';

import RefreshView from '../../Components/RefreshView';
import LoadingSpinner from '../../Components/LoadingSpinner/Screen';
import NoDataTip from '../../Components/NoDataTip';
import ModalBox from '../../Components/ModalBox';
import CommonHeader from '../../Components/CommonHeader';
import Button from './Components/Button';
import PlaceBlock from './Components/PlaceBlock';
import FilterStrip from './Components/FilterStrip';

// @observer
export default class MapNearbyList extends Component {
  ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1.id !== row2.id });

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: navigation.state.params.gesturesEnabled,
  });

  // @autobind
  // onModalStateChange(enabled) {
  //   if (typeof enabled === 'boolean') {
  //     this.props.navigation.setParams({
  //       gesturesEnabled: enabled,
  //     });
  //   } else {
  //     this.props.navigation.setParams({
  //       gesturesEnabled: !mapStore.isFilterVisible,
  //     });
  //   }
  // }

  // @action
  // doFilter(value) {
  //   mapStore.currentFilter.value = value;
  //   mapStore.isFilterVisible = false;
  //   this.onModalStateChange();
  // }

  render() {
    const { dispatch, isFromCity } = this.props.navigation;
    const nearbyList = mapStore.getFilteredNearbyResults() || [];
    logger.debug('map.list.render', { nearbyList: nearbyList.length, googleCurrentPage: mapStore.googleCurrentPage });
    const { isFilterVisible, currentFilter, isSearching } = mapStore;

    return (
      <Container>
        <CommonHeader title="搜索周边" navigation={this.props.navigation} />
        {currentFilter.key &&
          <ModalBox
            isVisible={isFilterVisible}
            title="筛选"
            animationIn="slideInDown"
            animationOut="slideOutUp"
            onClose={() => {
              mapStore.isFilterVisible = false;
              this.onModalStateChange();
            }}>
            <FilterStrip expanded={true} onModalStateChange={this.onModalStateChange} />
          </ModalBox>}
        {!isSearching && <FilterStrip expanded={false} onModalStateChange={this.onModalStateChange} />}
        {isSearching &&
          <SearchSpinner>
            <LoadingSpinner background="transparent" animate={true} />
          </SearchSpinner>}
        {!isSearching && nearbyList &&
          nearbyList.length > 0 &&
          <POIList
            customRefreshView={(status, offset) => <RefreshView status={status} offset={offset} />}
            customRefreshViewHeight={70}
            dataSource={this.ds.cloneWithRows(nearbyList)}
            renderRow={(place) => <PlaceBlock place={place} navigation={this.props.navigation} />}
            isShowLoadMore={false}
            removeClippedSubviews={false}
            enableEmptySections={true}
          />}
        {!isSearching && nearbyList && !nearbyList.length && <NoDataTip title="当前条件下无筛选结果" />}
        {!!isFromCity && !isSearching && isFilterVisible === false && <Button title="地图模式" onPress={() => dispatch(NavigationActions.back())} />}
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.black};
  width: 100%;
`;

const POIList = styled(SwRefreshListView)`
  flex: 1;
  width: 100%;
`;

const SearchSpinner = styled.View`
  width: 20;
  height: 20;
  margin-right: ${sizes.marginDefault};
`;
