import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import fb from '../../../src/assets/icons/network/facebook.png';
import vk from '../../../src/assets/icons/network/vk.png';
import google from '../../../src/assets/icons/network/google.png';

const images = {
  fb,
  vk,
  google,
};


const SocialButton = ({
  type,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={images[type]} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  image: {
    width: 56,
    height: 56,
    marginHorizontal: 8,
  },
});

export default SocialButton;
