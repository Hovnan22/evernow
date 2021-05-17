import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import i18n from 'i18n-js';
import { useChangePassword } from '../../hooks';

import {
  AppCard,
  AppInput,
  AppButton,
} from '../ui';
import { Grid } from '../../styles';


const ChangePassword = ({ errors }) => {
  const [onChangePassword] = useChangePassword();

  const [state, setState] = useState({});
  const [error, setError] = useState(null);

  const passwordTextInput = useRef(null);
  const confirmPasswordTextInput = useRef(null);

  useEffect(() => {
    if (error !== errors) {
      setError(errors);
    }
  }, [errors]);

  const onSubmitHandler = (data) => {
    onChangePassword({ variables: data }).then(() => {
      navigation.goBack();
    });
  };

  const onValidate = () => {
    const fields = ["password", "newPassword"];
    for (let i = 0; i < fields.length; i++) {
      if (!state[fields[i]] || state[fields[i]].length < 1) {
        setError(i18n.t(`errors.${fields[i]}InputIsEmpty`));
        return;
      }
      onSubmitHandler(state);
    }
  };

  return (
    <>
      <View style={[Grid.flex2, Grid.centeredY]}>
        <AppCard
          type2
          label="screen.changePassword.title"
        >
          <AppInput
            password
            showShadows={false}
            returnKeyType="next"
            autoCapitalize="none"
            value={state.password}
            autoCompleteType="password"
            inputRef={passwordTextInput}
            onFocus={() => setError(null)}
            placeholder={i18n.t("form.oldPassword")}
            onChangeText={(password) => setState({ ...state, password })}
            onSubmitEditing={() => confirmPasswordTextInput.current.focus()}
          />
          <AppInput
            password
            blurOnSubmit={true}
            showShadows={false}
            returnKeyType="done"
            autoCapitalize="none"
            value={state.newPassword}
            autoCompleteType="password"
            inputRef={confirmPasswordTextInput}
            onSubmitEditing={onSubmitHandler}
            onFocus={() => setError(null)}
            placeholder={i18n.t("form.newPassword")}
            onChangeText={(newPassword) => setState({ ...state, newPassword })}
          />
        </AppCard>
      </View>
      <View style={[Grid.flex1, Grid.flexEndY]}>
        {error && (
          <Text style={[styles.message]}>
            {typeof error === "object" ? Object.keys(error).map((k) => error[k]) : error}
          </Text>
        )}
        <AppButton
          type={"flat"}
          onPress={onValidate}
          title={"screen.changePassword.submit"}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  message: {
    color: "#FFF",
    paddingBottom: 16,
    textAlign: "center",
  },
});

export default ChangePassword;