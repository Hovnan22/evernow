import React, {
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import i18n from "i18n-js";
import PropTypes from "prop-types";


import {
  AppCard,
  AppButton,
  AppInput,
} from '../ui';
import { Grid } from '../../styles';


const RegisterForm = props => {
  const { onSubmit, navigation, errors } = props;
  const [state, setState] = useState({});
  const [error, setError] = useState(null);
  const passwordTextInput = useRef(null);
  const confirmPasswordTextInput = useRef(null);

  useEffect(() => {
    if (error !== errors) {
      setError(errors);
    }
  }, [props.errors]);

  const onValidate = () => {
    const fields = ["email", "password", "confirmPassword"];
    for (let i = 0; i < fields.length; i++) {
      if (!state[fields[i]] || state[fields[i]].length < 1) {
        setError(i18n.t(`errors.${fields[i]}InputIsEmpty`));
        return;
      }
    }
    if (state.password !== state.confirmPassword) {
      setError(i18n.t("errors.passwordsDidNotMatch"));
      return;
    }
    onSubmit(state);
    setError(null);
  };

  return (
    <>
      <View style={[Grid.flex1, Grid.centeredY]}>
        <AppCard
          type2
          label={"screen.register.title"}
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
            showShadows={false}
            returnKeyType="next"
            autoCapitalize="none"
            value={state.password}
            autoCompleteType="password"
            inputRef={passwordTextInput}
            onFocus={() => setError(null)}
            placeholder={i18n.t("form.password")}
            onChangeText={(password) => setState({ ...state, password })}
            onSubmitEditing={() => confirmPasswordTextInput.current.focus()}
          />
          <AppInput
            password
            blurOnSubmit={true}
            showShadows={false}
            returnKeyType="done"
            autoCapitalize="none"
            value={state.confirmPassword}
            autoCompleteType="password"
            inputRef={passwordTextInput}
            onSubmitEditing={onValidate}
            onFocus={() => setError(null)}
            placeholder={i18n.t("form.confirmPassword")}
            onChangeText={(confirmPassword) => setState({ ...state, confirmPassword })}
          />
        </AppCard>
      </View>
      <View style={[Grid.centeredY]}>
        <Text style={[styles.message]}>
          {error && typeof error === "object" ? Object.keys(errors).map((k) => errors[k]) : error}
        </Text>
        <AppButton
          onPress={onValidate}
          title={"screen.register.submit"}
          type={"flat"}
          color={"white"}
        />
        <AppButton
          onPress={() => navigation.navigate("Login")}
          title={"common.login"}
          type={"transparent"}
          color={"white"}
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

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RegisterForm;
