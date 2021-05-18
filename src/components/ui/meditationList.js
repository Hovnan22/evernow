import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { connect } from 'react-redux';


const meditationList = ({meditattion}) => {
    console.log(meditattion,'meditattion')
    return(
        <View>
            <Text>test</Text>
        </View>
    )

}

const mapStateToProps = ({ profile: { meditattion } }) => ({
    meditattion,
  });

  export default connect(mapStateToProps)(meditationList);