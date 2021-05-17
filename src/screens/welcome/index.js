import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import i18n from 'i18n-js';

import {
  AppCard,
  AppButton,
  AppContainer,
} from '../../components/ui';
import {
  Logo,
  SocialButtons,
} from '../../components/welcome';

import { Grid } from "../../styles";


const Welcome = ({ navigation }) => (
  <AppContainer withBackground>
    <View style={styles.top}>
      <Logo />
    </View>
    <View>
      <AppCard type1>
        <SocialButtons />
        <AppButton
          type="gradient"
          title={"common.login"}
          onPress={() => navigation.navigate("Login")}
        />
        <AppButton
          type="outlined"
          title={"common.register"}
          onPress={() => navigation.navigate("Register")}
        />
      </AppCard>
    </View>
  </AppContainer>
);

const styles = StyleSheet.create({
  top: {
    flex: 1,
    ...Grid.centeredY,
    ...Grid.centeredX,
  },
  bottom: {
    ...Grid.centeredY,
    ...Grid.centeredX,
  },
});

export default Welcome;
