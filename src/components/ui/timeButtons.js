import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import i18n from "i18n-js";
import {
    AppButton,
    AppIcon
} from ".";
import { StyleSheet } from 'react-native';

const TimeButtons = ({
    onChange,
    more,
    setTimePickerButtons,
}) => (
    <View style={styles.selectTime}>


        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 0 }}
            colors={[`rgba(115, 176, 233,0.6) `, `rgba(115, 176, 233, 0.0001) `]}
            style={styles.selectTime}
        >
            <View style={styles.container}>
                <AppButton
                    style={styles.timePickerButton}
                    onPress={() => { onChange(0, 30) }}
                    title={"screen.timePickerShortDuration.submit"}
                    type={"transparent"}
                />
                <AppButton
                    style={styles.timePickerButton}
                    onPress={() => { onChange(0, 60) }}
                    title={"screen.timePickerLongDuration.submit"}
                    type={"transparent"}
                />
                <AppButton
                    style={styles.timePickerButton}
                    onPress={() => more()}
                    title={"screen.timePickerMoreDuration.submit"}
                    type={"transparent"}
                />
                <TouchableOpacity style={styles.closeButton} onPress={() => setTimePickerButtons(false)}>
                    <AppIcon
                        style={styles.rotate}
                        icon={'arrowDown'}
                        width={32}
                        height={32}
                    />
                    <Text style={{ color: 'white' }}>{i18n.t("screen.timePickerClose.submit")}</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: 180,
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    selectTime: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: '100%',
        zIndex: 6,
        justifyContent: 'center',
    },
    timePickerButton: {
        backgroundColor: "rgba(255, 255, 255, .3)",
        borderRadius: 30,
    },
    closeButton: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingTop: 20,
        alignItems: 'center'
    },
    rotate: {
        transform: [{ rotate: "180deg" }]
    },
})

export default TimeButtons;