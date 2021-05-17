import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import {
  Text,
  View,
} from "react-native";
import i18n from "i18n-js";

import AppContext, { setSettings } from "../../context/AppContext";

import {
  AppCard,
  AppInput,
  AppButton,
} from '../ui';

import {
  Grid,
  Form,
} from '../../styles';

const ChangeNameForm = ({ errors }) => {
  const [state, setState] = useState({});
  const [error, setError] = useState(null);

  const { dispatch } = useContext(AppContext);

  const onSubmitHandler = (value) => {
    dispatch(setSettings({
      username: value.name,
    }));
  };

  useEffect(() => {
    if (error !== errors) {
      setError(errors);
    }
  }, [errors]);

  const onValidate = () => {
    if (!state.name || state.name.length < 1) {
      setError(i18n.t("errors.nameInputIsEmpty"));
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
          label="screen.changeName.title"
        >
          <AppInput
            showShadows={false}
            multiline={false}
            value={state.name}
            autoCorrect={false}
            returnKeyType={'done'}
            onFocus={() => setError(null)}
            onChangeText={(name) => setState({ ...state, name })}
            placeholder={i18n.t("form.name")}
            onSubmitEditing={onValidate}
          />
        </AppCard>
      </View>
      <View style={[Grid.flex1, Grid.flexEndY]}>
        {error && (
          <Text style={[Form.message]}>
            {typeof error === "object" ? Object.keys(errors).map((k) => errors[k]) : error}
          </Text>
        )}
        <AppButton
          onPress={onValidate}
          title={"screen.changeName.submit"}
          type={"flat"}
        />
      </View>
    </>
  );
}

export default ChangeNameForm;
