import React from 'react';
import i18n from "i18n-js";

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import {
  AppButton,
} from '.';

const ClosePopup = ({
  onClose,
  closePopup,
}) => (
  <View style={styles.conrainer}>
    <View style={styles.popupLayer}>
      <Text style={styles.popupMessage}>{i18n.t('screen.closePopupText.submit')}</Text>
      <AppButton
        style={styles.buttons}
        onPress={() => onClose()}
        title={"screen.closeButtonConfirm.submit"}
        type={"transparent"}
        color="red"
      />
      <AppButton
        style={styles.buttons}
        onPress={() => closePopup()}
        title={"screen.closeButtonCancel.submit"}
        type={"transparent"}
        color="#000"
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  buttons: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, .1)",
    borderRadius: 0,
    margin: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  conrainer: {
    position: "absolute",
    width: '100%',
    height: '100%',
    zIndex: 4,
    backgroundColor: "rgba(0, 129, 218, 0.5)",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    zIndex: 10,
  },
  popupLayer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: "80%",
    marginHorizontal: '10%',
    alignItems: "center",
    textAlign: 'center'
  },
  popupMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    marginBottom: 40,
    padding: 25,
  }
})

export default ClosePopup;
