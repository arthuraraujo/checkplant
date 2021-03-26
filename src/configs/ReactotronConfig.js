import Reactotron from 'reactotron-react-native';
// import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';

const reactotron = Reactotron.configure({
  name: 'Mapa',
  host: '10.0.2.2',
})
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  //   .use(reactotronRedux())
  .connect();

const yeOldeConsoleLog = console.log;

// make a new one
console.log = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};

export default reactotron;
