/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  Easing
} from "react-native";
import Form from "./form";
import { BallIndicator } from "react-native-indicators";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { indicator: false, erro: false };
    this.animatedValue = new Animated.Value(0);
  }
  async componentWillMount() {
    // const token = await LocalStorage.get('token');
    // if (token) {
    //   const isValidToken = await Auth.checkToken(token);
    //   !!isValidToken && Actions.push('dashboard');
    // }
  }
  login(username, password) {
    this.setState({ indicator: true });
    this.animatedGo();
    setTimeout(() => {
      this.props.navigation.navigate("Map");
    }, 2000);
  }
  animatedGo() {
    Animated.timing(this.animatedValue, {
      toValue: 0.015,
      duration: 1000,
      easing: Easing.ease
    }).start(() => {
      this.animatedBack();
    });
  }
  animatedBack() {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease
    }).start(() => {
      this.animatedGo();
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.indicator === true ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center"
            }}
          >
            <View style={{ flex: 1, top: 100 }}>
              <Animated.Image
                source={require("../../assets/logo.png")}
                resizeMode="contain"
                style={[
                  styles.logoAnimated,
                  {
                    transform: [
                      {
                        translateX: this.animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 120]
                        })
                      },
                      {
                        translateY: this.animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 25]
                        })
                      },
                      {
                        scaleX: this.animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 15]
                        })
                      },
                      {
                        scaleY: this.animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 12.5]
                        })
                      }
                    ]
                  }
                ]}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <BallIndicator
                color="#50BA59"
                style={{ maxWidth: 80, maxHeight: 80 }}
              />
              <Text style={{ color: "black", fontWeight: "700" }}>
                Realizando autenticação. Aguarde...
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text
              style={{
                color: "#50BA59",
                textAlign: "center",
                fontSize: 35,
                top: 5,
                fontWeight: "bold"
              }}
            >
              Tree Scanner
            </Text>
            <View style={styles.formContainer}>
              <Form
                error={this.state.erro}
                onSubmitLogin={(username, password) => {
                  this.login(username, password);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Voluntary")}
            >
              <Text style={{ fontSize: 17 }}>Entrar como voluntário</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logoAnimated: { height: 200, width: 200 },
  logo: {
    height: 200,
    width: 200
  }
});
