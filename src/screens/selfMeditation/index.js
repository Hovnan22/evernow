import React, {
  useState,
  useEffect,
} from "react";
import { Audio } from "expo-av";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { ReactNativeFile } from 'apollo-upload-client';

import { AppContainer } from '../../components/ui';
import { MeditationCamera } from '../../components/selfMeditation';
import { Grid } from '../../styles';
import sound from "../../../src/assets/sound.mp3";
import {useUploadImages} from "../../hooks";
import {useBuildTimelapse} from "../../hooks";

let intervalInstance = null;

const SelfMeditation = ({ navigation }) => {
  const [ratios, setRatios] = useState('4:3');
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type] = useState(Camera.Constants.Type.front);
  const soundObject = new Audio.Sound();
  const [lastShot, setLastShot] = useState();
  const [streamImagesArray, setStreamImagesArray] = useState();
  const [onUploadImages] = useUploadImages();

  soundObject.loadAsync(sound);

  const onStopHandler = async() => {
    if (intervalInstance) {
      clearInterval(intervalInstance);
    }
  };

  const onStartHandler = async () => {
    intervalInstance = setInterval(() => {
      if (camera) {
        let ph = [];
        camera.takePictureAsync().then(async (photo) => {
          console.log(photo,'photo')
          onUploadImageHandler(photo.uri);
          setStreamImagesArray(photo);
          setLastShot(photo);
        });
      }
    }, 5000);
  };

  const onPauseCameraHandler = (isPaused) => {
    if (isPaused) {
      if (camera) {
        camera.takePictureAsync().then((photo) => {
          setLastShot(photo);
          console.log(lastShot,'lastShot')
        });
      }
    } else {
      camera.resumePreview();
    }
  };
  const onUploadImageHandler = async (uri) => {
    const urlParams = uri;
    const name = urlParams.split('/')[urlParams.split('/').length - 1];
    const roomId = 7;
    const frameID = 7;

    try {
      const file = new ReactNativeFile({
        uri,
        name,
        type: "image/jpeg",
      });
      alert(1)
      console.log(file,'fileeeeee')
      const lol = await onUploadImages({ variables: { file, frameID, roomId,} });
      console.log(lol,'lollol')

    } catch (e) {
      console.log(e)
      alert("Error upload112233");
    }
  };

  const onBuildTimelaps = async (uri) => {
    const roomId = 5;
    console.log('onBuildTimelaps');

    try {
      const lol = await useBuildTimelapse({ variables: { roomId} });
      console.log(lol,'awaitonBuildTimelaps');
    } catch (e) {
      console.log(e.message)
      alert("Error upload", e.message);
    }
  };

  const onCameraReady = async () => {
    const ratiosArray = await camera.getSupportedRatiosAsync();
    setRatios(ratiosArray[ratiosArray.length - 1]);
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
        lastShot={lastShot}
        onStop={onStopHandler}
        onClose={() => {navigation.canGoBack() && navigation.goBack()} }>
        {hasPermission && isFocused
          && <Camera
            style={Grid.flex1}
            ratio={ratios}
            type={type}
            ref={(ref) => setCamera(ref)}
            onCameraReady={onCameraReady}
          />
        }
      </MeditationCamera>
    </AppContainer>
  );
};


export default SelfMeditation;
