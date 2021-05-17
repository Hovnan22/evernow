import React, { useState } from 'react';
import {
  Text,
  View,
  Platform,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import i18n from 'i18n-js';

import { AppIcon } from './';
import { Colors } from '../../styles';
// import {
//   Fonts,
//   TABLET_FONT_SIZE_ADDITION,
// } from 'src/styles';

const Input = ({
  icon,
  onBlur,
  onPress,
  isError,
  onFocus,
  password,
  editable,
  inputRef,
  disabled,
  rightIcon,
  bottomText,
  inputStyle,
  marginBottom,
  passwordIcon,
  eyeQATestingId,
  inputQATestingId,
  showShadows = true,
  ...props
}) => {
  const [isPass, setIsPass] = useState(!!password);
  const [isFocused, setFocus] = useState(false);

  const focusHandler = () => {
    if (onFocus) onFocus();
    setFocus(true)
  };

  const blurHandler = () => {
    if (onBlur) onBlur();
    setFocus(false)
  };

  const disabledColor = '#7a7a7a';

  return (
    <>
      <View
        style={[
          styles.container,
          (isError && styles.errorState),
          (showShadows && styles.shadows),
          (disabled && styles.disabledState),
          (isFocused && styles.focusedInput),
        ]}
      >
        <TouchableWithoutFeedback onPress={() => !disabled && typeof onPress === 'function' && onPress()}>
          <View style={styles.wrapper}>
            {icon !== 'none' && (
              <View style={[styles.icon]}>
                <AppIcon
                  icon={icon}
                  width='24'
                  height='24'
                  fill='#7A7A7A'
                />
              </View>
            )}
            {!editable && (
              <Text
                style={[styles.input, styles.notEditable, inputStyle]}>{props.value === '' ? props.placeholder : props.value}</Text>
            )}
            {editable && (
              <TextInput
                {...props}
                // allowFontScaling={false}
                ref={inputRef}
                onBlur={blurHandler}
                onFocus={focusHandler}
                underlineColorAndroid='transparent'
                editable={disabled ? false : editable}
                secureTextEntry={Platform.OS !== 'android' ? isPass : !!password}
                style={[styles.input, inputStyle, (disabled && { color: disabledColor })]}
                placeholderTextColor={disabled ? disabledColor : props.placeholderTextColor || styles.input.color}
                keyboardType={!!password && !isPass && Platform.OS === 'android' ? 'visible-password' : props.keyboardType ? props.keyboardType : null}
              />
            )}
            <View style={[styles.icon, styles.rightIcon]}>
              {rightIcon !== 'none' && (
                <AppIcon
                  width='24'
                  height='24'
                  fill='#7A7A7A'
                  icon={rightIcon}
                />
              )}
            </View>
            {password && passwordIcon && (
              <View
                style={[styles.passwordIcon]}
              >
                <AppIcon
                  width='24'
                  height='24'
                  onPress={() => setIsPass(!isPass)}
                  icon={isPass ? 'eye' : 'eye-closed'}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {!!bottomText && <Text style={[styles.bottomText, (isError && styles.errorMessage), marginBottom && { marginBottom }]}>{bottomText}</Text>}
    </>
  );
};

Input.defaultProps = {
  icon: "none",
  editable: true,
  rightIcon: 'none',
  showShadows: true,
  eyeQATestingId: '',
  closeOnSelect: false,
  placeholderTextColor: Colors.placeholderText,
  errorMessage: {
    show: false,
    message: '',
  },
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({ ios: { height: 46 } }),
    width: '100%',
    borderWidth: 0,
    borderBottomWidth: 1,
    // borderRadius: 23,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderBottomColor: "#EDF2FF",
    borderBottomWidth: 2,
    marginVertical: 15,
  },
  wrapper: {
    ...Platform.select({ ios: { flex: 1 } }),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorState: {
    borderColor: '#FB4444',
    shadowColor: "#FB4444",
    backgroundColor: '#FFEBEB',
  },
  disabledState: {
    borderColor: '#E6E6E6',
    backgroundColor: '#E6E6E6',
  },
  input: {
    flex: 1,
    width: '100%',
    height: '100%',
    color: '#4D4D4D',
    paddingHorizontal: 6,
    // fontFamily: Fonts.Regular,
    fontSize: 14 /* + TABLET_FONT_SIZE_ADDITION */,
    lineHeight: 16 /* + TABLET_FONT_SIZE_ADDITION */,
  },
  notEditable: {
    paddingVertical: 15
  },
  icon: {
    paddingLeft: 15,
  },
  rightIcon: {
    paddingLeft: 0,
    paddingRight: 15,
  },
  passwordIcon: {
    paddingRight: 15
  },
  // focusedInput: {
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: "#2B8AE8",
  //       shadowOpacity: 0.3,
  //       shadowRadius: 8,
  //     },
  //     android: {
  //       borderColor: '#2B8AE8'
  //     },
  //   })
  // },
  bottomText: {
    color: '#7A7A7A',
    marginVertical: 8,
    // fontFamily: Fonts.Regular,
    fontSize: 12/*  + TABLET_FONT_SIZE_ADDITION */,
    lineHeight: 12 /* + TABLET_FONT_SIZE_ADDITION */,
  },
  errorMessage: {
    color: '#FF1B50',
  },
  shadows: {
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 3,
  },
});

export default Input;
