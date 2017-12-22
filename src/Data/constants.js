// 整个应用定义的常量，包括颜色、尺寸、动画

import { Dimensions } from 'react-native';

// 颜色
const colors = {
  primaryRed: 'rgba(255, 79, 78, 1)', // #FF4F4E
  secondaryRed: 'rgba(255, 79, 78, 0.7)',
  gray: '#4a4a4a',
  secondaryGray: '#818181',
  tertiaryRed: 'rgba(255, 79, 78, 0.5)',
  primaryLight: '#FFFFFF',
  secondaryLight: 'rgba(255, 255, 255, 0.7)',
  tertiaryLight: 'rgba(255, 255, 255, 0.5)',
  primaryDark: 'rgba(32, 31, 37, 1)', // #201F25
  secondaryDark: 'rgba(32, 31, 37, 0.35)',
  black: 'rgba(0, 0, 0, 1)', // #000
  blackDark: 'rgba(0, 0, 0, 0.7)', // #000
  PrimaryBlack: 'rgba(0, 0, 0, 0.6)',
  borderLight: 'rgba(255, 255, 255, 0.1)', // border
  borderDark: 'rgba(0, 0, 0, 0.3)', // border
  borderGary: 'rgba(0, 0, 0, 0.1)',
  disableBtn: 'rgba(74, 74, 74, 1)',
  primaryBlue: 'rgb(71, 148, 252)',
};

// 支付默认的过期时间为20分钟
const ORDER_PAYMENT_TIMEOUT = 20;

// 用户反馈
const feedbacks = {
  activeOpacity: 0.9,
};

// 字体大小
const sizes = {
  fontTiny: 12,
  fontSmall: 14,
  fontBody: 15, // 正文大小
  fontContent: 16, // 部分内容是16号字体
  fontNormal: 17,
  fontLarge: 22,
  fontXLarge: 25,
  fontXXLarge: 28,
  marginDefault: 15,
  marginNormal: 20,
  marginLarge: 25,
  marginSmall: 9,
};

// 匹配规则正则
const patterns = {
  email: /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i,
  mobile: /^[1][34578][0-9]{9}$/,
};

// 动画定义：https://github.com/oblador/react-native-animatable/blob/master/definitions/sliding-entrances.js
const { width } = Dimensions.get('window');
const makeSlideInTranslation = (translationType, fromValue) => ({
  from: { [translationType]: fromValue },
  to: { [translationType]: 0 },
});
const animations = {
  slideInFromLeft: (offset) => makeSlideInTranslation('translateX', -(typeof offset === 'undefined' ? width : offset)),
  slideInFromRight: (offset) => makeSlideInTranslation('translateX', (typeof offset === 'undefined' ? width : offset)),
  slideInFromTop: (offset) => makeSlideInTranslation('translateY', -offset),
  slideInFromBottom: (offset) => makeSlideInTranslation('translateY', offset),
};

// POI 类型
const POI_TYPES = [
  { label: '景点', value: 'attractions' },
  { label: '餐厅', value: 'restaurants' },
  { label: '购物', value: 'shoppings' },
];

// TODO 后续可能要删除
const MALL_TYPES = [
  { label: '首页', value: 'index' },
  { label: '套餐', value: 'packages' },
  // { label: '商品', value: 'products' },
  { label: '酒店', value: 'hotels' },
];
// 大屏幕高度放大倍数
const heightScale = width / 375;

module.exports = {
  colors,
  sizes,
  feedbacks,
  patterns,
  animations,
  heightScale,
  POI_TYPES,
  MALL_TYPES,
  ORDER_PAYMENT_TIMEOUT,
};
