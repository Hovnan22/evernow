import React, { useState } from 'react';
import {
  View,
  Alert,
} from 'react-native';
import i18n from 'i18n-js';

import { useRegister } from '../../hooks';

import { AppContainer, AppPrivacy } from '../../components/ui';
import { RegisterForm } from '../../components/forms';

import { Grid } from '../../styles';

const Register = ({ navigation }) => {
  const [errors, setErrors] = useState(null);
  const [onRegister] = useRegister();

  const onSubmitHandler = (variables) => {
    onRegister({ variables }).then(({ data }) => {
      Alert.alert(i18n.t("screen.register.success"), JSON.stringify(data));
    }).catch((e) => {
      setErrors(e.message);
    });
  };

  return (
    <AppContainer
      withBackground
      navigation={navigation}
    >
      <RegisterForm
        onSubmit={onSubmitHandler}
        navigation={navigation}
        errors={errors}
      />
      <View style={[Grid.centeredX]}>
        <AppPrivacy />
      </View>
    </AppContainer>
  );
}

export default Register;
