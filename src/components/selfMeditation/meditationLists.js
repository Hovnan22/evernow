import React, {
    useRef,
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
    state,
    meditation,
    timePicker,
    prevListCount,
    flatlistheight,
    meditationHeight,
    setPrevListCount,
    onHideMeditation,
    setFlatlistHeight,
    selectedMeditation,
    setSelectedMeditation,
    setmeditationheight,
}) => {
    const smallScrean = 1;
    const largeScrean = 5;
    const mediumScrean = 3;
    const flatListRef = useRef();
    const [isHidetext, setHidetext] = useState(false);
    const [hideTextTimer, setHidetextTimer] = useState();

    const [showAllList, setShowAllList] = useState(false);
    useEffect(() => {

        if (selectedMeditation && prevListCount == smallScrean) {
            scrollToItem(selectedMeditation);
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
        if (prevListCount == smallScrean && !showAllList ) {
            setFlatlistHeight(meditationHeight * mediumScrean);
            setPrevListCount(mediumScrean);
        } else {
            setFlatlistHeight(meditationHeight);
            setPrevListCount(smallScrean);
            setSelectedMeditation(index);
            scrollToItem(index);
            state.paused && onHideMeditation();
        }

        clearTimeout(hideTextTimer);
        setShowAllList(false);
        setHidetext(false);
    }
    const pressOnAllList = () => {
        if (!showAllList) {
            setShowAllList(true);
            setPrevListCount(largeScrean);
            setFlatlistHeight(meditationHeight * largeScrean);

        } else {
            setShowAllList(false);
            if (selectedMeditation) {
                setPrevListCount(smallScrean);
                setFlatlistHeight(meditationHeight * smallScrean);
            } else {
                setPrevListCount(mediumScrean);
                setFlatlistHeight(meditationHeight * mediumScrean);
            }
        }
        clearTimeout(hideTextTimer);
        setHidetext(false);
    }

    const getLayouts = (event) => {
        if (meditationHeight >= event.nativeEvent.layout.height && flatlistheight === meditationHeight * prevListCount) {
            return false;
        }
        setmeditationheight(event.nativeEvent.layout.height);
        setFlatlistHeight(event.nativeEvent.layout.height * prevListCount);
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
            <View style={{ height: flatlistheight }}>
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
