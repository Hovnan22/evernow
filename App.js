import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
} from 'react';
import {
  useLinking,
  NavigationContainer,
} from '@react-navigation/native';
import i18n from 'i18n-js';
import { ApolloProvider } from '@apollo/client';
import * as Localization from 'expo-localization';
import { ThemeProvider } from 'react-native-elements';

import translations from './src/translations';
import AppContext, { appReducer, getSettingsFromFile } from './src/context/AppContext';
import AppContainer from './src/components/AppContainer';
import { apolloClient } from './src/ApolloClient';

import {
  WelcomeRoot,
  LoggedInRoot,
} from "./src/navigation"

// const secretKey = "eOJ7DvWfcLXs+k8vgqYjkXeWju1dnfmAoHEdVCNKMV+GMbK/tE8illXNiJeoPKXM";
const { timezone, locale } = Localization;

let config = {};

i18n.translations = translations;
i18n.locale = "ru";
i18n.fallbacks = "ru";

export default function App() {
  const ref = useRef();
  const [isReady, setIsReady] = React.useState(false);
  const [configLoaded, setConfigLoaded] = React.useState(false);
  const [initialState, setInitialState] = useState();
  const [app, dispatch] = useReducer(appReducer, {
    auth: {},
    settings: { locale, timezone },
  });
  const { getInitialState } = useLinking(ref, {
    prefixes: ["everbuddy://"],
    config: {
      RecoveryPassword: "reset-password/:token",
    },
  });
  useEffect(() => {
    getInitialState().then((state) => {
      if (state !== undefined) {
        setInitialState(state);
      }
      setIsReady(true);
    });
  }, [getInitialState]);
  useEffect(() => {
    (async () => {
      config = JSON.parse(await getSettingsFromFile());
      try {
        // const tokenInformation = await JWT.decode(config.auth.accessToken, secretKey);
        dispatch({
          type: "SET_INSTANCE",
          payload: {
            ...config,
            // ...tokenInformation,
          },
        });
        setConfigLoaded(true);
      } catch (e) {
        setConfigLoaded(true);
      }
    })();
  }, []);
  return isReady && configLoaded && (
    <ApolloProvider client={apolloClient}>
      <AppContext.Provider value={{ app, dispatch }}>
        <AppContainer>
          <ThemeProvider>
            <AppContext.Consumer>
              {(consumer) => (
                <NavigationContainer initialState={initialState} ref={ref}>
                  {consumer.app.auth.accessToken ? (
                    <LoggedInRoot />
                  ) : (
                    <WelcomeRoot />
                  )}
                </NavigationContainer>
              )}
            </AppContext.Consumer>
          </ThemeProvider>
        </AppContainer>
      </AppContext.Provider>
    </ApolloProvider>
  );
}
