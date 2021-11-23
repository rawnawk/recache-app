import React from 'react';
import StackNav from './routes/StackNav';
import { NavigationContainer } from '@react-navigation/native';
import {DefaultTheme,  Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#170821',
    accent: '#242E4B',
  },
};

export default function App() {
  return (
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <StackNav />
        </PaperProvider>
      </NavigationContainer>
  );
}
