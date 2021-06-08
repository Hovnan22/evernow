import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import CameraButton from './buttons';


const Camera = ({
  state,
  onClose,
  onPauseCameraHandler,
  onPauseVolumeHandler,
}) => (
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
    </View>
  </View>
);

const styles = StyleSheet.create({
  rightControls: {
    position: "absolute",
    right: 15,
    top: 30,
    bottom: 0,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 36,
    zIndex: 6,
  },
});

export default Camera;