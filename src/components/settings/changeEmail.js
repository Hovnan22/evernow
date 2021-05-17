import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import i18n from 'i18n-js';
import { AppContext } from '../../context';
import { useProfile } from '../../hooks';

import {
  AppCard,
  AppInput,
  AppButton,
} from '../ui';
import { Grid } from '../../styles';


const ChangeEmailForm = ({
  errors,
}) => {
  const { app: { auth } } = useContext(AppContext);
  const { data = {} } = useProfile(auth.accessToken);

  const [state, setState] = useState({ email: data?.user.emails?.active });
  const [error, setError] = useState(null);

  const onSubmitHandler = () => {
    // to do
  };

  const onValidate = () => {
    if (!state.email || state.email.length < 1) {
      setError(i18n.t("errors.emailInputIsEmpty"));
      return;
    }
    onSubmitHandler(state);
    setError(null);
  };

  return (
    <>
      <View style={[Grid.flex2, Grid.centeredY]}>
        <AppCard
          type2
          label="screen.changeEmail.title"
        >
          <AppInput
            showShadows={false}
            value={state.email}
            returnKeyType="done"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            placeholder={i18n.t("form.email")}
            onChangeText={(email) => setState({ ...state, email })}
            onSubmitEditing={onSubmitHandler}
          />
        </AppCard>
      </View>
      <View style={[Grid.flex1, Grid.flexEndY]}>
        {error
          && <Text style={[styles.message]}>
            {typeof error === "object" ? Object.keys(errors).map((k) => errors[k]) : error}
          </Text>
        }
        <AppButton
          onPress={onValidate}
          title={"screen.changeEmail.submit"}
          type={"flat"}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  message: {
    color: "#FFF",
    paddingBottom: 16,
    textAlign: "center",
  },
});

export default ChangeEmailForm;
