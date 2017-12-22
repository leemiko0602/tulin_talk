import React, { Component } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { colors, sizes } from '../../Data/constants';

import images from './assets';

export default class BlockHeader extends Component {
  chooseImage(type) {
    let temp = null;
    switch (type) {
      case 'product':
        temp = (<Image source={images[type]} style={{ width: 18, height: 18, marginRight: 10 }} />);
        break;
      case 'highlight':
        temp = (<Image source={images[type]} style={{ width: 16.5, height: 22, marginRight: 10 }} />);
        break;
      case 'tip':
        temp = (<Image source={images[type]} style={{ width: 20, height: 20, marginRight: 10 }} />);
        break;
      case 'tips':
        temp = (<Image source={images[type]} style={{ width: 20, height: 22, marginRight: 10, marginTop: -2 }} />);
        break;
      case 'introduction':
        temp = (<Image source={images[type]} style={{ width: 18, height: 20, marginRight: 10, marginTop: -2 }} />);
        break;
      case 'comments':
        temp = (<Image source={images[type]} style={{ width: 24, height: 23, marginRight: 10 }} />);
        break;
      case 'product_combo':
        temp = (<Image source={images[type]} style={{ width: 20, height: 18.5, marginRight: 10 }} />);
        break;
      case 'reservation':
        temp = (<Image source={images[type]} style={{ width: 24, height: 23, marginRight: 10, marginTop: -2 }} />);
        break;
      case 'roomType':
        temp = (<Image source={images[type]} style={{ width: 16, height: 22, marginRight: 10, marginTop: -1 }} />);
        break;
      default:
        temp = (<Image source={images[type]} style={{ width: 20, height: 20, marginRight: 10, marginTop: -2 }} />);
    }

    return temp;
  }

  render() {
    const { title, type, style = {} } = this.props;
    return (
      <Title style={style}>
        {this.chooseImage(type)}
        <TitleText numberOfLines={1} >{title}</TitleText>
        {this.props.children}
      </Title>
    );
  }
}

const Title = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: ${sizes.marginLarge};
`;

const TitleText = styled.Text`
  font-size: 18;
  color: ${colors.primaryLight};
  font-weight: bold;
`;
