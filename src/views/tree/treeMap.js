import React, { Component } from "react";

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Image,
  Picker,
  Modal
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Heatmap, Marker } from "react-native-maps";
import { firestore } from "react-native-firebase";
import { mapStyle } from "../../utils";
import Geolocation from "react-native-geolocation-service";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NetInfo from "@react-native-community/netinfo";
import Search from "../map/search";
import reactotron from "reactotron-react-native";
// import { Container } from './styles';

export default class TreeMap extends Component {
  state = {
    ready: false,
    region: null,
    activy: "heat",
    points: [],
    filter: "all",
    data: [],
    model: {},
    active: false
  };
  async componentWillMount() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "ReactNativeCode Location Permission",
        message: "ReactNativeCode App needs access to your location "
      }
    );
    if (granted) {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          this.regionFrom(coords.latitude, coords.longitude);
        }, //sucesso
        () => {}, // erro
        {
          timeout: 2000,
          maximumAge: 1000,
          forceRequestLocation: true
        }
      );
    }
  }
  async componentDidMount() {
    await this.populate();
  }
  async populate() {
    this.setState({ ready: false });

    await firestore()
      .collection("arvores")
      .get()
      .then(res => {
        res.forEach(e => {
          let aux = e.data();
          this.setState({
            data: [...this.state.data, e.data()],
            points:
              [
                ...this.state.points,
                {
                  latitude: aux.latitude,
                  longitude: aux.longitude,
                  weight: 1
                }
              ] || []
          });
        });
        this.setState({ ready: true });
      });
  }
  async filter(value) {
    this.setState({ points: [], data: [], ready: false });
    await firestore()
      .collection("arvores")
      .where("status", "==", value)
      .get()
      .then(res => {
        res.forEach(e => {
          let aux = e.data();
          this.setState({
            data: [...this.state.data, e.data()],
            points:
              [
                ...this.state.points,
                {
                  latitude: aux.latitude,
                  longitude: aux.longitude,
                  weight: 1
                }
              ] || []
          });
        });
        this.setState({ ready: true });
      });
  }
  regionFrom(lat, lon) {
    this.setState({
      region: {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.0486,
        longitudeDelta: 0.0472
      }
    });
  }
  random(index) {
    let aux = this.state.data[index];
    switch (aux.status) {
      case "Não urgente":
        return "#027E3F";
      case "Pouco Urgente":
        return "#F4C900";
      case "Urgente":
        return "#C5161D";
    }
  }
  closeModal = () => {
    this.setState({ active: false });
  };
  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
    reactotron.log(latitude, longitude);
    this.setState({
      region: {
        latitude,
        longitude,
        latitudeDelta: 0.0486,
        longitudeDelta: 0.0472
      }
    });
  };
  render() {
    const { region, activy, active, points } = this.state;
    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          visible={active}
          onRequestClose={this.closeModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.3)",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: 350,
                height: 200,
                borderRadius: 5,
                padding: 5
              }}
            >
              <View style={{ borderBottomColor: "#CCC", borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  {this.state.model.specie}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "black" }}>
                  Status: {this.state.model.status}
                </Text>
                <Text style={{ color: "black" }}>
                  Tipo de poda: {this.state.model.tipoDePoda}
                </Text>
                <Text style={{ color: "black" }}>
                  Data da última poda: {this.state.model.dataUltimaPoda}
                </Text>
                <Text style={{ color: "black" }}>
                  Data da proxima poda: 18/05/2020
                </Text>
              </View>
              <View
                style={{
                  bottom: 5,
                  marginHorizontal: 10,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.closeModal();
                  }}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#50BA59",
                    borderRadius: 5,
                    maxWidth: 120,
                    minWidth: 120
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 16
                    }}
                  >
                    Solicitar Poda
                  </Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  onPress={() => this.closeModal()}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: 100,
                    minWidth: 100
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 16
                    }}
                  >
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
              flex: 2,
              textAlign: "center",
              right: 10,
              fontSize: 20,
              color: "#85B84F",
              fontWeight: "bold"
            }}
          >
            Gestão de podas
          </Text>
          <View style={{ flex: 1 }}>
            <Picker
              onValueChange={filter => {
                this.setState({ filter });
                if (filter != "all") this.filter(filter);
                else this.populate();
              }}
              selectedValue={this.state.filter}
            >
              <Picker.Item
                color="#aaa"
                label="Status"
                value={"all"}
                key={"all"}
              />
              <Picker.Item
                color="#027E3F"
                label="Não urgente"
                value={"Não urgente"}
                key={"Não urgente"}
              />
              <Picker.Item
                color="#F4C900"
                label="Pouco Urgente"
                value={"Pouco Urgente"}
                key={"Pouco Urgente"}
              />
              <Picker.Item
                color="#C5161D"
                label="Urgente"
                value={"Urgente"}
                key={"Urgente"}
              />
            </Picker>
          </View>
        </View>

        <MapView
          showsUserLocation
          onRegionChangeComplete={e => {
            this.setState({ region: e });
          }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          rotateEnabled={false}
          mapType="satellite"
          style={{ flex: 1 }}
          region={region}
          loadingEnabled
        >
          {points.length > 0 ? (
            activy == "heat" ? (
              <Heatmap
                points={points}
                opacity={1}
                radius={30}
                maxIntensity={100}
                heatmapMode={"POINTS_WEIGHT"}
              />
            ) : (
              points.map((item, index) => (
                <Marker
                  pinColor={this.random(index)}
                  key={index}
                  onPress={e => {
                    this.setState({
                      model: this.state.data[index],
                      active: true
                    });
                  }}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta
                  }}
                >
                  {/* <Image
                    source={require("../../assets/marker.png")}
                    style={{ height: 35, width: 35 }}
                  /> */}
                </Marker>
              ))
            )
          ) : null}
        </MapView>
        {this.state.ready && (
          <Search onLocationSelected={this.handleLocationSelected} />
        )}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ activy: "heat" });
            }}
            style={{
              right: 150,
              bottom: 10,
              position: "absolute",
              borderRadius: 10,
              borderWidth: 2,
              backgroundColor: activy == "heat" ? "#85b84f" : "rgba(0,0,0,0.5)",
              borderColor: "#FFF"
            }}
          >
            <Text
              style={{
                color: "white",
                margin: 10
              }}
            >
              Mapa de calor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ activy: "points" });
            }}
            style={{
              right: 10,
              bottom: 10,
              position: "absolute",
              borderRadius: 10,
              borderWidth: 2,
              backgroundColor:
                activy == "points" ? "#85b84f" : "rgba(0,0,0,0.5)",
              borderColor: "#FFF"
            }}
          >
            <Text
              style={{
                color: "white",
                margin: 10
              }}
            >
              Mapa de pontos
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject }
});
