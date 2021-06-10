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
  AppTimeButtons,
} from '../ui';
import { Grid } from '../../styles';
import { Image } from "react-native";

const Camera = ({
  onMute,
  onStop,
  onStart,
  onClose,
  lastShot,
  children,
  onPauseCamera,
}) => {
  const [state, setState] = useState({
    paused: false,
    muted: false,
    started: false,
    period: 1800,
    closePopup: false,
    hideMeditation: false,
  });
  const [timePicker, setTimePicker] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [timePickerChooser, setTimePickerChooser] = useState(false);
  const [timePickerButtons, setTimePickerButtons] = useState(false);


  const onPauseCameraHandler = () => {
    const isPaused = !state.paused;
    if (!state.pausede) {
      setTimePicker(false);
    }
    console.log('onPauseCamera')
    state.paused && state.started && onStart();
    !state.paused && state.started && onStop();


    setState({
      ...state,
      paused: isPaused,
      hideMeditation: isPaused ? true : false,
    });
    if (onPauseCamera !== undefined) {
      onPauseCamera(isPaused);
    }
  };
  const showMeditation = () => {
    const hideMeditation = !state.hideMeditation;
    setState({
      ...state,
      hideMeditation: hideMeditation
    });
  }

  const onHideMeditation = () => {
    setState({
      ...state,
      hideMeditation: true,
    })
  }
  const setMeditationTime = (hours, minutes, manual) => {
    if (manual) {
      setTimePickerChooser(!timePickerChooser);
    }

    setState({
      ...state,
      period: hours * 60 * 60 + minutes * 60,
    })
    setTimePicker(false);
    setTimePickerButtons(false);

  }

  const closePopup = () => {
    if (!state.started) {
      bindeOnClose();
    } else {
      const close = !state.closePopup;
      setState({
        ...state,
        closePopup: close,
      });

      if (!close) {
        onStart()
      }

    }
  };

  const onStartHandler = () => {

    if (!state.started) {
      if (state.paused) {
        return false;
      }
      setState({
        ...state,
        started: !state.started,
      });
      onStart();
    } else {
      onStop();
      closePopup();
    }
  };
  const bindeOnClose = () => {
    onClose();
    setState({
      paused: false,
      muted: false,
      started: false,
      period: 1800,
      closePopup: false,
      hideMeditation: false,
    });
    setTimePicker(false);
    setSelectedMeditation(null);
    setTimePickerChooser(false);
  }

  const timePickerHandler = () => {
    if (state.paused) {
      setState(
        {
          ...state,
          hideMeditation: true,
        }
      )
    }
    setTimePickerButtons(!timePickerButtons);
  }

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

        <View style={[StyleSheet.absoluteFill, styles.blur]} >
          <View style={styles.blur}></View>
          <Image
            source={{ uri: lastShot && lastShot.uri }}
            style={{ width: '100%', height: '100%', zIndex: 3 }}
            resizeMode='cover'
            blurRadius={5}
          />
        </View>
      )}
      {state.closePopup && (
        <AppClosePopup
          onClose={bindeOnClose}
          closePopup={closePopup}
        />
      )
      }
      <LeftControls
        state={state}
        onHideMeditation={onHideMeditation}
        timePickerButtons={timePickerButtons}
        timePickerHandler={timePickerHandler}
        selectedMeditation={selectedMeditation}
        setSelectedMeditation={setSelectedMeditation}
        timePicker={timePicker}
        showMeditation={showMeditation}
      />
      <RightControls
        state={state}
        onClose={closePopup}
        onPauseCameraHandler={onPauseCameraHandler}
      />
      <View style={styles.content}>
        {children}
      </View>
      {onStart && !state.closePopup && (
        <Start
          state={state}
          onPress={onStartHandler}
        />
      )}
      {timePickerButtons && (
        <AppTimeButtons
          setTimePickerButtons={setTimePickerButtons}
          onChange={setMeditationTime}
          more={() => setTimePicker(!timePicker)}
        />)}
      {timePicker && !state.closePopup && (
        <AppTimePicker
          setTimePicker={setTimePicker}
          timePickerChooser={timePickerChooser}
          setTimePickerChooser={setTimePickerChooser}
          onChange={setMeditationTime}
          onCancel={() => setTimePicker(false)
          }
        />
      )}
    </View>
  );
};

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
    backgroundColor: "rgba(0, 129, 218, 0.7)",
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
