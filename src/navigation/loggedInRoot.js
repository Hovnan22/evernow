import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import i18n from "i18n-js";

import {
  Account,
  Meditation,
  SettingPage,
} from '../screens';

const Stack = createStackNavigator();
class Root extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            title: i18n.t("screen.account.title"),
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingPage"
          component={SettingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Meditation"
          component={Meditation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    )
  }
}


export default Root;
