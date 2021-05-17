import React, { useContext } from 'react';
import { ReactNativeFile } from 'apollo-upload-client';
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';

import AppContext, { setAuthorization } from '../../context/AppContext';
import {
  useProfile,
  useUploadFile,
} from '../../hooks';
import { userSettings } from '../../constants';

import {
  ListItem,
  ChangeNameForm,
  ListHeaderComponent,
} from '../../components/settings';
import { AppContainer } from '../../components/ui';


export default function Settings({ navigation }) {
  const { app: { auth }, dispatch } = useContext(AppContext);
  const { data = {} } = useProfile(auth.accessToken);
  const [onUploadFile] = useUploadFile(auth.accessToken);
  const { user = {} } = data;

  const logout = () => {
    dispatch(setAuthorization(false, false));
  };

  const onChangeImageHandler = async (uri) => {
    const file = new ReactNativeFile({
      uri,
      name: "avatar.jpg",
      type: "image/jpeg",
    });
    try {
      await onUploadFile({ variables: { file } });
    } catch (e) {
      Alert.alert("Error upload", e.message);
    }
  };

  return (
    <AppContainer navigation={navigation}>
      <FlatList
        data={userSettings(navigation)}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <ListHeaderComponent
            label={user?.emails?.active}
            image={user.avatarUrl}
            onPress={() => navigation.navigate("SettingPage", {
              children: <ChangeNameForm navigation={navigation} />,
              withBackground: true,
              noPadding: false,
            })}
            onChangeImage={onChangeImageHandler}
          />
        )}
        renderItem={({ item }) => <ListItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => (
          <>
            <View style={styles.separator} />
            <ListItem item={{ title: "screen.settings.logout", onPress: logout }} />
          </>
        )}
      />
    </AppContainer>
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
