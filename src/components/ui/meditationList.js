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
        onLayout={(event) => {  getLayouts(event) }}
        style={styles.medtation}
    >
        <TouchableOpacity onPress={() => pressToMeditation(item.index)}>
            <AppIcon
                icon={item.item.icon}
                width={32}
                height={32}
            />
        </TouchableOpacity>
        {!isHidetext && (
                <Text  style={styles.name}>
                    { item.item.name }
                </Text>
            )
        }
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
        paddingLeft: 15
    }
})

export default MeditationList;
