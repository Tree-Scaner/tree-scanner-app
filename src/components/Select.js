import React, { Component } from "react";

import { View, Text, Picker } from "react-native";
import { Select as ViewSelect } from "../styles";
// import { Container } from './styles';

export default class Select extends Component {
  state = { value: "", data: [] };
  componentWillMount() {
    if (this.props.data != undefined) this.setState({ data: this.props.data });
  }
  populate(data) {
    if (data != undefined) this.setState({ data });
  }
  render() {
    const chave = this.props.chave;
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
        <ViewSelect>
          <Picker
            onValueChange={value => {
              this.props.onValueChange(value);
              this.setState({ value });
            }}
            selectedValue={this.state.value}
          >
            {this.state.data.map((item, index) => (
              <Picker.Item
                label={chave == null ? item : item.nome}
                key={index}
                value={chave == null ? item : item.nome}
              />
            ))}
          </Picker>
        </ViewSelect>
      </View>
    );
  }
}
