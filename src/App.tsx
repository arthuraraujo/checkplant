import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as SynProvider } from './contexts/sync';
import theme from './theme';
// import './configs/ReactotronConfig';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <SynProvider>
          <Routes />
        </SynProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
