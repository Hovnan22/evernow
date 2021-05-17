import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import { CameraButton } from './';
import { AppGaugeChart } from '../ui';


const LeftControls = ({
  state,
  timePickerHandler,
}) => (
  <View style={styles.leftControls}>
    <View style={styles.timeWrapper}>
      <View style={styles.gaugeChart}>
        <AppGaugeChart
          borderGradient={["#FFF", "#FFF"]}
          borderWidth={4}
          circleColor={"#C8C6C3"}
          circleGradient={["rgb(230, 230, 230)", "#C8C6C3"]}
          size={64}
          startTime={state.period}
          endTime={0}
          textSize={8}
          started={state.started}
        />
      </View>
      <CameraButton
        width={15}
        height={15}
        icon="settings"
        style={styles.timeSettings}
        onPress={timePickerHandler}
      />
    </View>
  </View>
);


const styles = StyleSheet.create({
  leftControls: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    paddingVertical: 36,
    paddingHorizontal: 16,
    opacity: 0.5,
    zIndex: 4,
  },
  timeWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  timeSettings: {
    position: "absolute",
    right: -23,
    backgroundColor: "rgba(255,255,255, .5)",
    padding: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    zIndex: 0,
  },
});

export default LeftControls;