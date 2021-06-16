import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import CameraButton from './buttons';


const Camera = ({
  onClose,
  isFinishRecording,
  onPauseCameraHandler,
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
    {!isFinishRecording && (
      <View>
        <CameraButton
          icon="camera"
          pressDuration={5000}
          onPress={onPauseCameraHandler}
          width={40}
          height={40}
        />
      </View>
    )}
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