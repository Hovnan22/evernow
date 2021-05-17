import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { AppIcon } from '../ui';

import bg from "../../../src/assets/images/introductionBg.png";


const StreamIntroCover = ({
  bottom,
  onClose,
  children,
}) => (
  <View style={styles.container}>
    <Image source={bg} style={styles.bg} />
    <View style={styles.cover} />
    <View style={styles.wrapper}>
      <View style={styles.head}>
        <TouchableOpacity onPress={onClose}>
          <AppIcon
            icon="close"
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.bottom}>
        {bottom}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  cover: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 129, 218, 0.5)",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  head: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 56,
  },
  bottom: {
    marginBottom: 48,
  },
  bg: {
    width: "100%",
  },
});

export default StreamIntroCover;

