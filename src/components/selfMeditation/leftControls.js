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
  timePickerButtons,
  flatlistheight,
  showMeditation,
  meditationHeight,
  onHideMeditation,
  timePickerHandler,
  setFlatlistHeight,
  selectedMeditation,
  setmeditationheight,
  setSelectedMeditation,
}) => (
  <View style={state.paused ? styles.leftControlsBig : styles.leftControls}>
    {!timePickerButtons && !state.hideMeditation && (<View style={styles.meditationList}>
      <MeditationLists
        state={state}
        onHideMeditation={onHideMeditation}
        selectedMeditation={selectedMeditation}
        setSelectedMeditation={setSelectedMeditation}
        flatlistheight={flatlistheight}
        meditationHeight={meditationHeight}
        setFlatlistHeight={setFlatlistHeight}
        setmeditationheight={setmeditationheight}
      />
    </View>)}
    <View style={[styles.timeWrapper, state.paused && styles.timeWrapperBig]}>
      <AppGaugeChart
        borderGradient={["#FFF", "#FFF"]}
        borderWidth={4}
        isPaused={state.paused}
        circleColor={"transparent"}
        circleGradient={["rgb(230, 230, 230)", "#C8C6C3"]}
        size={!state.paused ? 64 : 200}
        startTime={state.period}
        endTime={0}
        textSize={!state.paused ? 8 : 18}
        started={state.started}
      />
      {state.paused && state.hideMeditation && !timePicker && (
        <TouchableOpacity
          style={styles.meditationButton}
          onPress={showMeditation}
        >
          <AppIcon
            icon="yog"
            width={35}
            height={35}
          />
          <Text style={{ color: 'white' }}>Type of meditation</Text>
        </TouchableOpacity>
      )}
    </View>
    <CameraButton
      width={15}
      height={15}
      icon="settings"
      style={[state.paused ? styles.timeSettingsBig : styles.timeSettings]}
      onPress={timePickerHandler}
    />

  </View>
);

const styles = StyleSheet.create({
  timeSettingsBig: {
    top: 35,
    left: 15,
    right: 25,
    position: 'absolute',
    borderRadius: 7,
    backgroundColor: "rgba(255,255,255, .5)",
    width: 35,
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 200
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
  timeWrapperBig: {
    height: '100%',
    width: '100%',
    opacity: 1,
  },
  timeWrapper: {
    opacity: 0.5,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  },
  timeSettings: {
    top: 85,
    position: "absolute",
    right: -7,
    backgroundColor: "rgba(255,255,255, .5)",
    padding: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    zIndex: 200,
    opacity: .5,
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
