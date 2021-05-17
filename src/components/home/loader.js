import React from "react";
import {
  View,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const Loader = ({ style }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 0.5 }}
    style={styles.gradient}
    colors={['rgba(115, 176, 233, 0.4)', 'rgba(115, 176, 233, 0.0001)']}
  >
    <View style={[style, styles.container]}>
      <ActivityIndicator
        size="large"
        color="#5596D9"
        style={styles.indicator}
      />
    </View>
  </LinearGradient>

);

const styles = StyleSheet.create({
  gradient: {
    width: 86,
    height: 86,
    borderRadius: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 71,
    height: 71,
    borderRadius: 56,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: Platform.select({
    android: {},
    ios: {
      marginTop: 5,
      marginLeft: 3,
    }
  }),
});

export default Loader;
