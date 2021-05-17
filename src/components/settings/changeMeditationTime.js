import React, {
  useState,
  useContext,
} from 'react';
import { View } from 'react-native';
import moment from 'moment';

import {
  useProfile,
  useChangeMeditationAt,
} from '../../hooks';
import { AppContext } from '../../context';

import {
  AppButton,
  AppMeditationTimeSelector,
} from '../ui';

import { Grid } from '../../styles';

const ChangeMeditationTime = ({ navigation }) => {
  const { app: { auth } } = useContext(AppContext);
  const [value, setValue] = useState(null);
  const { data: { user }, refetch } = useProfile(auth.accessToken);
  const [onMeditationAt] = useChangeMeditationAt(auth.accessToken);
  const onChangeHandler = (meditationAt) => {
    setValue(meditationAt);
  };
  const onSaveHandler = () => {
    if (value) {
      const options = {
        variables: {
          meditationAt: value.format("HH:mm:ss"),
        },
      };
      onMeditationAt(options).then(() => {
        refetch().then(() => {
          navigation.goBack();
        });
      });
    }
  };
  return (
    <>
      <View style={[Grid.flex2, Grid.centeredY]}>
        <AppMeditationTimeSelector
          val={moment(user.meditationAt, "HH:mm:ss")}
          onChange={onChangeHandler}
        />
      </View>
      <View style={[Grid.flex1, Grid.flexEndY]}>
        <AppButton
          onPress={onSaveHandler}
          title={"screen.changeMeditationTime.submit"}
          type={"flat"}
        />
      </View>
    </>
  );
}

export default ChangeMeditationTime;
