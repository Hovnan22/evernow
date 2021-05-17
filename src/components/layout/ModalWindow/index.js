import React from "react";
import { View, StyleSheet, Image } from "react-native";
import ModalBg from "../../../../src/assets/images/ModalBg.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 59, 100, 0.8)",
    zIndex: 100,
  },
  modal: {
    height: "85%",
    backgroundColor: "#F2F5FC",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingVertical: 24,
    paddingHorizontal: 24,
    position: "relative",
  },
  bg: {
    position: "absolute",
    resizeMode: "cover",
    top: 0,
    left: 0,
    right: 0,
    width: 450,
    height: 490,
  },
});

export default function ModalWindow({ children }) {
  return <View style={styles.container}>
    <View style={styles.modal}>
      <Image source={ModalBg} style={styles.bg} />
      {children}
    </View>
  </View>;
}
