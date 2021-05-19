import React, { 
    useEffect,
    useState,
 } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

import {
    AppIcon
  } from '../ui';


const MeditationList = ({item}) => {
    const [hideText, setHideText] = useState (false);
    useEffect(() => {
        if(!hideText) {
            setTimeout(() => {
                setHideText(true)
            },5000)
        }
    })




    return (
        <View style={styles.medtation}>
            <TouchableOpacity onPress={() => console.log('blabla')}>
            <AppIcon
        icon="yog"
        width={32}
        height={32}
      />
            </TouchableOpacity>
                  
        <Text style={{display: hideText?  'none' : 'flex', color: '#fff'}}>{item.item.name}</Text>

        </View>
    )
}
const styles= StyleSheet.create({
    medtation: {
        height: 45,
        display: 'flex',
        flexDirection: 'row'
        // padding: 5
    } 
})

export default MeditationList;