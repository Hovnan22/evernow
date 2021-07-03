import React, {
  useState,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
} from "react-native";

import { AppIcon } from '../ui';
import MeditationLists from "./meditationList";

const StreamWrapper = ({
  onMute,
  onClose,
  children,
}) => {
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onClose();
        return true;
      },
    );
  },[]);
  
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.wrapper}>
        <MeditationLists />
        <View style={styles.leftControl}>
          <View style={styles.head}>
            <TouchableOpacity onPress={onClose}>
              <AppIcon
                icon="close"
                width={24}
                height={24}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
          </View>
          <View style={styles.bottomControl}>
            <View style={styles.bottom, styles.muteButton}>
              <TouchableOpacity onPress={() => {
                onMute(!muted);
                setMuted(!muted);
              }}>
                <AppIcon
                  icon={muted ? "volume_off" : "volume_on"}
                  width={32}
                  height={32}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.bottom, styles.iconRownd}>
              <AppIcon
                icon={"logo"}
                width={32}
                height={32}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  muteButton: {
    padding: 5,
    paddingBottom: 20
  },
  iconRownd: {
    borderRadius: 20,
    padding: 5,
    backgroundColor: 'white',

  },
  container: {
    flex: 1,
    height: 100
  },
  content: {
    flex: 1,
  },
  wrapper: {
    padding: 16,
    paddingLeft: 0,
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  leftControl: {
    position: "absolute",
    right: 25,
    height: '100%',
  },
  bottomControl: {
    bottom: 40
  },
  head: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 56,
    top: 60,

  },
  bottom: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 56,
  },
});

export default StreamWrapper;
