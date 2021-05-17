import React from 'react';
import { ReactNativeFile } from 'apollo-upload-client';
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { StorageService } from '../../services';

import { useUploadFile } from '../../hooks';
import {
  setAuth,
  setUser,
  setIsLoggedIn,

} from '../../actions/app';
import { userSettings } from '../../constants';

import {
  ListItem,
  ChangeNameForm,
  ListHeaderComponent,
} from '../../components/settings';
import { AppContainer } from '../../components/ui';


const Settings = ({
  user,
  setUser,
  setAuth,
  navigation,
  setIsLoggedIn,
}) => {
  const [onUploadFile] = useUploadFile();

  const logout = async () => {

    setAuth({});
    setUser({});
    setIsLoggedIn(false);
    await StorageService.setAuthTokens({});
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

const mapStateToProps = ({ app: { user } }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  setAuth: auth => dispatch(setAuth(auth)),
  setUser: user => dispatch(setUser(user)),
  setIsLoggedIn: isLoggedIn => dispatch(setIsLoggedIn(isLoggedIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
