import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { firestore } from "react-native-firebase";
// import { Container } from './styles';

export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  async componentDidMount() {
    await firestore()
      .collection("arvores")
      .get()
      .then(res => {
        let aux = [];
        res.forEach(e => {
          aux.push({ ...e.data(), id: e.id });
        });
        this.setState({ items: aux });
      });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#85b84f"
          animated
          barStyle="light-content"
        />
        <View
          style={{
            height: 60,
            backgroundColor: "#FFF",
            alignItems: "center",
            flexDirection: "row",
            padding: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.pop();
            }}
          >
            <Icon name="arrow-left" size={30} color="#85B84F" />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              right: 10,
              fontSize: 20,
              color: "#85B84F",
              fontWeight: "bold"
            }}
          >
            Árvores cadastradas
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.items.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("TreeForm", { _id: item.id });
              }}
              key={index}
              style={styles.container}
            >
              <Text style={styles.title}>{item.cadastradoPor}</Text>
              <Text style={styles.body}>Latitude: {item.latitude}</Text>
              <Text style={styles.body}>Longitude:{item.longitude}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 74,
    marginHorizontal: 10,
    marginVertical: 3,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    padding: 5
  },
  title: { fontSize: 19, fontWeight: "bold", color: "black" },
  body: { marginLeft: 5 }
});
