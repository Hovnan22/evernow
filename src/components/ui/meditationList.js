import React, { useEffect } from 'react';
import { 
    Text,
    View,
    Dimensions ,
} from 'react-native';
import { connect } from 'react-redux';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const meditationList = ({meditattion}) => {
    console.log(123456)


    // console.log(window,'meditattion')
    return(
        <View style={{height: window.height}}>
            <Text>test</Text>
        </View>
    )

}

const mapStateToProps = ({ profile: { meditattion } }) => ({
    meditattion,
  });

  export default connect(mapStateToProps)(meditationList);