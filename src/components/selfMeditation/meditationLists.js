import React, {
    useRef,
    useState,
    useEffect,
} from 'react';
import {
    View,
    Easing,
    FlatList,
    Animated,
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
    state,
    meditation,
    onHideMeditation,
    selectedMeditation,
    setSelectedMeditation,
}) => {
    const smallScrean = 1;
    const largeScrean = 5;
    const mediumScrean = 3;
    const flatListRef = useRef();
    const [isHidetext, setHidetext] = useState(false);
    const [hideTextTimer, setHidetextTimer] = useState();
    const [showAllList, setShowAllList] = useState(false);
    const [prevListCount, setPrevListCount] = useState(mediumScrean);
    const [meditationHeight, setmeditationheight] = useState(0);
    const [flatlistheight, setFlatlistHeight] = useState(new Animated.Value(0));

    useEffect(() => {
        state.paused ? setFlatlistHeight(meditationHeight * largeScrean) : setFlatlistHeight(meditationHeight * prevListCount);
    }, [state.paused])

    useEffect(() => {
        if (selectedMeditation && prevListCount == smallScrean) {
            !state.paused && scrollToItem(selectedMeditation);
        }
        clearTimeout(hideTextTimer);
        if (!isHidetext && prevListCount < largeScrean) {           
            setHidetextTimer(
                setTimeout(() => {
                    setHidetext(true);
                }, 5000)
            );
        }
    }, [flatlistheight])

    const pressToMeditation = (index) => {
        if (prevListCount == smallScrean && !showAllList) {
            setFlatlistHeight(meditationHeight * mediumScrean);
            setPrevListCount(mediumScrean);
        } else {
            if (!state.paused) {
                setFlatlistHeight(meditationHeight);
                setPrevListCount(smallScrean);
                scrollToItem(index);
            }
            setSelectedMeditation(index);
            state.paused && onHideMeditation();
        }
        clearTimeout(hideTextTimer);
        setShowAllList(false);
        setHidetext(false);
    };

    const pressOnAllList = () => {
        let newHeight = 0;
        const animatedHeigh = new Animated.Value(0);
        newHeight = meditationHeight * largeScrean;
        if (!showAllList) {
            Animated.timing(
                animatedHeigh,
                {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease,
                }
            ).start(() => {
                setShowAllList(true);
                setPrevListCount(largeScrean);
                setFlatlistHeight(newHeight);
            });
        } else {
            const smallHeight = meditationHeight * smallScrean;
            const mediumHeight = meditationHeight * mediumScrean;
            if (selectedMeditation) {
                setPrevListCount(smallScrean);
                newHeight = smallHeight;
            } else {
                setPrevListCount(mediumScrean);
                newHeight = mediumHeight;
            }
            Animated.timing(
                animatedHeigh,
                {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }
            ).start(() => {
                setShowAllList(false);
                setFlatlistHeight(newHeight);
            });
        }
        setFlatlistHeight(animatedHeigh.interpolate({
            inputRange: [0, 1],
            outputRange: [flatlistheight, newHeight],
            easing: Easing.ease,
            extrapolate: "clamp",
        }))
        clearTimeout(hideTextTimer);
        setHidetext(false);
    };

    const getLayouts = (event) => {
        if (meditationHeight >= event.nativeEvent.layout.height && flatlistheight === meditationHeight * prevListCount) {
            return false;
        }
        setmeditationheight(event.nativeEvent.layout.height);
        state.paused ? setFlatlistHeight(event.nativeEvent.layout.height * largeScrean) : setFlatlistHeight(event.nativeEvent.layout.height * prevListCount);
    };

    const scrollToItem = (index) => {
        flatListRef && flatListRef.current.scrollToIndex({ animated: true, index: index });
    };

    return (
        <View style={styles.meditationLists}>
            {
                prevListCount == largeScrean && (
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.5, y: 0 }}
                        colors={[`rgba(115, 176, 233,0.4) `, `rgba(115, 176, 233, 0.0001) `]}
                        style={styles.linerGradient}
                    />
                )
            }
            <Animated.View style={(
                { height: flatlistheight }
            )}>
                <View>
                    <FlatList
                        style={styles.flatList}
                        ref={flatListRef}
                        data={meditation}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        renderItem={item => <AppMeditationList
                            item={item}
                            pressToMeditation={pressToMeditation}
                            isHidetext={isHidetext}
                            getLayouts={getLayouts}
                        />
                        }
                    />
                </View>
                {!state.paused && (
                    <TouchableOpacity
                        style={{ paddingTop: 25 }}
                        onPress={pressOnAllList}>
                        <AppIcon
                            style={showAllList && styles.rotate}
                            icon={"arrowDown"}
                            width={32}
                            height={32}
                        />
                    </TouchableOpacity>
                )}
            </Animated.View>
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
    rotate: {
        transform: [{ rotate: "180deg" }]
    }
});

const mapStateToProps = ({
    profile: {
        meditation
    }
}) => ({
    meditation
});

export default connect(mapStateToProps)(MeditationLists);
