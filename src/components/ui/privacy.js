import React from "react";
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import AppText from './text';

import { Colors } from "../../styles";

const Privacy = props => (
  <>
    <TouchableOpacity
      {...props}
      onPress={() => Linking.openURL("http://evernow.be/privacy")}
    >
      <AppText style={styles.text}>
        {"common.privacyPolicy"}
      </AppText>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.5,
    color: Colors.white
  }
});

export default Privacy;
