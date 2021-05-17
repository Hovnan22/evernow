import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';



const ListItem = ({ item }) => (
  <TouchableOpacity onPress={item.onPress}>
    <Text style={{
      fontSize: 15,
      lineHeight: 72,
      fontWeight: '400',
    }}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

export default ListItem;
