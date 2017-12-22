import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import ProgressBar from 'react-native-progress/Bar';
import { colors } from '../../Data/constants';

/**
 * The top loading-progress-bar of webview
 *
 * @example <LoadingSpinner progress={this.state.progress} />
 *
 * @param {any} {progress, width, height, color, unfilledColor}
 * @param {any} {background, style}
 **/

export default ({
  progress = 0,
  width = Dimensions.get('window').width,
  height = 4,
  color = colors.primaryRed,
  unfilledColor = null,
  background,
  style,
}) => (
  <Container background={background} style={style}>
    <ProgressBar
      animated={true}
      progress={progress}
      width={width}
      height={height}
      borderRadius={0}
      color={color}
      unfilledColor={unfilledColor}
      borderWidth={0}
    />
  </Container>
);

const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${props => props.background || 'transparent'};
`;
