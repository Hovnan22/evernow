import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { StorageService, AppService } from '../../services';

import {
  useLogin,
  useProfile,
} from '../../hooks';
import { setAuth } from '../../actions/app';

import {
  AppContainer,
  AppPrivacy,
} from '../../components/ui';
import { LoginForm } from '../../components/forms';

import { Grid } from '../../styles';


const Login = ({
  setAuth,
  navigation,
}) => {
  const [onLogin] = useLogin();
  const [errors, setErrors] = useState(null);

  const onSubmitHandler = async (variables) => {
    try {
      const { data: {
        signIn: {
          accessToken,
          refreshToken,
        }
      } } = await onLogin({ variables });
      const authTokens = {
        accessToken: accessToken.token,
        refreshToken: refreshToken.token,
      }
      setAuth(authTokens);
      await StorageService.setAuthTokens(authTokens);
      await AppService.initLanguage();
      navigation.navigate("PrepareAccount");
    } catch (e) {
      console.warn(e, typeof e,);
      setErrors(e.message);
    }
  };

  return (
    <AppContainer
      withBackground
      navigation={navigation}
    >
      <View style={Grid.flex1}>
        <LoginForm
          onSubmit={onSubmitHandler}
          navigation={navigation}
          errors={errors}
        />
        <View style={[Grid.centeredX]}>
          <AppPrivacy />
        </View>
      </View>
    </AppContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  setAuth: auth => dispatch(setAuth(auth)),
})

export default connect(null, mapDispatchToProps)(Login);
