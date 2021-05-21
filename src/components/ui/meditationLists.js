import React, {
    useEffect,
    useState,
    useRef,
} from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {
    AppIcon,
    AppMeditationList,
} from '../ui';

const meditationLists = ({
    meditation,
    meditationLimit,
    scrollIndex,
}) => {
    const meditationHeight = 45;
    const [flatListRef, setFlatListRef] = useState();
    const [viewableIndex, setviewableIndex] = useState(1);
    const [hideBottomButton, setHideBottomButton] = useState(false);

    const [prevListCount,setPrevListCount] = useState(3);
    const [isHidetext,setHidetext] = useState(false);
    const [hidetextTimer,setHidetextTimer] = useState()
    const [prevListTimer,setPrevListTimer] = useState()


    useEffect(() => {
        if(!isHidetext) {
            setHidetextTimer (setTimeout(() => {
                setHidetext(true)
            },5000));
        }
    },[isHidetext]);

    useEffect(() => {
        setPrevListTimer(setTimeout(() => {
                setPrevListCount(3);
            },10000))
    },[prevListCount])

    const pressToMeditation = () => {
        clearTimeout(prevListTimer);
        clearTimeout(hidetextTimer);
        setPrevListCount(5);
        setHidetext(false);
    }

    const scrollToItem = (e) => {

        flatListRef.scrollToIndex({ animated: true, index: viewableIndex + 1 });
        if (meditation.length - viewableIndex == 4 && meditationLimit == 3) {
            setHideBottomButton(true);
        } else if (meditationLimit == 5 && meditation.length - viewableIndex == 6) {
            setHideBottomButton(true);
        }
    }


    const onViewRef = React.useRef((viewableItems) => {
        setviewableIndex(viewableItems.viewableItems[0].index)
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: meditation.length })

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 0 }}
            colors={[`rgba(115, 176, 233, ${meditationLimit == 5 ? '0.4' : '0'})`, `rgba(115, 176, 233, ${meditationLimit == 5 ? '0.0001' : '0'})`]}
        >
            <View style={{ height: '100%', justifyContent: 'center' }}>
                <View style={[styles.meditationLists, { height: meditationHeight * prevListCount }]}>
                    <FlatList
                        ref={(ref) => { setFlatListRef(ref); }}
                        data={meditation}

                        initialNumToRender={meditation.length}
                        renderItem={(item) => {
                            return <AppMeditationList
                                item={item}
                                pressToMeditation={pressToMeditation}
                                isHidetext={isHidetext}
                            />
                        }}
                        // initialScrollIndex={scrollIndex}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}

                    />
                </View>
                <TouchableOpacity
                    style={{ display: hideBottomButton ? 'none' : 'flex' }}
                    onPress={(e) => scrollToItem(e)
                    }>
                    <AppIcon
                        icon="yog"
                        width={32}
                        height={32}
                    />
                </TouchableOpacity>

            </View>
        </LinearGradient>

    )

}

const styles = StyleSheet.create({
    meditationLists: {
        width: 200,

    }
})

const mapStateToProps = ({
    profile: {
        meditation,
        meditationLimit,
        scrollIndex,
    } }) => ({
        meditation,
        meditationLimit,
        scrollIndex,
    });



export default connect(mapStateToProps)(meditationLists);