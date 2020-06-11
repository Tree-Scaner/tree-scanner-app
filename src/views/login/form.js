import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native";
const { width } = Dimensions.get("window");
export default function Form(props) {
  const [error, setError] = useState(props.error);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login(username, password) {
    props.onSubmitLogin(username, password);
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={username => {
          setError(false);
          setUsername(username);
        }}
        style={styles.input}
        placeholder="Login"
        placeholderTextColor="#FFF"
        returnKeyType="next"
      />
      <TextInput
        value={password}
        onChangeText={password => {
          setError(false);
          setPassword(password);
        }}
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#FFF"
        returnKeyType="go"
        secureTextEntry
      />

      <TouchableOpacity
        onPress={() => {
          login(username, password);
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      {error === true ? (
        <Text style={styles.erro}>
          Usuário e/ou senha inválidos. Verifique os dados e tente novamente.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    padding: 20
  },
  input: {
    height: 40,
    borderRadius: 3,
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    color: "#FFF",
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "#50BA59",
    paddingVertical: 10,
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  erro: {
    fontSize: 15,
    color: "white",
    margin: 5,
    textAlign: "center"
  }
});
