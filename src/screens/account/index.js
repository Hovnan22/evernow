import React, {
  useState,
  useEffect,
} from "react";
import { Text, View } from "react-native";
import { connect } from 'react-redux';
import i18n from "i18n-js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SocketService } from '../../services'

import Home from '../home';
import Settings from '../settings';
import SelfMeditation from '../selfMeditation';

import { AppButton } from '../../components/ui';

import { Grid, Typography } from '../../styles';

import TabBar from "../../components/layout/TabBar";
import HomeIcon from "../../../src/assets/icons/home.svg";
import MeditationIcon from "../../../src/assets/icons/yoga.svg";
import SettingIcon from "../../../src/assets/icons/preference.svg";

import LinearGradientLayout from "../../components/layout/LinearGradientLayout";
import ModalWindow from "../../components/layout/ModalWindow";

const Tab = createBottomTabNavigator();

const Account = ({
  auth,
  navigation,
}) => {
  const [modal, showModal] = useState(false);

  const onCloseModal = () => {
    navigation.navigate("Meditation");
    showModal(false);
  };

  useEffect(() => {
    SocketService.createSocketConnection(auth.accessToken);
    return () => {
      SocketService.disconnect();
    };
  }, []);

  return <LinearGradientLayout>
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: i18n.t("screen.home.title"),
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SelfMeditation"
        component={SelfMeditation}
        options={{
          title: i18n.t("screen.meditation.title"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MeditationIcon width={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: i18n.t("screen.settings.title"),
          tabBarIcon: ({ color, size }) => (
            <SettingIcon width={size} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
    {modal && (
      <ModalWindow>
        <View style={[Grid.flex1, Grid.centeredY, Grid.centeredX]}>
          <Text style={[Typography.h1, Typography.pb2, { color: "#fff" }]}>
            {i18n.t("screen.account.search_line_1")}
          </Text>
          <Text style={{ color: "#fff" }}>
            {i18n.t("screen.account.search_line_2")}
          </Text>
        </View>
        <View>
          <AppButton
            title={"screen.account.learningVideos"}
            type={"gradient"}
          />
          <AppButton
            onPress={onCloseModal}
            title={"screen.account.selfMeditation"}
            type={"gradient"}
          />
        </View>
      </ModalWindow>
    )}
  </LinearGradientLayout>;
}

const mapStateToProps = ({ app: { auth } }) => ({
  auth,
})

export default connect(mapStateToProps)(Account);
