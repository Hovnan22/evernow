import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  FirstSlider,
  SecondSlider,
} from '../../components/prepareAccount';

const Tab = createMaterialTopTabNavigator();

const PrepareAccount = () => {
  return (
    <Tab.Navigator tabBarPosition="none">
      <Tab.Screen
        name="FirstSlider"
        options={{ headerShown: false }}
        component={FirstSlider}
      />
      <Tab.Screen
        name="SecondSlider"
        options={{ headerShown: false }}
        component={SecondSlider}
      />
    </Tab.Navigator>
  );
}

export default PrepareAccount;
