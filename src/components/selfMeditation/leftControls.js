import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import CameraButton from './buttons';
import { 
  AppGaugeChart,
  AppIcon,
} from '../ui';
import MeditationLists from './meditationLists';

const { height, width } = Dimensions.get("screen");

const LeftControls = ({
  state,
  timePicker,
  showMeditation,
  timePickerHandler,
  selectedMeditation,
  setSelectedMeditation,
}) => (
  <View style={state.hideCamera ? styles.leftControlsBig : styles.leftControls}>
    {!timePicker && !state.pressOnClose && !state.hideMeditation &&  (<View style={styles.meditationList}>
      <MeditationLists
        selectedMeditation={selectedMeditation}
        setSelectedMeditation={setSelectedMeditation}
      />
    </View>)}
    <View style={[styles.timeWrapper, state.hideCamera && styles.timeWrapperBig]}>
      <View style={styles.gaugeChart}>
        <AppGaugeChart
          borderGradient={["#FFF", "#FFF"]}
          borderWidth={4}
          circleColor={"#C8C6C3"}
          circleGradient={["rgb(230, 230, 230)", "#C8C6C3"]}
          size={!state.hideCamera ? 64 : 200}
          startTime={state.period}
          endTime={0}
          textSize={!state.hideCamera ? 8 : 18}
          started={state.started}
        />
      </View>
      <CameraButton
        width={35}
        height={35}
        icon="settings"
        style={[state.hideCamera ? styles.timeSettingsBig :styles.timeSettings ]}
        onPress={timePickerHandler}
      />
      {state.hideCamera && (  
            <TouchableOpacity
            style={styles.meditationButton}
            onPress={showMeditation}
          >
            <AppIcon
              icon="yog"
              width={35}
              height={35}
            />
          <Text style={{color: 'white'}}>Type of meditation</Text>
          </TouchableOpacity>
)}
    </View>
  </View>
);

const styles = StyleSheet.create({
  timeSettingsBig : {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    borderRadius: 7,
    backgroundColor: "rgba(255,255,255, .5)",
    width: 55,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  showMeditation: {
    zIndex: 10,
  },
  meditationButton: {
    justifyContent: "center",
    alignItems: 'center',
  },
  leftControlsBig: {
    width: width,
    height: '100%',
    position: "relative",
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36,
    paddingHorizontal: 16,
    zIndex: 4,
  },
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
  timeWrapperBig : {
    height: '100%',
    width: '100%',
    opacity: 1,
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
    zIndex: 201,
    width: width,
    height: height,
    position: "absolute",
    justifyContent: "center",

  }
});

export default LeftControls;
