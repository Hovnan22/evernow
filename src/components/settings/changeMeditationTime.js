import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { useChangeMeditationAt } from '../../hooks';
import { changeUserData } from '../../actions/app';

import {
  AppButton,
  AppMeditationTimeSelector,
} from '../ui';

import { Grid } from '../../styles';

const ChangeMeditationTime = ({
  user,
  navigation,
  changeUserData,
}) => {
  const [value, setValue] = useState(null);
  const [onMeditationAt] = useChangeMeditationAt();

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
        changeUserData({
          meditationAt: value.format("HH:mm:ss"),
        })
        navigation.goBack();
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
};

const mapStateToProps = ({ app: { user } }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  changeUserData: data => dispatch(changeUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMeditationTime);
