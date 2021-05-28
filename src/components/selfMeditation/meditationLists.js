import React, {
    useState,
    useEffect,
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
    selectedMeditation,
    setSelectedMeditation
}) => {
    const smallScrean = 1;
    const mediumScrean = 3;
    const largeScrean = 5;
    const [flatListRef, setFlatListRef] = useState();
    const [scrollIndex, setScrollIndex] = useState(0);
    const [isHidetext, setHidetext] = useState(false);
    const [prevListTimer, setPrevListTimer] = useState();
    const [hideTextTimer, setHidetextTimer] = useState();
    const [prevListCount, setPrevListCount] = useState(3);
    const [flatlistheight, setFlatlistHeight] = useState(0);
    const [meditationHeight, setmeditationheight] = useState(0);
    const [hideBottomButton, setHideBottomButton] = useState(false);
    const [bottonArrowheight, setBottonArrowheight] = useState(0);

    useEffect(() => {
        setFlatlistHeight(meditationHeight * prevListCount);

        if (!isHidetext) {
            setHidetextTimer(
                setTimeout(() => {
                    setHidetext(true)
                }, 1500)
            );
        }

        if (prevListCount == 1) {
            return;
        }

        setPrevListTimer(
            setTimeout(() => {
                console.log(selectedMeditation,'selectedMeditation');
                if (selectedMeditation != null ) {
                    setPrevListCount(smallScrean);
                } else  {
                    setPrevListCount(mediumScrean);
                }
            }, 3000)
        );

    }, [prevListCount])

    const pressToMeditation = (index) => {

        if (prevListCount == largeScrean) {
            setScrollIndex(index);
            setPrevListCount(smallScrean);
            setSelectedMeditation(index);
        } else if (prevListCount == mediumScrean) {
            setPrevListCount(largeScrean);
        } else if (prevListCount == smallScrean) {
            setPrevListCount(largeScrean);
        }

        setFlatlistHeight(meditationHeight * prevListCount);
        scrollToItem(index);
        setHidetext(false);
        clearTimeout(prevListTimer);
        clearTimeout(hideTextTimer);
    }

    const getLayouts = (event) => {
        setmeditationheight(event.nativeEvent.layout.height);
        setFlatlistHeight(meditationHeight * prevListCount);
    }

    const getButtonLayouts = (event) => {
        setBottonArrowheight(event.nativeEvent.layout.height);
    }

    const scrollToItem = (index) => {
        setScrollIndex(index);
        setTimeout(() => {
            flatListRef.scrollToIndex({ animated: true, index: index });
        })
    }

    const onViewRef = React.useRef(({viewableItems}) => {
        setScrollIndex(viewableItems[0].index);
        if(prevListCount === smallScrean) {
            setSelectedMeditation(viewableItems[0].index)
        }

        if (viewableItems[viewableItems.length - 1].index == meditation.length - 1) {
            setHideBottomButton(true);
        } else {
            setHideBottomButton(false);
        }
    })

    return (
        <View style={ styles.meditationLists }>
            {
                prevListCount == 5 && ( 
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.5, y: 0 }}
                    colors={[`rgba(115, 176, 233,0.4) `, `rgba(115, 176, 233, 0.0001) `]}
                    style={styles.linerGradient}
                /> 
                )
            }
            <View style={{ height: flatlistheight + bottonArrowheight }}>
                <View style={{ height: flatlistheight }} >
                    <FlatList
                        style={styles.flatList}
                        ref={ref => setFlatListRef(ref) }
                        data={meditation}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={ item => <AppMeditationList
                                item={item}
                                keyExtractor={item, index => index.toString()}
                                pressToMeditation={pressToMeditation}
                                isHidetext={isHidetext}
                                getLayouts={getLayouts}
                            />
                        }
                        onViewableItemsChanged={onViewRef.current}
                    />
                </View>
                {
                !hideBottomButton && (<TouchableOpacity
                    onLayout={ event =>   getButtonLayouts(event) }
                    style={{ paddingTop: 25 }}
                    onPress={() => scrollToItem(scrollIndex + 1) }>
                    <AppIcon
                        icon="yog"
                        width={32}
                        height={32}
                    />
                </TouchableOpacity>)
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    meditationLists: {
        paddingHorizontal: 16,
        height: '100%',
        justifyContent: 'center'
    },
    linerGradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
});

const mapStateToProps = ({
    profile: {
        meditation
    }
}) => ({
    meditation
});

export default connect(mapStateToProps)(MeditationLists);
