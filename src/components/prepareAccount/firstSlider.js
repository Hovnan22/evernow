import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from 'react-redux';

import {
  AppCard,
  AppIcon,
  AppButton,
  AppContainer,
} from '../../components/ui';
import { ChooseTimeZone } from '../../components/timeZone';

import {
  Grid,
  Form,
} from '../../styles';

const FirstSlider = ({
  user,
  settings,
  navigation,
}) => {
  console.log(user,'user.timezone')
  return (
    <AppContainer withBackground>
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
            <Text>{user.timezone || settings.timezone}</Text>
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
          onPress={() => navigation.navigate("SecondSlider")}
          title={"screen.changeTimeZone.submit"}
          type={"flat"}
        />
      </View>
    </AppContainer>
  );
};

const mapStateToProps = ({ app: { settings, user } }) => ({
  user,
  settings,
});

export default connect(mapStateToProps)(FirstSlider);
