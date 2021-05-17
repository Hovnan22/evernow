import React from 'react';
import { View, StyleSheet, ActivityIndicator, } from 'react-native';

const AppLoader = ({ isLoading, size, color, wrapperStyle }) => (
  <View style={[styles.loaderWrapper, wrapperStyle]}>
    <ActivityIndicator animating={isLoading} hidesWhenStopped={true} size={size} color={color} />
  </View>
);

AppLoader.defaultProps = {
  size: 50,
  color: '#88245F'
};

const styles = StyleSheet.create({
  loaderWrapper: {
    position: 'absolute',
    height: '120%',
    width: '120%',
    left: '-10%',
    top: '-10%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000000000,
    backgroundColor: 'rgba(0,0,0,.7)',
    elevation: 10
  }
});


export default AppLoader;