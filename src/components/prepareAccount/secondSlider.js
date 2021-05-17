import React from "react";
import { View } from "react-native";
import { connect } from 'react-redux';

import { AppService, StorageService } from '../../services';
import { useProfile } from '../../hooks';
import {
  setUser,
  setSettings,
  setIsLoggedIn,
} from '../../actions/app';

import {
  AppButton,
  AppContainer,
  AppMeditationTimeSelector,
} from '../../components/ui';

import { Grid } from '../../styles';


const SecondSlider = ({
  setUser,
  settings,
  setSettings,
  setIsLoggedIn,
}) => {
  const { data } = useProfile();
  const onChangeHandler = (value) => {
    setSettings({
      ...settings,
      reminder_time: [value],
    });
  };

  const goToAccount = async () => {
    await StorageService.setUserData(data?.user);
    setUser(data?.user);
    await AppService.initLanguage();
    setIsLoggedIn(true);
  }

  return (
    <AppContainer withBackground>
      <View style={[Grid.flex2, Grid.centeredY]}>
        <AppMeditationTimeSelector
          onChange={onChangeHandler}
        />
      </View>
      <View style={[Grid.flex1, Grid.flexEndY]}>
        <AppButton
          onPress={goToAccount}
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

const mapStateToProps = ({ app: settings }) => ({
  settings,
})

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setSettings: settings => dispatch(setSettings(settings)),
  setIsLoggedIn: isLoggedIn => dispatch(setIsLoggedIn(isLoggedIn)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondSlider);
