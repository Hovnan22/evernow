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
                icon="yog"
                width={32}
                height={32}
            />
        </TouchableOpacity>
        {
            !isHidetext && (
                <Text style={{ color: '#fff', paddingLeft: 15 }}>
                    {item.item.name}
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
    }
})

export default MeditationList;
