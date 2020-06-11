import React, { Component } from "react";

import { View, Text } from "react-native";
import { Input as TextInput } from "../styles";
// import { Container } from './styles';

export default class Input extends Component {
  state = { value: "" };
  render() {
    return (
      <View>
        <Text
          style={{
            top: 0,
            fontSize: 16,
            fontWeight: "400",
            color: "#000"
          }}
        >
          {this.props.label}
        </Text>
        <TextInput
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChangeText={value => {
            this.props.onChangeText(value);
            this.setState({
              value
            });
          }}
        />
      </View>
    );
  }
}
