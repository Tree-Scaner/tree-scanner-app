import React from "react";
import { View, StatusBar, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Drawer from "react-native-drawer";
import ItemsDrawer from "./ItemsDrawer";

// import { Container } from './styles';

export default function Header(props) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#85b84f" animated barStyle="light-content" />
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
          {props.title}
        </Text>
      </View>
      <Drawer
        ref={ref => (this._drawer = ref)}
        content={<ItemsDrawer />}
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
        {props.children}
      </Drawer>
    </View>
  );
}
const drawerStyle = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  main: { paddingLeft: 3 }
};
