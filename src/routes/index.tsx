import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Header from '../pages/Header';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator screenOptions={{ header: Header }}>
    <AppStack.Screen name="RN CheckPlant" component={Home} />
  </AppStack.Navigator>
);

export default AppRoutes;
