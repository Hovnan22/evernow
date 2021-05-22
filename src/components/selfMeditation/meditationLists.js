import React, {
    useState,
    useEffect,
    useLayoutEffect,
} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {
    AppIcon,
    AppMeditationList,
} from '../ui';

const MeditationLists = ({
    meditation,
}) => {
   const [flatListRef, setFlatListRef] = useState();
    const [isHidetext,setHidetext] = useState(false);
    const [prevListTimer,setPrevListTimer] = useState();
    const [hidetextTimer,setHidetextTimer] = useState();
    const [prevListCount,setPrevListCount] = useState(3);
    const [hideBottomButton, setHideBottomButton] = useState('show');
    const [meditationHeight,setmeditationheight] = useState(0);
    const [flatlistheight,setFlatlistHeight] = useState(0);
    const [scrollIndex,setScrollIndex] = useState(0);
    const [isRendered,setRendered] = useState(false);
    

    useEffect(() => {
        setRendered( false);
        setFlatlistHeight(meditationHeight * prevListCount);
        if(!isHidetext) {
            setHidetextTimer (setTimeout(() => {
                setHidetext(true)
            },3000));
        }
        if(prevListCount == 1){
            return;
        }
        setPrevListTimer(setTimeout(() => {

                setPrevListCount(3);
            },5000));

    },[prevListCount])

    const pressToMeditation = (index) => {
        flatListRef.scrollToIndex({ animated: true, index: index  });
        if(prevListCount == 3){
            clearTimeout(prevListTimer);
            clearTimeout(hidetextTimer);
            setPrevListCount(5);
            setHidetext(false);
        }

        if(prevListCount == 5){
            console.log(typeof index)
            setScrollIndex(index);
            setPrevListCount(1);
            setHidetext(false);
            clearTimeout(prevListTimer);
            clearTimeout(hidetextTimer);
        } else if(prevListCount == 1){
            setPrevListCount(5);
            setHidetext(false);
            clearTimeout(prevListTimer);
            clearTimeout(hidetextTimer);
        }
    }

    const getLayouts = (event,index) => {
        setmeditationheight(Math.floor(event.nativeEvent.layout.height));
        setFlatlistHeight(meditationHeight * prevListCount);
    }

    const scrollToItem = () => {
        flatListRef.scrollToIndex({ animated: true, index: scrollIndex + 1 });
        setScrollIndex(scrollIndex + 1);
    }


    const onViewRef = React.useRef((viewableItems) => {
        setScrollIndex(viewableItems.viewableItems[0].index);
        console.log(3)


        if (viewableItems.viewableItems[viewableItems.viewableItems.length - 1].index == meditation.length - 1){
                setHideBottomButton('hide');
        } else {
                setHideBottomButton('show');
        }
    })

    return (

        <View style={{ height: '100%', justifyContent: 'center' }}>
           {
           prevListCount == 5 ? <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 0 }}
                colors={[`rgba(115, 176, 233,0.4) `, `rgba(115, 176, 233, 0.0001) `]}
                style={styles.linerGradient}
            >
            </LinearGradient> : <></>
            }
                <View 
                style={[styles.meditationLists, { height:flatlistheight  }]}
                >
                    <FlatList
                        ref={(ref) => { setFlatListRef(ref); }}
                        data={meditation}

                        initialNumToRender={meditation.length}
                        renderItem={(item) => {
                            return <AppMeditationList
                                item={item}
                                keyExtractor={(item, index) => index.toString()}
                                pressToMeditation={pressToMeditation}
                                isHidetext={isHidetext}
                                getLayouts={getLayouts}
                                
                            />
                        }}
                        onViewableItemsChanged={onViewRef.current}
                        onLayout={() => {console.log(2);flatListRef.scrollToIndex({ animated: true, index: scrollIndex  })}}


                    />
                </View>
                <TouchableOpacity
                    style={{ display: hideBottomButton == 'hide' ? 'none' : 'flex' }}
                    onPress={(e) => scrollToItem(e)
                    }>
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
        width: 200,
    },
    linerGradient: {
        height: '100%', 
        width: '100%', 
        position: 'absolute',
    },
})

const mapStateToProps = ({
    profile: {
        meditation
    } }) => ({
        meditation
    });



export default connect(mapStateToProps)(MeditationLists);