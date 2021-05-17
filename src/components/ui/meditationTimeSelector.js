import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import moment from "moment";
import { Slider } from "react-native-elements";

import { AppCard } from './';
import { Grid } from '../../styles';


const styles = StyleSheet.create({
  thumb: {
    backgroundColor: "#5596D9",
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: "#EDF2FF",
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#005189",
  },
  bold: {
    fontWeight: "bold",
  },
});

const MeditationTimeSelector = ({ onChange, val }) => {
  const [value, setValue] = useState(val instanceof moment ? val.hours() : 6);
  const date = moment().utcOffset(0).startOf("day");

  const onChangeHandler = (v) => {
    const offset = Math.floor(v * 14) + 6;
    const res = date.clone().add(offset, "hours");
    const newValue = res.hours();
    if (value !== newValue) {
      onChange(res);
    }
    setValue(newValue);
  };

  return (
    <AppCard
      type2
      label={"screen.prepareAccount.slideSecondLabel"}
    >
      <View style={[Grid.col, Grid.centeredY, { alignItems: "stretch" }]}>
        <View style={styles.heading}>
          <Text style={styles.text}>Утро</Text>
          <Text style={styles.text}>Вечер</Text>
        </View>
        <Slider
          thumbTintColor={"#EDF2FF"}
          minimumTrackTintColor="#EDF2FF"
          maximumTrackTintColor="#EDF2FF"
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          value={value ? (value - 6) / 14 : 0.0}
          onValueChange={onChangeHandler}
        />
        <View style={styles.footer}>
          <Text style={[styles.text, styles.bold]}>06:00</Text>
          <Text style={[styles.text, styles.bold]}>20:00</Text>
        </View>
      </View>
    </AppCard>
  );
}

export default MeditationTimeSelector;
