import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { Camera as BaseCamera } from "expo-camera";

import { CameraButton } from '../../components/selfMeditation';

import AppText from './text';
import AppTimePicker from './timePicker';
import AppGaugeChart from './gaugeChart';

import { Grid } from '../../styles';

import StartCall from "../../../src/assets/icons/start.svg";


const Camera = ({
  onMute,
  onStop,
  onStart,
  onClose,
  children,
  onPauseCamera,
}) => {
  const [state, setState] = useState({
    paused: false,
    muted: false,
    started: false,
    period: 240,
  });
  const [timePicker, setTimePicker] = useState(false);

  const onPauseCameraHandler = () => {
    const isPaused = !state.paused;
    setState({
      ...state,
      paused: isPaused,
    });
    if (onPauseCamera !== undefined) {
      onPauseCamera(isPaused);
    }
  };

  const onPauseVolumeHandler = () => {
    const isMuted = !state.muted;
    setState({
      ...state,
      muted: isMuted,
    });
    if (onMute !== undefined) {
      onMute(isMuted);
    }
  };

  const onStartHandler = () => {
    setState({
      ...state,
      started: !state.started,
    });
    if (!state.started === true) {
      onStart();
    } else {
      onStop();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BaseCamera.requestPermissionsAsync();
      setState({
        ...state,
        access: status === "granted",
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {state.paused && (
        <View style={[StyleSheet.absoluteFill, styles.blur]} />
      )}
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
            onPress={() => setTimePicker(!timePicker)}
          />
        </View>
      </View>
      <View style={styles.rightControls}>
        <View>
          <CameraButton
            icon="close"
            onPress={onClose}
            width={26}
            height={26}
          />
        </View>
        <View>
          <CameraButton
            icon="camera"
            onPress={onPauseCameraHandler}
            width={40}
            height={40}
          />
          <CameraButton
            icon={`volume_${state.muted ? 'on' : 'off'}`}
            onPress={onPauseVolumeHandler}
            width={40}
            height={40}
          />
        </View>
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.bottomControls}>
        {onStart && (
          <TouchableOpacity onPress={onStartHandler}>
            <View style={styles.startCallBtn}>
              <StartCall />
              <AppText style={styles.startCallText}>
                {state.started ? "common.stopCamera" : "common.startCamera"}
              </AppText>
            </View>
          </TouchableOpacity>
        )}
      </View>
      {timePicker && (
        <AppTimePicker onChange={(hours, minutes) => {
          setTimePicker(!timePicker);
          setState({
            ...state,
            period: hours * 60 + minutes,
          });
        }} />
      )}
    </View>
  );
}

Camera.propTypes = {
  onClose: PropTypes.func,
  onStart: PropTypes.func,
  onMute: PropTypes.func,
  onPauseCamera: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    ...Grid.flex1,
    backgroundColor: "#000000",
  },
  closeButton: {
    position: "absolute",
    top: 44,
    right: 24,
  },
  startCallBtn: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  startCallText: {
    position: "absolute",
    color: "#ffffff",
  },
  rightControls: {
    position: "absolute",
    right: 0,
    width: 64,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 36,
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
    opacity: 0.5,
    zIndex: 4,
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
  blur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 4,
    backgroundColor: "rgba(0, 129, 218, 0.5)",
  },
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
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

export default Camera;