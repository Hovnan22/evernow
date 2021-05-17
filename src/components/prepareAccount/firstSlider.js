import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import AppContext from "../../context/AppContext";

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

const FirstSlider = ({ navigation }) => {
  const { app } = useContext(AppContext);
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
            <Text>{app.settings.timezone}</Text>
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

export default FirstSlider;
