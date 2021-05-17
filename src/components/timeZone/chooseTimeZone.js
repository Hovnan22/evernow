import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import moment from 'moment';


import {
  useProfile,
  useChangeTimeZone,
} from "../../hooks";
import { AppContext } from "../../context";

import { ListItem } from './';


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


const ChooseTimeZone = ({ navigation }) => {
  const { app: { auth } } = useContext(AppContext);
  const [onUpdateProfile] = useChangeTimeZone(auth.accessToken);
  const { refetch } = useProfile(auth.accessToken);

  const onChangeHandler = (timezone) => {
    onUpdateProfile({ variables: { timezone: `${timezone.title}` } }).then(() => {
      refetch().then(() => {
        navigation.goBack();
      });
    });
  };

  const timezones = moment.tz.names().filter(v => searchSubString(v, regions));

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
})

export default ChooseTimeZone;

