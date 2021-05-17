import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import moment from 'moment';

import {
  useProfile,
  useRefreshBuddy,
} from '../../hooks';
import { AppContext } from '../../context';

import {
  AppCard,
  AppText,
  AppButton,
  AppContainer,
  AppGaugeChart,
} from '../../components/ui';
import { MainTexts } from '../../components/home';

import {
  Grid,
  Typography,
} from '../../styles';


const Home = ({ navigation }) => {
  const { app: { auth } } = useContext(AppContext);
  const { data = {} } = useProfile(auth.accessToken);
  const [onRefreshBuddy] = useRefreshBuddy(auth.accessToken);
  const { user = {} } = data;

  const getSecondsToMeditation = (time) => {
    const date = new Date();
    const currentTimestamp = moment(`${date.getHours()}:${date.getMinutes()}`, "hh:mm");
    const meditationTime = moment(time, "hh:mm:ss");
    if (currentTimestamp.isAfter(meditationTime)) {
      meditationTime.add(1, "days");
    }
    return meditationTime.unix() - currentTimestamp.unix();
  };
  const onSearchBuddyHandler = () => {
    onRefreshBuddy().then((r) => {
      console.log(r);
    });
  };
  const startTime = getSecondsToMeditation(user?.meditationAt) || 0;

  return (
    <AppContainer
      withBackground
      backgroundType="upper"
    >
      <View style={[Grid.flex2, Grid.centeredY]}>
        <AppCard
          type3
          showLoader={!user?.room}
        >
          <View style={[Grid.centeredX, Grid.centeredY, styles.container]}>
            <Text style={[Typography.textNormal, Typography.textBold]}>
              <AppText>{"screen.home.meditateStarts"}</AppText>
                       &nbsp;{user?.meditationAt}
            </Text>
            <AppGaugeChart
              size={248}
              endTime={0}
              textSize={32}
              started={true}
              borderWidth={4}
              startTime={startTime}
            >
              <AppText style={[Typography.textNormal, Typography.smallText]}>{"common.over"}</AppText>
            </AppGaugeChart>
            <MainTexts
              user={user}
              startTime={startTime}
            />
          </View>
        </AppCard>
        <View style={[Grid.centeredY]}>
          <AppButton
            onPress={!user?.room ? onSearchBuddyHandler : () => navigation.navigate("Meditation")}
            title={!user?.room ? "screen.home.searchBuddy" : "screen.home.connect"}
            type={"gradient"}
          />
        </View>
      </View>
    </AppContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 100,
  },
});

export default Home;
