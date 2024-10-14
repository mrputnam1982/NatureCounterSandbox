 // `@expo/metro-runtime` MUST be the first import to ensure Fast Refresh works
// on web.
// import '@expo/metro-runtime';

// // import { App } from 'expo-router/build/qualified-entry';
// import RootLayout from './app/_layout';
// import { renderRootComponent } from 'expo-router/build/renderRootComponent';

// // This file should only import and register the root. No components or exports
// // should be added here.
// renderRootComponent(RootLayout);
// import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import AppNC from './AppNC'
// import RootLayout from "./app/_layout";

import { Provider } from 'react-redux';
import { Map } from 'immutable';
import {View, Text} from 'react-native'
import configure from './redux/store'
import rootReducer from "./redux/reducers";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const initialState = Map({});
const store = configure(initialState);

// Must be exported or Fast Refresh won't update the context
export default function App() {
  //const ctx = require.context("./app");
  console.log("Index entry point reached");
  return (
  // <View><Text>Entry point reached</Text></View>
    <Provider store={store}>
     <GestureHandlerRootView>
      <AppNC/>
     </GestureHandlerRootView>
    </Provider>
  )
  // return <Application/>
}
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
