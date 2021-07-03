import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import {
    AppIcon,
  } from '../../components/ui';

const Instruct = ({
    navigation
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.close}
                onPress={() => navigation.navigate("Home")}
            >
                <AppIcon
                    icon="close"
                    width={22}
                    height={22}
                />
            </TouchableOpacity>
            <YoutubePlayer
                height={250}
                play={true}
                videoId={'0TFNGRYMz1U'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    close: {
        position: 'absolute',
        right: 25,
        top: 60,
        
    }
})

export default Instruct;



