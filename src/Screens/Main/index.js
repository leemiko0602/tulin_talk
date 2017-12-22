import React, { Component } from "react";
import axios from "axios";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
  processColor
} from "react-native";
import styled from "styled-components/native";
import { colors, sizes } from "../../Data/constants";
import MapView from "react-native-maps";
import Browser from "react-native-tobrowser";
import getDirections from "react-native-google-maps-directions";
import MapMarker from "./MapMarker";
import News from "./components/News";
import ThrottleTouchableOpacity from "../../Components/ThrottleTouchableOpacity";
import images from "./assets";

export default class gmapsDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      list: []
    };
    this.getTulinInfo = this.getTulinInfo.bind(this);
    this.openWebview = this.openWebview.bind(this);
  }
  componentDidMount() {
    this.getTulinInfo("新闻");
  }
  getTulinInfo(text = "hi") {
    axios
      .post("http://www.tuling123.com/openapi/api", {
        key: "e8c663dee5fc4a51bb0f89b71048871f",
        info: text,
        loc: "上海",
        userid: 1
      })
      .then(res => {
        console.log("response", res);
        // const arr = this.state.messages;
        // arr.push(res.data);
        this.setState({
          list: res.data.list
        });
      });
  }

  openWebview = (url, title = '网站首页') => {
    Browser.open(url, {
      showUrlWhileLoading: true,
      navigationButtonsHidden: true,
      showActionButton: false,
      showDoneButton: false,
      showCloseButton: true,
      showPageTitles: true,
      titlePlaceholder: title,
      disableContextualPopupMenu: false,
      hideWebViewBoundaries: false,
      buttonTintColor: processColor(colors.blackDark),
    });
  };
  render() {
    const { list } = this.state;
    console.log("list", list);
    console.log('this', this)
    return (
      <ScrollView title={"新浪新闻"} style={{marginTop:20}}>
        {list.map((item, index) => (
          <NewsWrapper onPress={() => this.openWebview(item.detailurl,item.article)}>
            <NewsTitle numberOfLines={3}>{item.article}</NewsTitle>
            <Image
              source={{ uri: item.icon }}
              style={{ width: 200, height: 140 }}
              useQueryParamsInCacheKey={true}
            />
          </NewsWrapper>
        ))}
      </ScrollView>
    );
  }
}
const SimpleResponse = ({ text }) => (
  <Answer>
    <AnswerText align="left">{text}</AnswerText>
  </Answer>
);

const BackGround = styled.Image`
  flex: 1;
  width: 100%;
`;
const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 20;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primaryLight};
`;
const MapWrapper = styled.View`
  margin-top: 30;
  width: 100;
  height: 100;
  border: red;
`;
const { height } = Dimensions.get("window");
const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
  height: ${height - 80};
`;
const Question = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding-top: ${sizes.marginDefault};
  padding-bottom: ${sizes.marginDefault};
  padding-left: ${sizes.marginLarge};
  padding-right: ${sizes.marginLarge};
`;

const QuestionText = styled.Text`
  color: ${colors.primaryDark};
  font-size: ${sizes.fontLarge};
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

const NewsWrapper = styled(ThrottleTouchableOpacity)`
  flex: 1;
  width: 100%;
  margin-top: 20;
  justify-content: center;
  align-items: center;
`;

// const NewsImage = styled(CachedImage)`
// width: 90;
// height: 90;
// `;

const NewsTitle = styled.Text`
  color: ${colors.primaryDark};
  font-size: ${sizes.fontNormal};
  margin-left: 10;
  margin-right: 10;
  margin-bottom: 10;
  font-weight: bold;
`;
