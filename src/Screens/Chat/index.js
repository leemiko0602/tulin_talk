import React, { Component } from "react";
import axios from 'axios'
import PropTypes from "prop-types";
import { View, StatusBar, Icon, Image } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import styled from "styled-components/native";
import { colors, feedbacks } from "../../Data/constants";
import images from "./assets";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      isRecording: false
    };
    this.onUserMessageSend = this.onUserMessageSend.bind(this);
    this.getTulinInfo = this.getTulinInfo.bind(this)
  }

  componentDidMount() {
    this.getTulinInfo()
  }
  onUserMessageSend(info = [{text: 'hello'}]) {
    console.log("message", info);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, info)
    }));
    this.getTulinInfo(info[0])
  }
  getTulinInfo(message={text: '嗨'}) {
    axios.post('http://www.tuling123.com/openapi/api',{
      key:'e8c663dee5fc4a51bb0f89b71048871f',
      info: message.text,
      loc: '上海',
      userid: 1
    }).then((res) => {
      console.log('response', res)
      const message = this.formatMessage(res.data)
      const arr =[]
      arr.push(message)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, arr)
      }))
    })
  }
  formatMessage(info) {
    console.log('info',info)
    // const _info = JSON.parse(info)
    return {
      _id: new Date(),
      text: info.text,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "图灵"
      },
    }
  }

  renderMessageImage(url) {
    console.log('url', url)
    return (
      <Image style={{ height: 200, width: 200 }} source={{uri: url}} resizeMode="contain" />
    )
  }
  render() {
    return (
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <StatusBar barStyle="dark-content" />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onUserMessageSend(messages)}
          user={this.user}
          renderMessageImage={this.renderMessageImage}
          renderActions={this.renderActions}
        />
      </View>
    );
  }
}

const Button = styled.TouchableOpacity`
  width: 40;
  margin-left: 10;
  margin-bottom: 10;
`;
