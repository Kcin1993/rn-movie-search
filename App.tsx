/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Button,
  Alert,
  FlatList,
  SectionList
} from "react-native";
import { any } from "prop-types";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

interface Props {}
interface State {
  isLoading: Boolean;
  resultAmount: Number;
  dataSource: Array<{
    id: string;
    title: string;
    year: string;
    posters: {
      thumbnail: string;
    };
  }>;
}
export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      resultAmount: 0,
      isLoading: true,
      dataSource: []
    };
  }

  _Fetch() {
    fetch(
      "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            resultAmount: responseJson.total,
            dataSource: responseJson.movies
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <View
        style={{
          paddingVertical: 100,
          paddingHorizontal: "5%",
          backgroundColor: "white",
          flex: 1
        }}
      >
        <Text style={{ fontSize: 20 }}>查詢電影</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="輸入電影名稱"
            style={{ flex: 1, height: 40 }}
          />
          <Button title="查詢" onPress={() => this._Fetch()} />
        </View>
        <View
          style={{ borderBottomColor: "lightGray", borderBottomWidth: 1 }}
        />
        <View style={{ paddingVertical: 20 }}>
          {dataSource.length > 0 ? (
            <FlatList
              data={dataSource}
              renderItem={({ item }) => (
                <Text style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.posters.thumbnail }}
                    style={{
                      width: 80,
                      height: 80
                    }}
                  />
                  <Text style={{ paddingHorizontal: 10 }} />
                  <Text style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 20, flex: 1 }}>{item.title}</Text>
                    <Text style={{ fontSize: 14, color: "lightgray", flex: 1 }}>
                      {item.year}
                    </Text>
                  </Text>
                </Text>
              )}
              keyExtractor={(item, index) => `${item.id}_${{ index }}`}
            />
          ) : (
            <Text style={{ paddingVertical: 20, textAlign: "center" }}>
              Start search movie. Result is empty.
            </Text>
          )}
        </View>
      </View>
    );
  }
}
