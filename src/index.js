import React from "react";
import { View, StatusBar, Text } from "react-native";
import Router from "./router";
import Drawer from "react-native-drawer";
import ItemsDrawer from "./components/ItemsDrawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import getRealm from "./services/realm";
import NetInfo from "@react-native-community/netinfo";
import { firestore } from "react-native-firebase";
export default class App extends React.Component {
  async componentDidMount() {
    const realm = await getRealm();
    const response = realm.objects("arvore");

    NetInfo.fetch().then(res => {
      if (res.isConnected) {
        response.forEach(async item => {
          await firestore()
            .collection("arvores")
            .add(item);
        });
      }
      realm.write(() => {
        realm.deleteModel("arvore");
      });
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Router />
      </View>
    );
  }
}
