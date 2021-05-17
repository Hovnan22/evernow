import React from "react";
import {
  View,
  Image,
  Platform,
  StyleSheet,
} from "react-native";

import img from "../../../assets/images/logo.png";


const Logo = props => (
  <View style={styles.container}>
    <Image source={img} {...props} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 186,
    height: 186,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Logo;
