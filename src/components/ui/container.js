import React from "react";
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import background from "../../../src/assets/layout/background.png";
import background2 from "../../../src/assets/layout/background2.png";
import BackButton from "../../../src/assets/icons/Back.svg";

const { width } = Dimensions.get("window");

const Container = ({
  children,
  noPadding,
  navigation,
  withBackground,
  backgroundType,
}) => (
  <View style={styles.container}>
    <View style={[styles.content, !noPadding && styles.padding]}>
      <StatusBar
        barStyle={backgroundType === 'upper' ? "light-content" : "dark-content"}
        translucent
        backgroundColor="transparent"
      />
      {navigation && navigation.canGoBack() && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>
        </View>
      )}
      {children}
    </View>
    {withBackground && (
      <Image
        source={backgroundType === 'upper' ? background2 : background}
        style={[styles.background, backgroundType === 'upper' ? styles.background2 : styles.background1]}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5FC",
  },
  header: {
    height: 60,
    justifyContent: "center",
  },
  padding: {
    padding: 28,
  },
  background: {
    left: 0,
    right: 0,
    zIndex: 0,
    position: "absolute",
    resizeMode: "contain",
  },
  background1: {
    bottom: 0,
    width: width,
    height: width * (387 / 375),
  },
  background2: {
    top: 0,
    width: width,
    height: width * (538 / 750),
  },
  content: {
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    position: "absolute",
    zIndex: 1,
  },
});

Container.defaultProps = {
  backgroundType: ''
}

export default Container;