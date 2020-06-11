import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ModalContent(props) {
  const [sizeIcon] = useState(20);
  const [showInput, setShowInput] = useState(false);
  return (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Cadastrar árvore</Text>
      <Text>Nome</Text>
      <TextInput style={styles.input} placeholder="Digite aqui..." />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: "#CCC"
          }}
        >
          <Text>Espécie</Text>
          <Picker>
            <Picker.Item label="Nim" key="nim" value="nim"></Picker.Item>
            <Picker.Item label="Nim" key="nim" value="nim"></Picker.Item>
            <Picker.Item label="Nim" key="nim" value="nim"></Picker.Item>
            <Picker.Item label="Nim" key="nim" value="nim"></Picker.Item>
            <Picker.Item label="Nim" key="nim" value="nim"></Picker.Item>
            <Picker.Item label="Nim" key="nim" value="nim"></Picker.Item>
            <Picker.Item label="Nim" key="nim" value="nim"></Picker.Item>
            <Picker.Item label="Nim" key="nim" value="nim"></Picker.Item>
          </Picker>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "#85B84F", borderRadius: sizeIcon / 2 }}
          onPress={() => setShowInput(true)}
        >
          <Icon name="plus" size={sizeIcon} color="#FFF" />
        </TouchableOpacity>
      </View>
      {showInput && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Digite o nome da espécie"
          />
          <Button testID={"close-button"} onPress={() => {}} title="Salvar" />
        </View>
      )}
      <Text>Data da última poda</Text>
      <TextInput style={styles.input} placeholder="DD/MM/AAAA" />
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: "#CCC"
        }}
      >
        <Text>Tipo de poda</Text>
        <Picker>
          <Picker.Item
            label="Levantamento da copa"
            key="nim"
            value="nim"
          ></Picker.Item>
          <Picker.Item
            label="Central de iluminação"
            key="nim"
            value="nim"
          ></Picker.Item>
          <Picker.Item label="Lateral" key="nim" value="nim"></Picker.Item>
          <Picker.Item label="Topo" key="nim" value="nim"></Picker.Item>
        </Picker>
      </View>
      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ paddingRight: 2.5 }}>{props.coordinate.latitude}</Text>
        <Text style={{ paddingLeft: 2.5 }}>{props.coordinate.longitude}</Text>
      </View> */}
      <Button testID={"close-button"} onPress={props.onPress} title="Close" />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    padding: 15,
    justifyContent: "flex-start",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
    borderBottomWidth: 1
  },
  input: {
    borderBottomColor: "#DDD",
    borderBottomWidth: 1
  }
});
