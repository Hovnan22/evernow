import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import CameraButton from './buttons';
import { AppGaugeChart } from '../ui';
import MeditationLists from './meditationLists';

const { height, width } = Dimensions.get("screen");

const LeftControls = ({
  state,
  timePicker,
  timePickerHandler,
  selectedMeditation,
  setSelectedMeditation,
}) => (
  <View style={styles.leftControls}>
    {!timePicker && !state.pressOnClose && (<View style={styles.meditationList}>
      <MeditationLists 
        selectedMeditation={selectedMeditation}
        setSelectedMeditation={setSelectedMeditation}
      />
    </View>)}
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
        width={35}
        height={35}
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
    zIndex: 4,
  },
  timeWrapper: {
    opacity: 0.5,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  timeSettings: {
    top: 70,
    position: "absolute",
    right: -25,
    backgroundColor: "rgba(255,255,255, .5)",
    padding: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    zIndex: 200,
  },
  meditationList: {
    top: 0,
    left: 0,
    zIndex: 10,
    width: width,
    height: height,
    position: "absolute",
    justifyContent: "center",

  }
});

export default LeftControls;
