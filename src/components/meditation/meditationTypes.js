import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';


import MeditationType from './meditationType';
import {
  AppIcon
} from '../ui';

const types = [
  {
    name: 'Meditation Type 1',
  },
  {
    name: 'Meditation Type 2',
  },
  {
    name: 'Meditation Type 3',
  },
  {
    name: 'Meditation Type 4',
  },
  {
    name: 'Meditation Type 5',
  },
  {
    name: 'Meditation Type 6',
  },
  {
    name: 'Meditation Type 7',
  },
  {
    name: 'Meditation Type 8',
  },
]

const meditationTypes = () => {
  const [showDownButton, setShowDownButton] = useState(true);
  const [showText, setShowText] = useState(true);
  return (
    <View style={{

      // position: "absolute",
      // left: 0,
      // top: 0,
      // transform: [{ translateY: -100 }],
      // bottom: 0,
      // // alignItems: "center",
      // paddingVertical: 36,
      // paddingHorizontal: 16,
      // // opacity: 0.5,
      // zIndex: 4,
    }}
    >
      <FlatList
        data={types}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MeditationType item={item} />
        )}
        showsVerticalScrollIndicator={false}
        // initialNumToRender={3}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setShowDownButton(false)
        }}
        onScrollBeginDrag={(e) => {
          setShowDownButton(true)
        }}
      // onViewableItemsChanged={() => console.log('aaaa')}
      // ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity
        style={{
          display: showDownButton ? 'flex' : 'none',
        }}
        onPress={() => {

        }}>
        <AppIcon
          icon="arrowDown"
          width={32}
          height={32}
          style={{
            marginTop: 10
          }}
        />
      </TouchableOpacity>

    </View>


  );
};

export default meditationTypes;