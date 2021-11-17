import React from 'react';
import StackNav from './routes/StackNav';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
  );
}
