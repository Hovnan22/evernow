import React from "react";
import { TouchableOpacity } from "react-native";

import { AppIcon } from '../ui';

const Buttons = ({
  icon,
  style,
  onPress,
  width,
  height,
}) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
    >
      <AppIcon
        icon={icon}
        width={width || 26}
        height={height || 26}
      />
    </TouchableOpacity>
  );
}

export default Buttons;