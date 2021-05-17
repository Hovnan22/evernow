import React, { useState } from 'react';
import { Alert } from 'react-native';
import i18n from 'i18n-js';

import { useForgotPassword } from '../../hooks';

import { AppContainer } from '../../components/ui';
import { RecoveryPasswordForm } from '../../components/forms';


const RecoveryPassword = ({ navigation }) => {
  const [errors, setErrors] = useState(null);
  const [onForgotPassword] = useForgotPassword();

  const onSubmitHandler = (variables) => {
    onForgotPassword({
      variables,
    }).then(({ data }) => {
      Alert.alert(i18n.t("screen.forgot.success"), JSON.stringify(data));
    }).catch((e) => {
      setErrors(e.message);
    });
  };

  return (
    <AppContainer
      withBackground
      navigation={navigation}
    >
      <RecoveryPasswordForm
        errors={errors}
        onSubmit={onSubmitHandler}
      />
    </AppContainer>
  );
}

export default RecoveryPassword;
