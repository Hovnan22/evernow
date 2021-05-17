import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  AppIcon
} from '../ui';


const meditationType = ({ item: { name } }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 12
    }}>
      <AppIcon
        icon="yog"
        width={32}
        height={32}
      />
      <Text style={styles.text}>{name}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: 'white',
    marginLeft: 19,
  }
});

export default meditationType;