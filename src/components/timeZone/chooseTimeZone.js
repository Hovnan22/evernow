import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { connect } from 'react-redux';
import moment from "moment-timezone";

import { StorageService } from '../../services';
import { useChangeTimeZone } from "../../hooks";
import {
  changeUserData,
  changeSetting
} from '../../actions/app';

import ListItem from './listItem';


const regions = [
  "Asia",
  "Europe",
  "America",
];

const searchSubString = (str, stack) => {
  for (let i = 0; i < stack.length; i++) {
    if (str.indexOf(stack[i]) !== -1) {
      return true;
    }
  }
  return false;
};



const ChooseTimeZone = ({
  navigation,
  changeSetting,
  changeUserData,
}) => {
  const timezones = moment.tz.names().filter(v => searchSubString(v, regions));

  const [onUpdateProfile] = useChangeTimeZone();
  const onChangeHandler = async (timezone) => {
    try {
      await onUpdateProfile({ variables: { timezone: `${timezone.title}` } });
      changeSetting({ timezone: timezone.title });
      changeUserData({ timezone: timezone.title });
      navigation.pop();
    } catch (e) {
      console.log({ e })
    }
  };


  return (
    <FlatList
      data={timezones}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => {
        const offset = moment().tz(item).format("Z");
        return (
          <ListItem
            item={{
              title: item,
              onPress: () => onChangeHandler({
                offset,
                title: item,
              })
            }}
          />
        );
      }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => null}
      ListEmptyComponent={() => null}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    borderWidth: 1,
    opacity: 0.2,
    borderColor: '#454F63',
  }
});

const mapDispatchToProps = dispatch => ({
  changeSetting: setting => dispatch(changeSetting(setting)),
  changeUserData: data => dispatch(changeUserData(data)),
});

export default connect(null, mapDispatchToProps)(ChooseTimeZone);

