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
import { Container } from "../../styles";
import Select from "../../components/Select";
import Input from "../../components/Input";
import { firestore } from "react-native-firebase";
import getRealm from "../../services/realm";
import NetInfo from "@react-native-community/netinfo";
import moment from "moment";
import LocalStorage from "../lib";

export default class TreeForm extends React.Component {
  state = {
    latitude: "",
    longitude: "",
    especie: "",
    model: {
      dataUltimaPoda: "",
      tempoEstimado: "",
      latitude: "",
      longitude: "",
      specie: "",
      status: "Poda não urgente",
      tipoDePoda: "Poda de limpeza"
    },
    showInput: false,
    getEspecies: [],
    podas: [
      "Poda de limpeza",
      "Poda de correção",
      "Poda de emergencial",
      "Poda de redução"
    ],
    status: ["Poda não urgente", "Poda se aproximando", "Poda urgente"]
  };

  async componentDidMount() {
    await this.fetchData();
    if (this.props.navigation.state.params._id) {
      this.getById(this.props.navigation.state.params._id);
    } else {
      const {
        latitude,
        longitude
      } = this.props.navigation.state.params.coordinate;
      this.setState({ model: { ...this.state.model, latitude, longitude } });
    }
  }

  fetchData = async () => {
    let arr = [];

    await firestore()
      .collection("especies")
      .orderBy("nome", "asc")
      .get()
      .then(response => {
        response.forEach(e => {
          arr.push(e.data());
        });

        this.setState({ getEspecies: arr });
        this._especies.populate(arr);
      });
  };

  getById = async _id => {
    const response = await firestore()
      .collection("arvores")
      .doc(_id)
      .get();
    this.setState({ model: response.data() });
  };
  async saveEspecie() {
    let obj = {};

    // obj.nome = this.state.especie;
    // obj.valor = String(this.state.especie).toLocaleLowerCase();
    // await firestore()
    //   .collection("especies")
    //   .add(obj)
    //   .then(async () => {
    //     this.fetchData();
    //   });
  }
  async save() {
    const typeUser = await LocalStorage.get("typeUser");
    const userData = await LocalStorage.get("userData");
    let obj = this.state.model;
    if (typeUser == "voluntary") {
      obj = { ...obj, ...userData };
      obj.assignee = "voluntario";
    }

    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        await firestore()
          .collection("arvores")
          .add(obj)
          .then(() => {
            Alert.alert("Salvo com sucesso", "", [
              { text: "Ok", style: "default" }
            ]);
            this.props.navigation.navigate("Map");
          });
      } else {
        // const realm = await getRealm();
        // realm.write(() => {
        //   realm.create("arvore", this.state.model);
        //   Alert.alert("Salvo com sucesso", "", [
        //     { text: "Ok", style: "default" }
        //   ]);
        //   this.props.navigation.navigate("Map");
        // });
        // realm.close();
      }
    });
  }
  // Tipo da espécie, Data da poda, Tipo da poda, Idade, Localização, Data da próxima poda, Quantidade de dias de crescimento
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
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
            Cadastro de árvore
          </Text>
        </View>
        <Container>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Select
                ref={ref => (this._especies = ref)}
                label="Espécie"
                chave={"nome"}
                data={this.state.getEspecies}
                onValueChange={specie =>
                  this.setState({ model: { ...this.state.model, specie } })
                }
                selectedValue={this.state.model.specie}
              />
            </View>
            <TouchableOpacity>
              <Icon
                name="plus"
                color="#000"
                size={30}
                style={{ top: 10, marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
          <Select
            label="Tipo de poda"
            chave={null}
            data={this.state.podas}
            onValueChange={tipoDePoda =>
              this.setState({ model: { ...this.state.model, tipoDePoda } })
            }
            selectedValue={this.state.model.tipoDePoda}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Text
                style={{
                  top: 0,
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#000"
                }}
              >
                Data da última poda
              </Text>

              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  borderWidth: 2,
                  paddingVertical: 3,
                  borderColor: "#e4e4e4",
                  height: 50,
                  justifyContent: "center"
                }}
                onPress={async () => {
                  try {
                    const {
                      action,
                      year,
                      month,
                      day
                    } = await DatePickerAndroid.open({
                      // Use `new Date()` for current date.
                      // May 25 2020. Month 0 is January.
                      date: new Date()
                    });
                    if (action !== DatePickerAndroid.dismissedAction) {
                      // Selected year, month (0-11), day
                      let dayS, monthS;
                      day < 10 ? (dayS = `0${day}`) : (dayS = day);
                      month < 10 ? (monthS = `0${month}`) : (monthS = month);

                      let aux = dayS + "/" + monthS + "/" + year;
                      this.setState({
                        model: { ...this.state.model, dataUltimaPoda: aux }
                      });
                    }
                  } catch ({ code, message }) {
                    console.warn("Cannot open date picker", message);
                  }
                }}
              >
                <Text
                  style={{
                    left: 10,
                    color: this.state.model.dataUltimaPoda ? "black" : "#AAA",
                    fontSize: 16
                  }}
                >
                  {this.state.model.dataUltimaPoda || "DD/MM/AAAA"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Input
              label="Tempo estimado (dias)"
              placeholder="120 dias"
              keyboardType={"numeric"}
              value={this.state.model.tempoEstimado}
              onChangeText={tempoEstimado => {
                this.setState({
                  model: {
                    ...this.state.model,
                    tempoEstimado
                  }
                });
              }}
            />
          </View>
          <Select
            label="Status"
            chave={null}
            data={this.state.status}
            onValueChange={status =>
              this.setState({ model: { ...this.state.model, status } })
            }
            selectedValue={this.state.model.status}
          />
        </Container>
        {/* <View style={{ backgroundColor: "white" }}> */}
        <TouchableOpacity
          onPress={() => this.save()}
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
        {/* </View> */}
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
