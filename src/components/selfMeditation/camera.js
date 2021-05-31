import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { Camera as BaseCamera } from "expo-camera";


import Start from './start';
import LeftControls from './leftControls';
import RightControls from './rightControls';

import { 
  AppTimePicker,
  AppClosePopup,
} from '../ui';

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
    period: 0,
    pressOnClose: false,
  });
  const [timePicker, setTimePicker] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [timePickerChooser, setTimePickerChooser] = useState(false);

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

  const pressOnClose = () => {
    const close = !state.pressOnClose;
    const isPaused = !state.paused;

    setState({
      ...state,
      pressOnClose: close,
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
  const bindeOnClose = () => {
    onClose();
    setState({
      paused: false,
      muted: false,
      started: false,
      period: 0,
      pressOnClose: false,
    });
    setTimePicker(false);
    setSelectedMeditation(null);
    setTimePickerChooser(false);
  }

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
      {state.paused  && (
        <View style={[StyleSheet.absoluteFill, styles.blur]} />
      )}
      {state.pressOnClose && <AppClosePopup 
      onClose={bindeOnClose}
      pressOnClose={pressOnClose}
      />
      }
      <LeftControls
        state={state}
        timePickerHandler={timePickerHandler}
        selectedMeditation={selectedMeditation} 
        setSelectedMeditation={setSelectedMeditation}
        timePicker={timePicker}
      />
      <RightControls
        state={state}
        onClose={pressOnClose}
        onPauseCameraHandler={onPauseCameraHandler}
        onPauseVolumeHandler={onPauseVolumeHandler}
      />
      <View style={styles.content}>
        {children}
      </View>
      {onStart && !state.pressOnClose && (
        <Start
          state={state}
          onPress={onStartHandler}
        />
      )}
      {timePicker && !state.pressOnClose && (
        <AppTimePicker
        setTimePicker={setTimePicker}
        timePickerChooser={timePickerChooser}
        setTimePickerChooser={setTimePickerChooser}
        onPauseCameraHandler={onPauseCameraHandler}
          onChange={(hours, minutes) => {
            setTimePicker(!timePicker);
            setState({
              ...state,
              period: hours * 60 * 60 + minutes * 60,
            });
          }}
        />
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
    zIndex: 1
  },
});

export default Camera;
