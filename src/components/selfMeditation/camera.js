import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { Camera as BaseCamera } from "expo-camera";
import { BlurView } from "@react-native-community/blur";

import Start from './start';
import LeftControls from './leftControls';
import RightControls from './rightControls';
import {
  AppTimePicker,
  AppClosePopup,
  AppTimeButtons,
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
    closePopup: false,
    hideMeditation: false,
  });
  const [timePicker, setTimePicker] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [timePickerChooser, setTimePickerChooser] = useState(false);
  const [meditationTimer, setTimeMeditation] = useState();
  const [flatlistheight, setFlatlistHeight] = useState(0);
  const [meditationHeight, setmeditationheight] = useState(0);
  const [timePickerButtons, setTimePickerButtons] = useState(false);
  const onPauseCameraHandler = () => {
    const isPaused = !state.paused;
    if (!state.pausede) {
      setTimePicker(false);
    }
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
    selectedMeditation && setFlatlistHeight(meditationHeight);
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

    setTimeMeditation(setState({
      ...state,
      period: hours * 60 * 60 + minutes * 60,
    }))
    setTimePicker(false);
    setTimePickerButtons(false);

  }

  const closePopup = () => {
    if (!state.started) {
      bindeOnClose()
    } else {
      const close = !state.closePopup;
      setState({
        ...state,
        closePopup: close,

      });
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
        <BlurView style={[StyleSheet.absoluteFill, styles.blur]} />
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
        flatlistheight={flatlistheight}
        setFlatlistHeight={setFlatlistHeight}
        meditationHeight={meditationHeight}
        setmeditationheight={setmeditationheight}
      />
      <RightControls
        state={state}
        onClose={closePopup}
        onPauseCameraHandler={onPauseCameraHandler}
        onPauseVolumeHandler={onPauseVolumeHandler}
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
    resizeMode: 'cover',
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
