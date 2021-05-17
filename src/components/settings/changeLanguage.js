import React, { useContext } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useChangeLanguage } from '../../hooks';

import { AppContext } from '../../context';

import { ListItem } from './';


const languages = [
  {
    title: "languages.russian",
    value: "ru",
  },
  {
    title: "languages.english",
    value: 'en',
  }
];


const ChooseLanguage = ({ navigation }) => {
  const { app: { auth } } = useContext(AppContext);
  const [onSettings] = useChangeLanguage(auth.accessToken);
  const onChangeHandler = (language) => {
    onSettings({ variables: { language } }).then(() => {
      navigation.goBack();
    });
  };

  return (
    <FlatList
      data={languages}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => {
        return (
          <ListItem
            item={{
              title: item.title,
              onPress: () => onChangeHandler(item.value)
            }}
          />
        );
      }}
      showsVerticalScrollIndicator={false}
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

export default ChooseLanguage;

