import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import Background1 from "../../assets/icons/Group64.svg";
import Background2 from "../../assets/icons/Group63.svg";

import Text from "./text";
import { Loader } from '../home';

import {
  Grid,
  Colors,
} from '../../styles';


const Card = ({
  type1,
  type2,
  label,
  children,
  showLoader,
}) => {
  return type1 ? (
    <View style={styles.container1}>
      <View style={styles.content1}>
        {children}
      </View>
      <Background1 style={styles.image1} />
    </View>
  ) :
    type2 ? (
      <View style={styles.container2}>
        <View style={styles.content2}>
          {label && <Text style={styles.label}>{label}</Text>}
          {children}
        </View>
        <Background2 width="100%" style={styles.image2} />
      </View>
    ) :
      (
        <View style={styles.gradientWrapper}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.gradient}
            colors={['rgba(115, 176, 233, 0.3)', 'rgba(115, 176, 233, 0.2)']}
          >
            <View style={styles.container3} >
              <View style={styles.content3}>
                {children}
              </View>
            </View>

          </LinearGradient>
          {showLoader && (
            <View style={styles.loader}>
              <Loader />
            </View>
          )}
        </View>

      );
}
const styles = StyleSheet.create({
  container1: {
    minHeight: 370,
  },
  content1: {
    zIndex: 2,
    padding: 24,
    paddingTop: 64,
  },
  image1: {
    position: "absolute",
    bottom: 0,
  },
  container2: {
    minHeight: 300,
  },
  content2: {
    zIndex: 2,
    padding: 24,
    paddingBottom: 120,
  },
  image2: {
    position: "absolute",
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: Colors.textDarken,
    paddingBottom: 12,
  },
  container3: {
    backgroundColor: Colors.white,
    borderRadius: 40,
    flex: 1,
  },
  gradient: {
    borderRadius: 40,
    flex: 1,
    paddingBottom: 3,
  },
  gradientWrapper: {
    borderRadius: 40,
    flex: 1,
    marginTop: 74,
    marginBottom: 48,
  },
  content3: {
    flex: 1,
    padding: 24,
    zIndex: 2,
  },

  loader: {
    ...Grid.centeredX,
    position: "absolute",
    bottom: -43,
    left: "50%",
    right: "50%",
    zIndex: 100,
  },
});

export default Card;
