import React, {
  useState,
  useEffect,
} from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import i18n from "i18n-js";

import {
  AppText,
  AppCard,
  AppButton,
  AppInput,
} from '../ui';
import { Grid } from '../../styles';


const RecoveryPasswordForm = props => {
  const [state, setState] = useState({});
  const { onSubmit, errors } = props;
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== errors) {
      setError(errors);
    }
  }, [props.errors]);

  const onValidate = () => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!state.email || state.email.length < 1) {
      setError(i18n.t("errors.emailInputIsEmpty"));
      return;
    }
    if (!regex.test(state.email)) {
      setError(i18n.t("errors.emailIncorrect"));
      return;
    }
    onSubmit(state);
    setError(null);
  };

  return (
    <>
      <View style={[Grid.flex2, Grid.centeredY]}>
        <AppCard
          type2
          label={"screen.recoveryPassword.title"}
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
            onSubmitEditing={onValidate}
            onChangeText={(email) => setState({ ...state, email })}
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
          title={"screen.recoveryPassword.submit"}
          type={"flat"}
        />
      </View>
    </>
  );
}

RecoveryPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};


const styles = StyleSheet.create({
  message: {
    color: "#FFF",
    paddingBottom: 16,
    textAlign: "center",
  },
});

export default RecoveryPasswordForm;
