import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';


import { useProfile } from '../../hooks';
import { AppContext } from '../../context';

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

const ChangeTimeZone = ({ navigation }) => {
  const { app: { auth } } = useContext(AppContext);
  const { data: { user } } = useProfile(auth.accessToken);
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
}

export default ChangeTimeZone;
