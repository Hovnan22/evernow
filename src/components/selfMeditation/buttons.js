import React from "react";
import { TouchableOpacity } from "react-native";

import { AppIcon } from '../ui';

const Buttons = ({
  icon,
  style,
  onPress,
  width,
  height,
  pressDuration,
}) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      pressDuration={pressDuration ? pressDuration : 0.3}
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