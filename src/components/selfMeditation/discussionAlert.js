import React from 'react';

import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { AppButton } from '../ui';

const DiscussionPopup = ({
    press1,
    press2,
    newStyles,
    text1,
    text2,
    colore1,
    colore2,
    message,
    messageHeader,
}) => (
    <View style={[styles.conrainer, newStyles ? newStyles : '' ]}>
        <View style={styles.popupLayer}>
            <Text style={styles.popupMessage}>
                { messageHeader && (<Text style={{color: '#6eb6ef'}}>{messageHeader}</Text>)}
                {message}
                </Text>
            <AppButton
                style={styles.buttons}
                onPress={() => press1()}
                title={text1}
                type={"transparent"}
                color={colore1}
            />
            <AppButton
                style={styles.buttons}
                onPress={() => press2()}
                title={text2}
                type={"transparent"}
                color={colore2}
            />
        </View>
    </View>
)

const styles = StyleSheet.create({
    buttons: {
        borderTopWidth: 1,
        borderTopColor: "rgba(0, 0, 0, .1)",
        borderRadius: 0,
        margin: 0,
        marginHorizontal: 0,
        marginVertical: 0,
    },
    conrainer: {
        width: '100%',
        zIndex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
    },
    popupLayer: {
        backgroundColor: '#fff',
        borderRadius: 25,
        width: "80%",
        marginHorizontal: '10%',
        alignItems: "center",
        textAlign: 'center'
    },
    popupMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        marginBottom: 40,
        padding: 25,
    }
})

export default DiscussionPopup;
