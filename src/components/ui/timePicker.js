import React, { useState } from "react";
import {
  View,
  Picker,
  StyleSheet,
} from "react-native";
import i18n from "i18n-js";
import PropTypes from "prop-types";

import AppButton from './button';
import {
  Grid,
  Typography,
} from '../../styles';


const TimePicker = ({ onChange }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  return <View style={styles.selectTime}>
    <View style={[Grid.flex1, { flexDirection: "row" }]}>
      <View style={[Grid.flex1, Grid.centeredY]}>
        <Picker selectedValue={hours} onValueChange={(v) => setHours(v)}>
          {[0, 1, 2, 3, 4, 5].map((v, k) => (
            <Picker.Item
              label={`${v} ${i18n.t("common.hours")}`}
              value={v}
              key={k}
            />
          ))}
        </Picker>
      </View>
      <View style={[Grid.flex1, Grid.centeredY]}>
        <Picker selectedValue={minutes} onValueChange={(v) => setMinutes(v)}>
          {[0, 10, 15, 30, 45].map((v, k) => (
            <Picker.Item
              label={`${v} ${i18n.t("common.minutes")}`}
              value={v}
              key={k}
            />
          ))}
        </Picker>
      </View>
    </View>
    <View style={[Typography.p2]}>
      <AppButton
        type="gradient"
        title={"common.save"}
        onPress={() => onChange(hours, minutes)}
      />
    </View>
  </View>;
}

TimePicker.propTypes = {
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  selectTime: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    width: "100%",
    height: 300,
    zIndex: 100,
  },
});

export default TimePicker;
