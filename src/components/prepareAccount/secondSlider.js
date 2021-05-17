import React, { useContext } from "react";
import { View } from "react-native";

import AppContext, { setSettings } from "../../context/AppContext";

import {
  AppButton,
  AppContainer,
  AppMeditationTimeSelector,
} from '../../components/ui';

import { Grid } from '../../styles';


const SecondSlider = ({ navigation }) => {
  const { app, dispatch } = useContext(AppContext);
  const onChangeHandler = (value) => {
    dispatch(setSettings({
      reminder_time: [value],
    }));
  };

  return (
    <AppContainer withBackground>
      <View style={[Grid.flex2, Grid.centeredY]}>
        <AppMeditationTimeSelector
          value={app.settings.reminder_time}
          onChange={onChangeHandler}
        />
      </View>
      <View style={[Grid.flex1, Grid.flexEndY]}>
        <AppButton
          onPress={() => navigation.navigate("Account")}
          title={"screen.prepareAccount.next"}
          type={"flat"}
        />
        <AppButton
          title={"screen.prepareAccount.selfMeditation"}
          type={"transparent"}
        />
      </View>
    </AppContainer>
  );
}

export default SecondSlider;
