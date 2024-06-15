import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { name as appName } from './app.json';
import AppContext from './context';

const App = () => {
  return <AppContext>
    <AppNavigator />
  </AppContext>;
};

AppRegistry.registerComponent(appName, () => App);
export default App;
