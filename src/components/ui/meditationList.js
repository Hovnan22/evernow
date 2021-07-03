import React from 'react';
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
    item,
    getLayouts,
    isHidetext,
    pressToMeditation,
}) => (
    <View
        onLayout={(event) => { getLayouts(event) }}
        style={styles.medtation}
    >
        <TouchableOpacity onPress={() => pressToMeditation(item.index)} style={styles.button}>
            <AppIcon
                icon={item.item.icon}
                width={32}
                height={32}
            />
            {!isHidetext && (
                <Text style={styles.name}>
                    {item.item.name}
                </Text>
            )}
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    medtation: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    name: {
        color: '#fff',
        paddingLeft: 15,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default MeditationList;
