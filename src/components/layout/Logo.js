import React from "react";
import { Image, StyleSheet, View } from "react-native";
import img from "../../../src/assets/images/logo.png";

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: 186,
    height: 186,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default function Logo(props) {
  return <View style={styles.container}>
    <Image source={img} {...props} style={styles.image} />
  </View>;
}
