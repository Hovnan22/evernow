import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  useLinking,
  NavigationContainer,
} from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'react-native-elements';

import { AppService } from './src/services';


import AppContainer from './src/components/AppContainer';
import { apolloClient } from './src/ApolloClient';

import {
  WelcomeRoot,
  LoggedInRoot,
} from './src/navigation';
import { connect } from 'react-redux';

// const secretKey = "eOJ7DvWfcLXs+k8vgqYjkXeWju1dnfmAoHEdVCNKMV+GMbK/tE8illXNiJeoPKXM";


const App = ({ isLoggedIn }) => {
  const ref = useRef();
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = useState();
  const { getInitialState } = useLinking(ref, {
    prefixes: ["everbuddy://"],
    config: {
      RecoveryPassword: "reset-password/:token",
    },
  });

  useEffect(() => {
    getInitialState().then(async (state) => {
      if (state !== undefined) {
        setInitialState(state);
      }
      await AppService.init();
      setIsReady(true);
    });
  }, [getInitialState]);

  return isReady && (
    <ApolloProvider client={apolloClient}>
      <AppContainer>
        <ThemeProvider>
          <NavigationContainer ref={ref} initialState={initialState}>
            {isLoggedIn ? (
              <LoggedInRoot />
            ) : (
              <WelcomeRoot />
            )}
          </NavigationContainer>
        </ThemeProvider>
      </AppContainer>
    </ApolloProvider>
  );
}

const mapStateToProps = ({ app: { isLoggedIn } }) => ({
  isLoggedIn,
});

export default connect(mapStateToProps)(App);