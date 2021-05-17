import React, {
  useState,
  useContext,
} from 'react';
import { View } from 'react-native';

import {
  AppContainer,
  AppPrivacy,
} from '../../components/ui';
import { LoginForm } from '../../components/forms';

import { useLogin } from '../../hooks';
import AppContext, { setAuthorization } from '../../context/AppContext';

import { Grid } from '../../styles';


const Login = ({ navigation }) => {
  const [onLogin] = useLogin();
  const { dispatch } = useContext(AppContext);
  const [errors, setErrors] = useState(null);

  const onSubmitHandler = (variables) => {
    onLogin({ variables }).then(async (result) => {
      const { data: {
        signIn: {
          accessToken,
          refreshToken,
        }
      } } = result;
      dispatch(setAuthorization(accessToken.token, refreshToken.token));
      navigation.navigate("PrepareAccount");

    }).catch((e) => {
      setErrors(e.message);
    });
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
}

export default Login;
