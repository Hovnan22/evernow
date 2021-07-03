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
import { useUploadImages } from "../../hooks";
import { useBuildTimelapse } from "../../hooks";
import { useProfile } from '../../hooks';


let intervalInstance = null;
let frameID = 0;
const SelfMeditation = ({ navigation }) => {
  const [ratios, setRatios] = useState('4:3');
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type] = useState(Camera.Constants.Type.front);
  const soundObject = new Audio.Sound();
  const [lastShot, setLastShot] = useState();
  const [onUploadImages, { data, loading }] = useUploadImages();
  const profileData = useProfile();
  const [pouseCamera, setPouseCamera] = useState(false);
  soundObject.loadAsync(sound);

  const onStopHandler = async () => {
    onBuildTimelaps()
    if (intervalInstance) {
      clearInterval(intervalInstance);
    }
  };

  const onStartHandler = async () => {
    !pouseCamera ? intervalInstance = setInterval(() => {
      if (camera) {
        let ph = [];
        camera.takePictureAsync().then(async (photo) => {
          onUploadImageHandler(photo.uri);
          setLastShot(photo);
        });
      }
    }, 5000) : false;
  };

  const onPauseCameraHandler = (isPaused) => {
    setPouseCamera(isPaused);
    if (isPaused) {
      if (camera) {
        camera.takePictureAsync().then((photo) => {
          setLastShot(photo);
        });
      }
    } else {
      camera.resumePreview();
    }
  };

  const onUploadImageHandler = async (uri) => {
    const urlParams = uri;
    const name = urlParams.split('/')[urlParams.split('/').length - 1];
    const roomId = profileData.data.user.room.id;
    const file = new FormData();
    file.append('uri', uri, "image/jpeg");
    file.append('name', name);

    const variables = { frame: file, frameNumber: frameID, roomId: roomId };

    try {
      const lol = await onUploadImages({ variables: variables });
    } catch (e) {
      // alert("Error upload");
    }
    frameID = frameID++;

  };

  const onBuildTimelaps = async (uri) => {
    const roomId = parseInt(profileData.data.user.room.id);

    try {
      await useBuildTimelapse({ variables: { roomId } });
    } catch (e) {
      console.log(e)
      // alert("Error upload", e.message);
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
        onClose={() => { navigation.canGoBack() && navigation.goBack() }}>
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
