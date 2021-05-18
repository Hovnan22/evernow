import React, { 
    useEffect,
    useState,
 } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';

import {
    AppIcon
  } from '../ui';


const meditationList = ({item,showText}) => {
    console.log(item,'14777777')
    const [hideText, setHideText] = useState (!showText);
    console.log(9)

    useEffect(() => {
        console.log(9)
        if(!hideText) {
            setTimeout(() => {
                setHideText(true)
            },5000)
        }

    },[showText])

    return (
        <View style={{display: 'flex', flexDirection: 'row'}}>
                  <AppIcon
        icon="yog"
        width={32}
        height={32}
      />
        <Text style={{display: hideText?  'none' : 'flex', color: '#fff'}}>text</Text>

        </View>
    )
}

export default meditationList