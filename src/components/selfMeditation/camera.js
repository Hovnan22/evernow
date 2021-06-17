import React, {
  useState,
  useEffect,
} from "react";
import {
  View,
  Image,
  StyleSheet,
} from "react-native";
import Share from 'react-native-share';
import PropTypes from "prop-types";

import Start from './start';
import LeftControls from './leftControls';
import RightControls from './rightControls';
import {
  AppTimePicker,
  AppClosePopup,
} from '../ui';

import { Grid } from '../../styles';
import TimeButtons from "./timeButtons";
import FinishMeditation from "./finishMeditation";
import DiscussionPopup from './discussionAlert';

const Camera = ({
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
    period: 7,
    closePopup: false,
    hideMeditation: false,
    blurValue: 5,
  });
  const [timePicker, setTimePicker] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [timePickerChooser, setTimePickerChooser] = useState(false);
  const [timePickerButtons, setTimePickerButtons] = useState(false);
  const [isFinishRecording, setIsFinishRecording] = useState(false);
  const [recordingWithCamera, setRecordingWithCamera] = useState(false);
  const [recordingPeriod, setRecordingPeriod] = useState(0);
  const hoursArr = [0, 1, 2];
  const minutesArr = [];

  for (let i = 0; i < 12; i++) {
    minutesArr.push(i * 5);
  }

  useEffect(() => {
    console.log(state.period, 'state.period')
  }, [state.period])

  const onPauseCameraHandler = () => {
    const isPaused = !state.paused;
    if (!state.pausede) {
      setTimePicker(false);
    }
    const blurNewVal = recordingWithCamera ? 2 : 5;
    state.paused && state.started && onStart();
    !state.paused && state.started && onStop();
    setState({
      ...state,
      paused: isPaused,
      blurValue: blurNewVal,
      hideMeditation: isPaused ? true : false,
    });
    if (onPauseCamera !== undefined) {
      onPauseCamera(isPaused);
    }
  };

  const onShare = async () => {
    const options = {
      message: 'meditation',
      url: 'https://mediacdn.cincopa.com/v2/230743/26530!kU4AAAAAAAwSDB/2/cdv_photo_001.jpg'
    }
    const shareResponse = await Share.open(options);

  };

  const onShareInstagram = async () => {
    const shareOptions = {
      message: 'meditation',
      url: 'https://mediacdn.cincopa.com/v2/230743/26530!kU4AAAAAAAwSDB/2/cdv_photo_001.jpg',
      social: Share.Social.INSTAGRAM
    };
    Share.shareSingle(shareOptions);
  }

  const showMeditation = () => {
    const hideMeditation = !state.hideMeditation;
    setState({
      ...state,
      hideMeditation: hideMeditation
    });
  };

  const onHideMeditation = () => {
    setState({
      ...state,
      hideMeditation: true,
    })
  };

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
  };

  const closePopup = () => {
    if (!state.started) {
      bindeOnClose();
    } else {
      const close = !state.closePopup;
      setState({
        ...state,
        closePopup: close,
      });

      if (!close && !isFinishRecording) {
        onStart()
      }

    }
  };

  const finishRecording = (recordingPeriod) => {
    setState({
      ...state,
      started: false,
    })
    setIsFinishRecording(true);
    console.log(state.paused, 'state.paused')
    !state.paused && onPauseCameraHandler();
    setRecordingPeriod(recordingPeriod);
    if (recordingPeriod > 5) {
      setRecordingWithCamera(true);
    } else {
      setRecordingWithCamera(false);
    }
  };

  const onStartHandler = () => {
    if (!state.started) {
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
    setIsFinishRecording(false);
    setSelectedMeditation(null);
    setTimePickerChooser(false);
  };

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
  };

  return (
    <View style={styles.container}>
      {state.paused && (
        <View style={[StyleSheet.absoluteFill, recordingWithCamera ? styles.slowBlur : styles.blur]} >
          <View style={recordingWithCamera ? styles.slowBlur : styles.blur} />
          <Image
            source={{ uri: lastShot && lastShot.uri }}
            style={{ width: '100%', height: '100%', zIndex: 3 }}
            resizeMode='cover'
            blurRadius={state.blurValue}
          />
        </View>
      )}
      {!isFinishRecording ? state.closePopup && (
        <AppClosePopup
          onClose={bindeOnClose}
          closePopup={closePopup}
        />
      ) : state.closePopup && (
        <DiscussionPopup
          newStyles={styles.finishedClose}
          press1={bindeOnClose}
          press2={onShare}
          text1={"screen.closeButtonConfirm.submit"}
          text2={"screen.shareButton.submit"}
          colore1={'#eb354a'}
          colore2={'#6eb6ef'}
          messageHeader={"Are you sure you want to close the time lapse? "}
          message={"If you have not yet shared or downloaded it, then do it, since after closing it will be unavailable"}
        />
      )}
      <LeftControls
        state={state}
        onStop={onStop}
        timePicker={timePicker}
        showMeditation={showMeditation}
        finishRecording={finishRecording}
        onHideMeditation={onHideMeditation}
        timePickerButtons={timePickerButtons}
        isFinishRecording={isFinishRecording}
        timePickerHandler={timePickerHandler}
        selectedMeditation={selectedMeditation}
        setSelectedMeditation={setSelectedMeditation}
      />
      {isFinishRecording && !state.closePopup && (
        <FinishMeditation
          recordingPeriod={recordingPeriod}
          recordingWithCamera={recordingWithCamera}
          onShare={onShare}
          onShareInstagram={onShareInstagram}
        />
      )}
      <RightControls
        state={state}
        onClose={closePopup}
        isFinishRecording={isFinishRecording}
        onPauseCameraHandler={onPauseCameraHandler}
      />
      <View style={styles.content}>
        {children}
      </View>
      {onStart && !state.closePopup && !isFinishRecording && (
        <Start
          state={state}
          onPress={onStartHandler}
        />
      )}
      {timePickerButtons && (
        <TimeButtons
          setTimePickerButtons={setTimePickerButtons}
          onChange={setMeditationTime}
          more={() => setTimePicker(!timePicker)}
        />)}
      {timePicker && !state.closePopup && (
        <AppTimePicker
          hoursArr={hoursArr}
          minutesArr={minutesArr}
          onChange={setMeditationTime}
          setTimePicker={setTimePicker}
          timePickerChooser={timePickerChooser}
          onCancel={() => setTimePicker(false)}
          setTimePickerChooser={setTimePickerChooser}
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
  finishedClose: {
    position: 'absolute',
    // top: '50%',
    height: '100%',
    backgroundColor: "rgba(0, 129, 218, 0.5)"
    // transform: [{ translateY: '-50%'}]
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
  slowBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 4,
    backgroundColor: "rgba(0, 129, 218, 0.2)",
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
