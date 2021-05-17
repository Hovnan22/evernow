import React from 'react';
import { TouchableOpacity } from 'react-native';

import { AppText } from '../ui';


const Settings = ({ item }) => (
  <TouchableOpacity onPress={item.onPress}>
    <AppText style={{
      fontSize: 15,
      lineHeight: 72,
      fontWeight: '400',
    }}>{item.title}</AppText>
  </TouchableOpacity>
);

export default Settings;
