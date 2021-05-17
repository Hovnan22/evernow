import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from 'prop-types';

import i18n from 'i18n-js';

import { Colors } from '../../styles';


const AppButton = ({
  type,
  color,
  title,
  style,
  onPress,
  titleStyles,
  onPressInBackground,
  showShadows,
  QATestingId,
}) => {
  const colored = color ? {
    color,
    borderColor: color,
  } : null;

  const _gradient = (
    <View style={[containerStyles.container, containerStyles[type], colored]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[Colors.lightBlue, Colors.darkBlue]}
        style={[containerStyles.container, containerStyles.gradient, style, colored]}
      >
        <Text style={[textStyles.text, textStyles[type], colored, titleStyles]}>
          {i18n.t(title)}
        </Text>
      </LinearGradient>
    </View>
  );

  const _content = (
    <View style={[containerStyles.container]}>
      <Text style={[textStyles.text, textStyles[type], colored, titleStyles]}>
        {i18n.t(title)}
      </Text>
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[containerStyles.wrapper, containerStyles[type], style, color && { borderColor: color }]}
    >
      {type === 'gradient' ? _gradient : _content}
    </TouchableOpacity>
  )
};

AppButton.defaultProps = {
  showShadows: true,
  QATestingId: '',
};

AppButton.propTypes = {
  children: PropTypes.node,
};

const containerStyles = StyleSheet.create({
  shadows: {
    shadowColor: "#000",
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.3,
      },
      android: {
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.30,
        shadowRadius: 8,
        elevation: 2,
      }
    })
  },
  wrapper: {
    height: 60,
    width: '100%',
    borderWidth: 2,
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  outlined: {
    borderColor: Colors.textLight,
    backgroundColor: Colors.white,
  },

  'outlined-white': {
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  },
  'outlined-opacity': {
    borderColor: '#88245F',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  flat: {
    borderColor: Colors.white,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  'flat-opacity': {
    borderColor: Colors.white,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  solid: {
    borderWidth: 0,
    backgroundColor: '#88245F',
  },
  gradient: {
    borderWidth: 0,
  },
  linearGradient: {},
  secondary: {
    backgroundColor: Colors.white,
    borderColor: '#88245F',
  },
  transparent: {
    borderWidth: 0,
  },
});

const textStyles = StyleSheet.create({
  text: {
    color: Colors.white,
    paddingHorizontal: 20,
    // fontFamily: Fonts.Medium,
    fontSize: 16,
    lineHeight: 19,
  },
  flat: {
    color: Colors.white,
  },
  'flat-opacity': {
    color: Colors.white
  },
  solid: {
    color: Colors.white
  },
  outlined: {
    color: Colors.textLight,
  },
  'outlined-opacity': {
    color: '#88245F',
  },
  'outlined-white': {
    color: Colors.textLight,
  },
  gradient: {},
  secondary: {
    color: '#88245F',
  },
  transparent: {
    color: Colors.white,
  }
});

export default AppButton;
