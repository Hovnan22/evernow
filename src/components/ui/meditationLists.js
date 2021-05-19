import React, { 
    useEffect,
    useState
 } from 'react';
import { 
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity ,
} from 'react-native';
import { connect } from 'react-redux';

import { 
    AppMeditationList,
    AppIcon, 
} from '../ui';

const flatListTop = 55*3
const meditationLists = ({meditation}) => {
    const [flatListRef,setFlatListRef]  = useState();
    const [viewableIndex,setviewableIndex]  = useState(1);


    const scrollToItem = (e) => {
        flatListRef.scrollToIndex({animated: true, index: viewableIndex });
      }
      const onViewRef = React.useRef((viewableItems)=> {
        setviewableIndex(viewableItems.viewableItems[1].index)
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 4 })
    // const
    return(
        <View style={styles.meditationLists}>
            <TouchableWithoutFeedback onPress={onPress}>
                <FlatList
                    ref={(ref) => { setFlatListRef(ref) ; }}
                    data={meditation}
                    initialScrollIndex={0}
                    initialNumToRender={4}
                    renderItem={(item) => {
                        return <AppMeditationList item={item}  />
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}

                />
            </TouchableWithoutFeedback> 
            <TouchableOpacity onPress={(e) => scrollToItem(e)}>
                <AppIcon
                  icon="yog"
                  width={32}
                  height={32}
                />
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    meditationLists: {
        height: 165,
        width: 200,
    }
})

const mapStateToProps = ({ profile: { meditation } }) => ({
    meditation,
  });

  

  export default connect(mapStateToProps)(meditationLists);