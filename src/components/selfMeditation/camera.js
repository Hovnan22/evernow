import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { Camera as BaseCamera } from "expo-camera";

import {
  Start,
  LeftControls,
  RightControls,
} from './';
import { AppTimePicker } from '../ui';

import { Grid } from '../../styles';


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

  const timePickerHandler = () => setTimePicker(!timePicker);

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
      <LeftControls
        state={state}
        timePickerHandler={timePickerHandler}
      />
      <RightControls
        state={state}
        onClose={onClose}
        onPauseCameraHandler={onPauseCameraHandler}
        onPauseVolumeHandler={onPauseVolumeHandler}
      />
      <View style={styles.content}>
        {children}
      </View>
      {onStart && (
        <Start
          state={state}
          onPress={onStartHandler}
        />
      )}
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
});

export default Camera;