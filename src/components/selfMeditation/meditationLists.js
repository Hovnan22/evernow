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
    meditation,
    selectedMeditation,
    setSelectedMeditation
}) => {
    const smallScrean = 1;
    const mediumScrean = 5;
    const flatListRef = useRef();
    const [isHidetext, setHidetext] = useState(false);
    const [hideTextTimer, setHidetextTimer] = useState();
    const [prevListCount, setPrevListCount] = useState(5);
    const [flatlistheight, setFlatlistHeight] = useState(0);
    const [meditationHeight, setmeditationheight] = useState(0);
    const [showAllList, setShowAllList] = useState(false);

    useEffect(() => {
        console.log(prevListCount, 'prevListCount')
        if (selectedMeditation) {
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
        if (prevListCount == smallScrean && !showAllList) {
            setFlatlistHeight(meditationHeight * mediumScrean);
            setPrevListCount(mediumScrean);
        } else {
            setFlatlistHeight(meditationHeight);
            setPrevListCount(smallScrean);
            setSelectedMeditation(index);
            scrollToItem(index);
        }

        clearTimeout(hideTextTimer);
        setShowAllList(false);
        setHidetext(false);
    }
    const pressOnAllList = () => {
        if (!showAllList) {
            setShowAllList(true);
            setPrevListCount(10);
            setFlatlistHeight(meditationHeight * meditation.length);

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
        setmeditationheight(Math.ceil(event.nativeEvent.layout.height));
        setFlatlistHeight(meditationHeight * prevListCount);
    }



    const scrollToItem = (index) => {
        console.log(flatListRef)
        flatListRef.current.scrollToIndex({ animated: true, index: index });
    }

    return (
        <View style={styles.meditationLists}>
            {/* {
                prevListCount == 5 && ( 
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.5, y: 0 }}
                    colors={[`rgba(115, 176, 233,0.4) `, `rgba(115, 176, 233, 0.0001) `]}
                    style={styles.linerGradient}
                /> 
                )
            } */}
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
                <TouchableOpacity
                    style={{ paddingTop: 25 }}
                    onPress={pressOnAllList}>
                    <AppIcon
                        icon="yog"
                        width={32}
                        height={32}
                    />
                </TouchableOpacity>
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
