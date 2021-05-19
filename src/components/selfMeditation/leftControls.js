import React from "react";
import {
  View,
  StyleSheet,
  Dimensions ,
} from "react-native";

import CameraButton from './buttons';
import { AppGaugeChart, AppMeditationLists } from '../ui';

// import MeditationTypes from '../meditation/meditationTypes';
const screen = Dimensions.get("screen");
const LeftControls = ({
  state,
  timePickerHandler,
}) => (
  <View style={styles.leftControls}>
    {/* <View style={{
      flex: 1,
    }}> */}<View style={styles.meditationList}>
      <AppMeditationLists showText={true} />
      </View>
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
    {/* </View>
    <View style={{
      flex: 1,
    }}>

      <MeditationTypes />
    </View>
    <View style={{
      flex: 1,
    }}></View> */}
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
  },
  timeSettings: {
    position: "absolute",
    right: -25,
    backgroundColor: "rgba(255,255,255, .5)",
    padding: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    zIndex: 0,
  },
  meditationList: {
    height: screen.height,
    position: "absolute",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    top: 0,
    left: 0,
    zIndex: 600000000,
  }
});


export default LeftControls;