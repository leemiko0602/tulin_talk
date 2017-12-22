import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { autobind } from 'core-decorators';

import { feedbacks } from '../../Data/constants';

const throttle = (fn, delay, done) => {
  let timer = null;
  const that = this;
  let flag = true;
  return () => {
    const context = that;
    const args = arguments; //eslint-disable-line
    if (flag) {
      fn.apply(context, args);
      flag = false;
      clearTimeout(timer);
      timer = setTimeout(() => {
        flag = true;
        done();
      }, delay);
    }
  };
};

export default class ThrottleTouchableOpacity extends Component {
  state = {
    disabled: false,
  };

  // @autobind
  onPress(func, timeout) {
    return throttle(() => {
      func();
      this.setState({ disabled: true });
    }, timeout, () => this.setState({ disabled: false }));
  }

  render() {
    const { disabled } = this.state;
    const { onPress = () => {}, timeout = 1000, activeOpacity = feedbacks.activeOpacity, children, style = {} } = this.props;

    return (
      <TouchableOpacity
        {...this.props}
        activeOpacity={activeOpacity}
        onPress={this.onPress(onPress, timeout)}
        style={style} disabled={disabled}>
        {children}
      </TouchableOpacity>
    );
  }
}
