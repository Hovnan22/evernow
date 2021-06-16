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

  soundObject.loadAsync(sound);

  const onStopHandler = () => {
    if (intervalInstance) {
      clearInterval(intervalInstance);
    }
  };

  const onStartHandler = () => {
    intervalInstance = setInterval(() => {
      if (camera) {
        let ph = [];
        camera.takePictureAsync().then((photo) => {
          setStreamImagesArray(photo)
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
