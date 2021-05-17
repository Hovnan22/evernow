import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import i18n from "i18n-js";

import {
  Welcome,
  Login,
  Registration,
  RecoveryPassword,
} from '../screens';

const Stack = createStackNavigator();

const Root = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={Welcome}
      options={{
        title: i18n.t("screen.main.title"),
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: i18n.t("screen.login.title"),
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Register"
      component={Registration}
      options={{
        title: i18n.t("screen.register.title"),
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RecoveryPassword"
      component={RecoveryPassword}
      options={{
        title: i18n.t("screen.recoveryPassword.title"),
        headerShown: false,
      }}
    />
  </Stack.Navigator>
)

export default Root;
