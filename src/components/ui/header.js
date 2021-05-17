import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import {
  AppIcon,
  NativeFeedback,
  AndroidTopShadowCleaner,
} from '.';
import {
  Fonts,
  TABLET_FONT_SIZE_ADDITION,
} from 'src/styles';
import { accessabilityId } from 'src/utils';

const styles = StyleSheet.create({
  header: {
    marginTop: 2,
    height: 58,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // opacity: .95,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,

    elevation: 2,
  },
  leftBtn: {
    left: 0,
    zIndex: 8888,
  },
  title: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14 + TABLET_FONT_SIZE_ADDITION,
    lineHeight: 16 + TABLET_FONT_SIZE_ADDITION,
    color: '#4D4D4D',
    maxWidth: '75%',
    textAlign: 'center'
  },
  buttons: {
    position: 'absolute',
    paddingVertical: 24,
    paddingHorizontal: 15,
  },
  rightButton: {
    right: 0,
    fontSize: 13 + TABLET_FONT_SIZE_ADDITION,
    lineHeight: 15 + TABLET_FONT_SIZE_ADDITION,
    color: '#2B8AE8',
    fontFamily: Fonts.SemiBold,
  },
});

export default ({
  title,
  onPress,
  transparent = false,
  headerStyle = {},
  rightButtonPress,
  backIcon = 'close',
  centerIcon = null,
  rightButton = null,
  headerTitleStyle = {},
  rightButtonStyle = {},
  hideLeftButton = false,
  leftButtonStyle = null,
  leftButtonText = false,
  leftButtonTextStyle = {},
}) => (
  <>
    <View style={[styles.header, headerStyle, transparent && styles.transparent]}>
      {!(transparent || headerStyle?.backgroundColor === 'transparent') && <AndroidTopShadowCleaner />}
      {!hideLeftButton && (
        <NativeFeedback onPress={onPress}>
          <View style={[styles.leftBtn, styles.buttons,]}>
            {!leftButtonText ? (
              <AppIcon
                icon={backIcon}
                fill={leftButtonStyle ? leftButtonStyle.color : '#D1D1D1'}
                width='24'
                height='24'
                QATestingId="backButton"
              />
            ) : (
              <Text style={leftButtonTextStyle}>{leftButtonText}</Text>
            )}
          </View>
        </NativeFeedback>
      )}
      {!centerIcon ? (
        <Text style={[styles.title, headerTitleStyle]}>{title}</Text>
      ) : (
        <AppIcon width={150} height={24} icon={centerIcon} />
      )}
      {!!rightButton && (
        <Text
          onPress={rightButtonPress}
          {...accessabilityId(rightButton)}
          style={[styles.buttons, styles.rightButton, rightButtonStyle]}
        >
          {rightButton}
        </Text>
      )}
    </View>
  </>
);
