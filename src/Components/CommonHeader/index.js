import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import { autobind } from 'core-decorators';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { errorStore } from '../../Services/store';
import { colors, feedbacks } from '../../Data/constants';

// import ShareBlock from '../ShareBlock';
import ThrottleTouchableOpacity from '../ThrottleTouchableOpacity';

export default class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      headerOpacity: new Animated.Value(0),
      headerBtnOpacity: new Animated.Value(1),
    };
    this.goBack=this.goBack.bind(this)
  }

  componentWillReceiveProps({ animated, isShowHeader }) {
    if (animated) {
      if (isShowHeader) {
        this.showHeader();
      } else {
        this.hideHeader();
      }
    }
  }

  showHeader() {
    Animated.timing(this.state.headerOpacity, {
      toValue: 1, // 目标值
      duration: 300, // 动画时间
    }).start();

    Animated.timing(this.state.headerBtnOpacity, {
      toValue: 0, // 目标值
      duration: 300, // 动画时间
    }).start();
  }

  hideHeader() {
    Animated.timing(this.state.headerOpacity, {
      toValue: 0, // 目标值
      duration: 300, // 动画时间
    }).start();

    Animated.timing(this.state.headerBtnOpacity, {
      toValue: 1, // 目标值
      duration: 300, // 动画时间
    }).start();
  }

  goBack() {
    // errorStore.resetNetWorkError();
    if (typeof this.props.goBack === 'function') {
      return this.props.goBack();
    }

    this.props.navigation.dispatch(NavigationActions.back());
    if (typeof this.props.onBack === 'function') {
      this.props.onBack();
    }
  }

  render() {
    const { title, animated = false, headerStyle = {}, isShowShareButton = false } = this.props;
    const { headerOpacity, headerBtnOpacity } = this.state;

    return (
      <Container>
        <Animated.View style={animated ? { opacity: headerOpacity } : {}}>
          <HeaderContent style={[headerStyle, animated ? { position: 'absolute' } : {}]}>
            <FixedBackButton activeOpacity={feedbacks.activeOpacity} onPress={this.goBack} timeout={2000}>
              <Icon name="angle-left" size={30} color={colors.primaryLight} style={{ flexShrink: 0 }} />
            </FixedBackButton>
            <Title numberOfLines={1}>{title}</Title>
            {isShowShareButton &&
            <FixedShareButton>
              {/* <ShareBlock /> */}
            </FixedShareButton>}
          </HeaderContent>
        </Animated.View>
        {animated &&
          <Animated.View style={{ opacity: headerBtnOpacity }}>
            <FloatBackButton activeOpacity={feedbacks.activeOpacity} onPress={this.goBack} timeout={2000}>
              <Icon name="angle-left" size={30} color={colors.primaryLight} style={{ marginLeft: -3 }} />
            </FloatBackButton>
          </Animated.View>
        }
      </Container>
    );
  }
}

const Container = styled.View`
  width: 100%;
  z-index: 1;
`;

const HeaderContent = styled.View`
  background-color: ${colors.primaryDark};
  padding-top: 20;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${colors.primaryLight};
  font-size: 18;
  width: 80%;
  text-align: center;
  height: 44;
  line-height: 44;
`;

const FixedBackButton = styled(ThrottleTouchableOpacity)`
  position: absolute;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 50;
  height: 40;
  left: 0;
  top: 20;
  z-index: 1;
`;

const FixedShareButton = styled.View`
  position: absolute;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40;
  height: 40;
  right: 0;
  top: 20;
  z-index: 1;
`;

const FloatBackButton = styled(ThrottleTouchableOpacity)`
  width: 33.5;
  height: 33.5;
  z-index: 1;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  border-radius: 16.75;
  top: 25;
  left: 10;
  flex-shrink: 0;
`;
