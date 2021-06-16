import React from 'react';

import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import { AppIcon } from '../ui';
import DiscussionPopup from './discussionAlert';
import CameraButton from './buttons';

const FinishMeditation = ({
    onShare,
    closePopup,
    onShareInstagram,
    recordingWithCamera,
}) => (
    <View style={styles.conrainer}>
        {recordingWithCamera ? (
            <View style={styles.recordingInfo}>
                <View style={styles.popup}>
                    <AppIcon
                        style={styles.logo}
                        icon="transparentLogo"
                        width={65}
                        height={65}
                    />
                    <AppIcon
                        icon="popup"
                        width={300}
                        height={115}
                    />
                    <View style={styles.popupMessage}>
                        <Text style={styles.popupMessageHeader}>You're doing fine</Text>
                        <Text style={styles.popumBodyMessage}>+27 minutes to validate your alpha state</Text>
                    </View>
                </View>
                <View style={styles.shareBlock}>
                    <CameraButton
                        icon="instagram"
                        pressDuration={1000}
                        onPress={() => { onShareInstagram() }}
                        width={40}
                        height={40}
                        style={{ marginRight: 25 }}
                    />
                    <CameraButton
                        icon="share"
                        pressDuration={1000}
                        onPress={() => { onShare() }}
                        width={40}
                        height={40}
                        style={{ marginLeft: 25 }}
                    />
                </View>

            </View>
        ) : (
            <View style={styles.info}>
                <Text style={styles.infoMessage}>Next time use “Meditation with a camera” and see how your body transforms</Text>
                <DiscussionPopup
                    press1={onShare}
                    press2={onShareInstagram}
                    text1={"screen.instagramShareButton.submit"}
                    text2={"screen.shareButton.submit"}
                    colore1={'#000'}
                    colore2={'#000'}
                    messageHeader={"Happiness is Evernow You're doing fine +27 "}
                    message={"minutes to validate your alpha state"}
                />
            </View>
        )}

    </View>
)

const styles = StyleSheet.create({
    recordingInfo: {
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',

    },
    conrainer: {
        width: '100%',
        height: '100%',
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        // zIndex: 6,
    },
    popupMessage: {
        position: 'absolute',
        textAlign: 'center',
        // width: 300
    },
    popupMessageHeader: {
        fontSize: 24,
        color: 'white',
        top: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    popumBodyMessage: {
        fontSize: 16,
        color: 'white',
        width: 250,
        top: 20,
        textAlign: 'center',
    },
    shareBlock: {
        bottom: 40,
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        zIndex: 4,
    },
    logo: {
        position: 'absolute',
        top: -55
    },
    info: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoMessage: {
        color: '#fff',
        paddingBottom: 25,
        paddingHorizontal: 40,
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24
    },
    popup: {
        position: 'relative',
        top: 110,
        flex: 1,
        zIndex: 4,
        alignItems: 'center',
    }
})

export default FinishMeditation;
