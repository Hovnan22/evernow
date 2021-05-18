import React, { useEffect } from 'react';
import { 
    Text,
    View,
    FlatList,
    StyleSheet,
    Dimensions ,
} from 'react-native';
import { connect } from 'react-redux';

import {  AppMeditationList } from '../ui';


const meditationLists = ({meditation}) => {

    console.log(meditation,'789987')
    return(
        <View style={styles.meditationLists}>
            
             <FlatList
                
                data={meditation}
                renderItem={(item) => {
                    return <AppMeditationList item={item} showText={true} />
                }}
                keyExtractor={item => item.uuid}
            />
            <Text>test</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    meditationLists: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

const mapStateToProps = ({ profile: { meditation } }) => ({
    meditation,
  });

  

  export default connect(mapStateToProps)(meditationLists);