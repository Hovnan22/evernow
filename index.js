import React from 'react';
import { registerRootComponent } from "expo";
import "expo-asset";
import App from "./App";
import { Provider } from 'react-redux';
import { Store } from './src/config';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(() => (
  <Provider store={Store}>
    <App />
  </Provider>
));

console.disableYellowBox = true;
