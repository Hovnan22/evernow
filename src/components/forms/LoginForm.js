import React, {
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import i18n from "i18n-js";
import PropTypes from "prop-types";

import {
  AppText,
  AppCard,
  AppButton,
  AppInput,
} from '../ui';
import { Grid } from '../../styles';

const LoginForm = ({
  errors,
  onSubmit,
  navigation,
}) => {
  const [state, setState] = useState({
    email: "user1@example.com",
    password: "passwoord",
  });
  const [error, setError] = useState(null);
  const passwordTextInput = useRef(null);

  useEffect(() => {
    if (error !== errors) {
      setError(errors);
    }
  }, [errors]);

  const onValidate = () => {
    const fields = ["email", "password"];
    for (let i = 0; i < fields.length; i++) {
      if (!state[fields[i]] || state[fields[i]].length < 1) {
        setError(i18n.t(`errors.${fields[i]}InputIsEmpty`));
        return;
      }
    }
    setError(null);
    onSubmit(state);
  };

  return (
    <>
      <View style={[Grid.flex2, Grid.centeredY]}>
        <AppCard
          type2
          label={"common.login"}
        >
          <AppInput
            showShadows={false}
            value={state.email}
            returnKeyType="next"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            placeholder={i18n.t("form.email")}
            onChangeText={(email) => setState({ ...state, email })}
            onSubmitEditing={() => passwordTextInput.current.focus()}
          />
          <AppInput
            password
            blurOnSubmit={true}
            showShadows={false}
            returnKeyType="done"
            autoCapitalize="none"
            value={state.password}
            autoCompleteType="password"
            inputRef={passwordTextInput}
            onSubmitEditing={onValidate}
            onFocus={() => setError(null)}
            placeholder={i18n.t("form.password")}
            onChangeText={(password) => setState({ ...state, password })}
          />
          <View style={[Grid.centeredY, Grid.centeredX, styles.forgetPasswordContainer]}>
            <TouchableOpacity onPress={() => navigation.navigate("RecoveryPassword")}>
              <AppText style={styles.forgetPassword}>
                {"common.forgetPassword"}
              </AppText>
            </TouchableOpacity>
          </View>
        </AppCard>
      </View>
      <View style={[Grid.flex1, Grid.flexEndY]}>
        {error && (
          <Text style={[styles.message]}>
            {typeof error === "object" ? Object.keys(error).map((k) => error[k]) : error}
          </Text>
        )}
        <AppButton
          onPress={onValidate}
          title={"screen.login.submit"}
          type={"flat"}
        />
        <AppButton
          onPress={() => navigation.navigate("Register")}
          title={"common.register"}
          type={"transparent"}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  forgetPasswordContainer: {
    marginTop: 10,
  },
  forgetPassword: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    opacity: 0.5,
  },
  message: {
    color: "#FFF",
    paddingBottom: 16,
    textAlign: "center",
  },
});

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;