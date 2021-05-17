import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  AppText,
  AppIcon,
} from '../ui';


const Start = ({
  state,
  onPress,
}) => (
  <View style={styles.bottomControls}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.startCallBtn}>
        <AppIcon
          icon="start"
          width={80}
          height={80}
        />
        <AppText style={styles.startCallText}>
          {state.started ? "common.stopCamera" : "common.startCamera"}
        </AppText>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  startCallBtn: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  startCallText: {
    position: "absolute",
    color: "#ffffff",
  },
  bottomControls: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
});

export default Start;
