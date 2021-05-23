import React, {
  useState,
  useEffect,
} from "react";
import { Audio } from "expo-av";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

import { AppContainer } from '../../components/ui';
import { MeditationCamera } from '../../components/selfMeditation';

import { Grid } from '../../styles';

import sound from "../../../src/assets/sound.mp3";
// import  FaceDetector from 'expo-face-detector';

let intervalInstance = null;

const SelfMeditation = ({ navigation }) => {
  const [ratios,setRatios] = useState('4:3');
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type] = useState(Camera.Constants.Type.front);
  const soundObject = new Audio.Sound();

  soundObject.loadAsync(sound);

  const onStopHandler = () => {
    if (intervalInstance) {
      clearInterval(intervalInstance);
    }
  };

  const onStartHandler = () => {
    intervalInstance = setInterval(() => {
      if (camera) {
        camera.takePictureAsync().then((photo) => {
          console.log(photo);
        });
      }
    }, 1000);
  };

  const onMuteHandler = (status) => {
    (async () => {
      try {
        if (status === true) {
          await soundObject.playAsync();
        } else {
          await soundObject.stopAsync();
        }
      } catch (error) {
        // An error occurred!
      }
    })();
  };

  const onPauseCameraHandler = (isPaused) => {
    if (isPaused) {
      camera.pausePreview();
    } else {
      camera.resumePreview();
    }
  };

  const  onCameraReady = async () => {
    const ratiosArray =  await camera.getSupportedRatiosAsync();
    console.log(ratiosArray,'ratiosArray')
    setRatios( ratiosArray[ratiosArray.length - 1]);
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");


    })();
  }, []);



  return (
    <AppContainer
      type2
      noPadding
    >
      <MeditationCamera
        onPauseCamera={onPauseCameraHandler}
        onStart={onStartHandler}
        onStop={onStopHandler}
        onMute={onMuteHandler}
        onClose={() => navigation.goBack()}>
        {hasPermission && isFocused
          && <Camera
            style={Grid.flex1}
            ratio={ratios}
            type={type}
            ref={(ref) => setCamera(ref)}
            onCameraReady= {onCameraReady}
            // autoFocus={Camera.Constants.AutoFocus.off}
            // whiteBalance={Camera.Constants.WhiteBalance.auto}
            // pictureSize="200:300"


          />
        }
      </MeditationCamera>
    </AppContainer>
  );
}

export default SelfMeditation;
