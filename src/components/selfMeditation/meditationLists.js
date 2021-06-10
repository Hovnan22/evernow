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
    timePicker,
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
    const [animatedHeigh, setAnimatedHeigh] = useState(new Animated.Value(0))

    useEffect(() => {
        state.paused ? setFlatlistHeight(meditationHeight * largeScrean) : setFlatlistHeight(meditationHeight * prevListCount);
    }, [state.paused])

    useEffect(() => {

        if (selectedMeditation && prevListCount == smallScrean) {
            !state.paused && scrollToItem(selectedMeditation);
        }

        if (!isHidetext) {
            setHidetextTimer(
                setTimeout(() => {
                    setHidetext(true)
                }, 5000)
            );
        }

    }, [flatlistheight])

    const pressToMeditation = (index) => {

        if (prevListCount == smallScrean && !showAllList) {
            setFlatlistHeight(new Animated.Value(meditationHeight * mediumScrean));
            setPrevListCount(mediumScrean);
        } else {

            if (!state.paused) {
                setFlatlistHeight(new Animated.Value(meditationHeight));
                setPrevListCount(smallScrean);
                scrollToItem(index);
            }
            setSelectedMeditation(index);
            state.paused && onHideMeditation();
        }

        clearTimeout(hideTextTimer);
        setShowAllList(false);
        setHidetext(false);
    }

    const pressOnAllList = () => {
        const newHeight = meditationHeight * largeScrean;
        if (!showAllList) {
            Animated.timing(
                animatedHeigh,
                {
                    toValue:   1,
                    duration: 500,
                }
            ).start(() => {
                // setShowAllList(true);
                // setPrevListCount(largeScrean);
                // setFlatlistHeight(newHeight);
            });

            setFlatlistHeight( animatedHeigh.interpolate({
                    inputRange: [0, 1],
                    outputRange: [flatlistheight, newHeight],
                    extrapolate: "clamp",
                    // easing:   Easing.bounce ,
                })
            )
        } else {
            const smallHeight =  meditationHeight * smallScrean;
            const mediumHeight =  meditationHeight * mediumScrean;


            Animated.timing(
                flatlistheight,
                {
                    toValue: selectedMeditation ? smallHeight : mediumHeight,
                    duration: 1000,
                    easing:  Easing.ease,
                    useNativeDriver: false,
                }
            ).start(() => {
                setShowAllList(false);

                if (selectedMeditation) {
                    setPrevListCount(smallScrean);
                } else {
                    setPrevListCount(mediumScrean);
                }
                // setFlatlistHeight(new Animated.Value(selectedMeditation ? smallHeight : mediumHeight));
            });

        }
        clearTimeout(hideTextTimer);
        setHidetext(false);
    }

    const getLayouts = (event) => {

        if (meditationHeight >= event.nativeEvent.layout.height && flatlistheight === meditationHeight * prevListCount) {
            return false;
        }

        setmeditationheight(event.nativeEvent.layout.height);
        state.paused ?   setFlatlistHeight(event.nativeEvent.layout.height * largeScrean) : setFlatlistHeight(event.nativeEvent.layout.height * prevListCount);
    }

    const scrollToItem = (index) => {
        flatListRef && flatListRef.current.scrollToIndex({ animated: true, index: index });
    }

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
                            icon={showAllList ? "close" : "arrowDown"}
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
});

const mapStateToProps = ({
    profile: {
        meditation
    }
}) => ({
    meditation
});

export default connect(mapStateToProps)(MeditationLists);
