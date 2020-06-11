import { createAppContainer, NavigationActions } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Map from "./views/map";
import Login from "./views/login";
import Voluntary from "./views/login/voluntary";
import TreeList from "./views/tree/list";
import TreeForm from "./views/tree/form";
import TreeMap from "./views/tree/treeMap";
const Routes = createAppContainer(
  createStackNavigator({
    Login: { navigationOptions: { headerShown: false }, screen: Login },
    Voluntary: { navigationOptions: { headerShown: false }, screen: Voluntary },
    Map: { navigationOptions: { headerShown: false }, screen: Map },
    TreeList: { navigationOptions: { headerShown: false }, screen: TreeList },
    TreeForm: { navigationOptions: { headerShown: false }, screen: TreeForm },
    TreeMap: { navigationOptions: { headerShown: false }, screen: TreeMap }
  })
);

export default Routes;
