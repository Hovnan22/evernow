import React from "react";
import { StyleSheet } from 'react-native';

import { AppText } from '../../components/ui';
import { Colors } from '../../styles';


const MainTexts = ({ user, startTime }) => (
  <>
    {!user?.room && startTime > 0 && (
      <AppText style={styles.text}>
        {"screen.home.searching"}
      </AppText>
    )}
    {!user?.room && (
      <AppText style={styles.text}>
        {"screen.home.found"}
      </AppText>
    )}
    {user?.room  && (
      <AppText style={styles.text}>
        {"screen.home.notFound"}
      </AppText>
    )}
  </>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.dark100,
    marginBottom: 20,
  },
})

export default MainTexts;
