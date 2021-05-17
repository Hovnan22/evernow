import React from "react";
import { Text as BaseText } from "react-native";
import i18n from "i18n-js";


const Text = ({
  style,
  children,
}) => (
  <BaseText style={style}>
    {i18n.t(children)}
  </BaseText>
)

export default Text;