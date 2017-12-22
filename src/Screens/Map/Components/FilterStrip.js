import React, { Component } from 'react';
import mobx, { action } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/EvilIcons';

import { colors, sizes, feedbacks } from '../../../Data/constants';
import { mapStore } from '../../../Services/store';

import RatingFilter from './RatingFilter';
import DistanceFilter from './DistanceFilter';

import ThrottleTouchableOpacity from '../../../Components/ThrottleTouchableOpacity';

@observer
export default class MapFilter extends Component {
  @action
  doFilter(value) {
    mapStore.currentFilter.value = value;
    mapStore.isFilterVisible = false;
    this.props.onModalStateChange(true);
    logger.debug('map.filter.apply', { currentFilter: mobx.toJS(mapStore.currentFilter) });
  }

  @action
  openFilter(key) {
    logger.debug('map.filter.open.before', { key, currentFilter: mobx.toJS(mapStore.currentFilter) });
    if (!mapStore.currentFilter) {
      mapStore.currentFilter = { key, value: 0 };
    } else {
      const previousKey = mapStore.currentFilter.key;
      if (key !== previousKey) {  // 目前只支持单选，如果换了筛选维度，重置筛选值
        mapStore.currentFilter = { key, value: 0 };
      } else {
        mapStore.currentFilter = { key, value: mapStore.currentFilter.value };
      }
    }
    logger.debug('map.filter.open.after', { key, currentFilter: mobx.toJS(mapStore.currentFilter) });
    mapStore.isFilterVisible = true;
    this.props.onModalStateChange(false);
  }

  render() {
    const { isFilterVisible, currentFilter, filters } = mapStore;
    logger.debug('map.filter.render', {
      isFilterVisible,
      expanded: this.props.expanded,
      currentFilter: mobx.toJS(currentFilter),
      distance: currentFilter.key === 'distance',
      rating: currentFilter.key === 'rating',
    });

    return (
      <Container>
        <FilterBar>
          {filters.map(filter =>
            <Filter
              key={filter.key}
              activeOpacity={feedbacks.activeOpacity}
              onPress={() => this.openFilter(filter.key)}>
              <FilterName active={currentFilter.key === filter.key}>{filter.title}</FilterName>
              <FilterArrow
                size={35}
                name={currentFilter.key === filter.key ? 'chevron-up' : 'chevron-down'}
                color={currentFilter.key === filter.key ? colors.primaryRed : colors.primaryLight}
              />
            </Filter>
          )}
        </FilterBar>
        {this.props.expanded &&
          filters.map(
            filter =>
              isFilterVisible &&
              currentFilter.key === filter.key &&
              this.renderFilter(filter.key, filter.options, currentFilter.value, value => this.doFilter(value))
          )}
      </Container>
    );
  }

  renderFilter(key, options, current, onChoose) {
    const FilterComponent = {
      distance: DistanceFilter,
      rating: RatingFilter,
    }[key];

    return <FilterComponent key={key} options={options} current={current} onChoose={onChoose} />;
  }
}

const Container = styled.View`
  width: 100%;
`;

const FilterBar = styled.View`
  height: 40;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-top-width: 1;
  border-top-color: ${colors.borderLight};
  background-color: ${colors.primaryDark};
`;

const Filter = styled(ThrottleTouchableOpacity)`
  width: 50%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FilterName = styled.Text`
  color: ${props => (props.active ? colors.primaryRed : colors.primaryLight)};
  font-size: ${sizes.fontNormal};
  line-height: 36;
`;

const FilterArrow = styled(Icon)`
  margin-left: ${sizes.marginSmall};
  line-height: 36;
  height: 35;
  margin-top: 3;
`;
