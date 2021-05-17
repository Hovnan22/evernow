import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { AppIcon } from '../ui';

const StreamWrapper = ({
  onMute,
  onClose,
  children,
}) => {
  const [muted, setMuted] = useState(false);
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.wrapper}>
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
        <View style={styles.bottom}>
          <TouchableOpacity onPress={() => {
            onMute(!muted);
            setMuted(!muted);
          }}>
            <AppIcon
              icon={muted ? "volume_off" : "volume_on"}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <AppIcon
            icon={"logo"}
            width={24}
            height={24}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  wrapper: {
    padding: 16,
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  head: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 56,
  },
  bottom: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 56,
  },
});

export default StreamWrapper;
