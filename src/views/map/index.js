import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  PermissionsAndroid,
  StyleSheet
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import DefaultModalContent from "../../components/DefaultModalContent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Drawer from "react-native-drawer";
import ItemsDrawer from "../../components/ItemsDrawer";
import firebase from "react-native-firebase";
import LocalStorage from "../lib";
import Search from "./search";
export default class Map extends Component {
  state = {
    region: null,
    marker: null,
    activy: "hybrid",
    showModal: false
  };
  async componentDidMount() {
    console.log(await LocalStorage.get("userData"));
    this._drawer.close();
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
  regionFrom(lat, lon) {
    this.setState({
      region: {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.00286,
        longitudeDelta: 0.00147
      }
    });
  }

  render() {
    const { region, marker, activy } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Drawer
          ref={ref => (this._drawer = ref)}
          content={
            <ItemsDrawer
              changeScreen={screen => {
                this.props.navigation.navigate(screen);
              }}
            />
          }
          type="static"
          tapToClose
          openDrawerOffset={0.3}
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={drawerStyle}
          tweenHandler={radio => ({
            man: { opacity: (2 - radio) / 2 }
          })}
        >
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
                this._drawer.open();
              }}
            >
              <Icon name="menu" size={30} color="#85B84F" />
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
              Mapa
            </Text>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            rotateEnabled={false}
            onRegionChangeComplete={region => {
              this.setState({ region });
            }}
            mapType={activy}
            onPress={event => {
              let aux = event.nativeEvent;
              let marker = aux.coordinate;
              this.setState({ marker });
            }}
            style={{ flex: 1 }}
            region={region}
            showsUserLocation
            loadingEnabled
          >
            {marker && (
              <Marker
                coordinate={marker}
                draggable
                onDragEnd={e =>
                  this.setState({ marker: e.nativeEvent.coordinate })
                }
              />
            )}
          </MapView>
          {marker && (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("TreeForm", {
                  coordinate: {
                    latitude: marker.latitude,
                    longitude: marker.longitude
                  }
                })
              }
              style={{
                position: "absolute",
                alignSelf: "center",
                bottom: 10,
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: "#85B84F",
                borderWidth: 1,
                borderColor: "#FFF",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon name="plus" size={30} color="#FFF" />
            </TouchableOpacity>
          )}
        </Drawer>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  option: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80
  },
  text: { color: "#85B84F", fontSize: 17, fontWeight: "bold" }
});
const drawerStyle = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  main: { paddingLeft: 3 }
};
const mapStyle = [
  {
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry.stroke",
    stylers: [
      {
        saturation: 100
      },
      {
        lightness: 100
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];
