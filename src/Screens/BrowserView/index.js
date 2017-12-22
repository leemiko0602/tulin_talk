import React, { Component } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";
import WKWebView from "react-native-wkwebview-reborn";
// import DeviceInfo from 'react-native-device-info';
import { autobind } from "core-decorators";

// import { colors, sizes } from '../../Data/constants';

import CommonHeader from "../../Components/CommonHeader";
// import LoadingSpinner from '../../Components/LoadingSpinner/Progress';

const USER_AGENT = `Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/ios-feature`;

export default class BrowserView extends Component {
  state = {
    progress: 0
  };

  render() {
    console.log(this.props.navigation.state);
    // const { title } = this.props.navigation.state.params;
    return (
      <Container>
        <CommonHeader title={"web"} navigation={this.props.navigation} />
        <Content
          ref={webview => (this.webview = webview)}
          automaticallyAdjustContentInsets={true}
          userAgent={USER_AGENT}
          source={{ uri: "https://www.baidu.com" }}
          renderError={this.renderError}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          decelerationRate="normal"
          onLoadEnd={this.onLoadEnd}
          onNavigationStateChange={this.handleNavigationChange}
          onProgress={progress => this.changeProgress(progress)}
        />
      </Container>
    );
  }

  renderError() {
    return (
      <ErrorContainer>
        <Icon name="warning" size={120} color={"red"} />
        <ErrorMessage>哎呀，出错了，请检查网络</ErrorMessage>
      </ErrorContainer>
    );
  }

  // @autobind
  // renderLoading() {
  //   return <LoadingSpinner progress={this.state.progress} background={colors.primaryLight} />;
  // }

  // @autobind
  // changeProgress(progress) {
  //   this.setState({
  //     progress: progress + 0.08,
  //   });
  // }

  // @autobind
  // onLoadEnd(e) {
  //   logger.debug("browserview.onLoadEnd", e.nativeEvent);
  //   const { onLoadEnd } = this.props.navigation.state.params;
  //   if (typeof onLoadEnd === "function") {
  //     onLoadEnd(e.nativeEvent);
  //   }
  // }

  //   @autobind
  //   onNavigationStateChange(navState) {
  //     logger.debug('browserview.navigationStateChange', navState);
  //     const { onNavigationStateChange } = this.props.navigation.state.params;
  //     if (typeof onNavigationStateChange === 'function') {
  //       onNavigationStateChange(navState);
  //     }
  //   }
}

const Container = styled.View`
  flex: 1;
  background: black;
`;

const Content = styled(WKWebView)`
  justify-content: center;
  align-items: center;
  background: black;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: black;
`;

const ErrorMessage = styled.Text`
  margin-top: 20;
  text-align: center;
  font-size: 14;
  color: black;
`;
