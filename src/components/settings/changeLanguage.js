import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { Store } from '../../config';

import { changeUserData } from '../../actions/app';
import { useChangeLanguage } from '../../hooks';

import { AppService } from '../../services';

import ListItem from './listItem';


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


const ChooseLanguage = ({
  navigation,
  changeUserData,
}) => {
  const [onSettings] = useChangeLanguage();
  const onChangeHandler = (language) => {
    onSettings({ variables: { language } }).then(async () => {
      changeUserData({ language });
      await AppService.initLanguage();

      navigation.pop();
    }).catch(e => {
      console.log({ e });
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
};

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    borderWidth: 1,
    opacity: 0.2,
    borderColor: '#454F63',
  },
});

const mapDispatchToProps = dispatch => ({
  changeUserData: data => dispatch(changeUserData(data)),
})

export default connect(null, mapDispatchToProps)(ChooseLanguage);

