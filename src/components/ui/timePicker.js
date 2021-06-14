import React, { useState } from "react";
import {
  View,
  Picker,
  StyleSheet,
} from "react-native";
import i18n from "i18n-js";

import {
  Grid,
  Typography,
} from '../../styles';
import {
  AppButton,
} from ".";

const TimePicker = ({
  onChange,
  onCancel,
  hoursArr,
  minutesArr,
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  return (
    <View style={styles.selectTime}>
      <View style={styles.selectTimePicker}>
        <View style={[Grid.flex1, { flexDirection: "row" }]}>
          <View style={[Grid.flex1, Grid.centeredY]}>
            <Picker selectedValue={hours} onValueChange={(v) => setHours(v)}>
              {hoursArr.map((v, k) => (
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
              {minutesArr.map((v, k) => (
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
            style={styles.timeButton}
            type="gradient"
            title={"screen.cancelTimeButton.submit"}
            onPress={() => onCancel()}
            type={"transparent"}
            color="#eb354a"
          />
          <AppButton
            style={styles.timeButton}
            type="gradient"
            title={"screen.setTimeButton.submit"}
            onPress={() => onChange(hours, minutes, true)}
            type={"transparent"}
            color="#268bd5"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectTimeDuration: {},
  timeButtons: {

  },
  chooserLayer: {
    backgroundColor: "rgba(0, 129, 218,0.6)",
    width: '100%',
    height: '100%',
    justifyContent: "center"
  },
  timeButton: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, .1)",
    borderRadius: 0,
    margin: 0,
    marginHorizontal: 0,
    marginVertical: 0,

  },
  selectTimePicker: {
    backgroundColor: "rgba(255, 255, 255,1)",
    width: '80%',
    position: "absolute",
    zIndex: 200,
    borderRadius: 30,
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: '10%',
    paddingHorizontal: 25,
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: "space-around",
    paddingTop: 20,
    alignItems: 'center'
  },
  selectTime: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: '100%',
    zIndex: 6,
    justifyContent: 'center',
  },
  timePickerButton: {
    backgroundColor: "rgba(255, 255, 255, .3)",
    borderRadius: 30,

  },
  container: {
    width: 180,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  }
});

export default TimePicker;
