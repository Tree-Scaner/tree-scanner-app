import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity,
  StatusBar,
  DatePickerAndroid,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Container, Select } from "../../styles";
import Input from "../../components/Input";
import { TextInputMask } from "react-native-masked-text";
import LocalStorage from "../lib";

export default class TreeForm extends React.Component {
  state = {
    nome: "",
    contato: ""
  };
  async enterVoluntary() {
    await LocalStorage.set("typeUser", "voluntary");
    await LocalStorage.set("userData", this.state);
    this.props.navigation.navigate("Map");
  }

  // Tipo da espécie, Data da poda, Tipo da poda, Idade, Localização, Data da próxima poda, Quantidade de dias de crescimento
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
              this.props.navigation.navigate("Map");
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
            Registro de voluntário
          </Text>
        </View>
        <Container>
          <Input
            label="Nome"
            placeholder="Nome"
            value={this.state.nome}
            onChangeText={nome => this.setState({ nome })}
          />
          <Text
            style={{
              top: 0,
              fontSize: 16,
              fontWeight: "400",
              color: "#000"
            }}
          >
            Contato
          </Text>
          <TextInputMask
            placeholder="(__)_____-____"
            style={{
              borderWidth: 2,
              paddingLeft: 10,
              borderColor: "#e4e4e4",
              borderRadius: 5,
              fontSize: 17
            }}
            type="cel-phone"
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99) "
            }}
            value={this.state.contato}
            onChangeText={contato => this.setState({ contato })}
          ></TextInputMask>
          {/* <Input
            label="Contato"
            placeholder="Nome"
            value={this.state.contato}
            onChangeText={contato => this.setState({ contato })}
          /> */}
        </Container>
        <View style={{ backgroundColor: "white" }}>
          <TouchableOpacity
            onPress={() => {
              this.enterVoluntary();
            }}
            style={{
              alignSelf: "flex-end",
              height: 80,
              width: 80,
              borderRadius: 40,
              marginRight: 20,
              marginBottom: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#85B84F"
            }}
          >
            <Icon name="check" size={40} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textColor: {
    position: "absolute",
    left: 0,
    top: 0,
    fontSize: 14,
    color: "#85B84F"
  }
});
