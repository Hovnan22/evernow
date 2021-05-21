import React, {
    useEffect,
    useState,
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import {
    AppIcon
} from '../ui';


const MeditationList = ({
    pressToMeditation,
    isHidetext,
    item,
}) => {
    return (
        <View style={styles.medtation}>
            <TouchableOpacity onPress={() => pressToMeditation()}>
                <AppIcon
                    icon="yog"
                    width={32}
                    height={32}
                />
            </TouchableOpacity>

            <Text style={{ display: isHidetext ? 'none' : 'flex', color: '#fff' }}>{item.item.name}</Text>

        </View>
    )
}
const styles = StyleSheet.create({
    medtation: {
        height: 45,
        display: 'flex',
        flexDirection: 'row'
    }
})



export default MeditationList;