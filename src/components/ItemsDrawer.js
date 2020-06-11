import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import Logo from "../assets/logo.png";
// import { Container } from './styles';

const { width, height } = Dimensions.get("window");
export default function ItemsDrawer(props) {
  const ItemsConfig = [
    {
      icon: "share",
      text: "Compartilhar"
    }
  ];
  return (
    <View style={{ flex: 1, paddingLeft: 10 }}>
      <View
        style={{ backgroundColor: "#EEE", height: height * 0.3, padding: 10 }}
      >
        <Image
          source={Logo}
          style={{
            flex: 1,
            width: 130,
            height: 100,
            resizeMode: "contain",
            alignSelf: "center"
          }}
        />
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center"
          }}
        >
          Tree Scanner
        </Text>
        <Text style={{ color: "black", fontSize: 15 }}>
          treescanner@gmail.com
        </Text>
      </View>
      <View style={{ top: 30, flex: 1 }}>
        <TouchableOpacity
          onPress={() => props.changeScreen("TreeMap")}
          style={styles.row}
        >
          <Image
            source={require("../assets/poda.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
              alignSelf: "center"
            }}
          />
          <Text style={styles.text}>Gestão de Podas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Image
            source={require("../assets/tipo_poda.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
              alignSelf: "center"
            }}
          />
          <Text style={styles.text}>Tipo de Poda</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.row}>
          <Image
            source={require("../assets/tipo_poda.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
              alignSelf: "center"
            }}
          />
          <Text style={styles.text}>Catalógo de espécies</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.row} disabled>
          <Image
            source={require("../assets/rotas.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
              alignSelf: "center"
            }}
          />
          <Text style={styles.text}>Visualizar rotas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  text: {
    flex: 1,
    fontSize: 20,
    left: 15
  },
  linearGradient: {
    flex: 1
  }
});
