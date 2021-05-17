import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { StorageService } from '../../services';

import {
  useProfile,
  useRefreshBuddy,
} from '../../hooks';
import {
  setUser,
  changeSetting,
} from '../../actions/app';

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


const Home = ({
  user,
  setUser,
  navigation,
  changeSetting,
}) => {
  const { data } = useProfile();
  const [onRefreshBuddy] = useRefreshBuddy();

  // useEffect(() => {
  //   setUser({ ...(data?.user || {}) })
  // }, [data])

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
      changeSetting({ timezone: data.user.timezone, locale: data.user.language })
      StorageService.setUserData(data?.user);
      StorageService.setSettingsData({ timezone: data.user.timezone, locale: data.user.language })
    }

  }, [data])
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

const mapStateToProps = ({ app: { user, settings } }) => ({
  user,
  settings
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  changeSetting: setting => dispatch(changeSetting(setting)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
