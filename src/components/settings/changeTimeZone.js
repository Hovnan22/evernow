import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import {
  AppButton,
  AppCard,
  AppIcon,
} from '../ui';
import { ChooseTimeZone } from '../timeZone';

import {
  Grid,
  Form,
} from '../../styles';

const ChangeTimeZone = ({
  user,
  navigation,
}) => {
  return (
    <>
      <View style={[Grid.flex2, Grid.centeredY]}>
        <AppCard
          type2
          label="screen.changeTimeZone.title"
        >
          <TouchableOpacity
            style={[Form.input]}
            onPress={() => navigation.navigate("SettingPage", {
              children: <ChooseTimeZone navigation={navigation} />,
              withBackground: false,
              noPadding: true,
            })}
          >
            <Text>{user.timezone}</Text>
            <AppIcon
              icon="down"
              width={12}
              height={12}
            />
          </TouchableOpacity>
        </AppCard>
      </View>
      <View style={[Grid.flex1, Grid.flexEndY]}>
        <AppButton
          onPress={() => navigation.goBack()}
          title={"screen.changeTimeZone.submit"}
          type={"flat"}
        />
      </View>
    </>
  );
};

const mapStateToProps = ({ app: { user } }) => ({
  user,
})

export default connect(mapStateToProps)(ChangeTimeZone);
