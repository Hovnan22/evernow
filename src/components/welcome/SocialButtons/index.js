import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { AppText } from '../../ui';
import SocialButton from '../../ui/socialButton';

import {
  Grid,
  Colors,
  Typography,
} from '../../../styles';


const SocialButtons = () => (
  <>
    <AppText style={styles.label}>{"screen.main.socialSignLabel"}</AppText>
    <View style={styles.container}>
      <SocialButton type="google" />
      <SocialButton type="fb" />
      <SocialButton type="vk" />
    </View>
  </>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 24,
    ...Grid.centeredY,
  },
  label: {
    ...Typography.textCenter,
    ...Typography.textNormal,
    opacity: 0.5,
    paddingBottom: 16,
    fontWeight: '400',
    fontSize: 16,
    color: Colors.textDarken,
  },
});

export default SocialButtons;
