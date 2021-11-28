import React, {useEffect, useState} from 'react';
import StackNav from './routes/StackNav';
import { NavigationContainer } from '@react-navigation/native';
import {Button, DefaultTheme,  Provider as PaperProvider } from 'react-native-paper';
import * as LocalAuthentication from 'expo-local-authentication';
import { Image, View } from 'react-native';
import tw from 'twrnc'
import recache_logo from './assets/icon.png'

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
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(()=>{
    verifyAuth()
  }, [])

  async function verifyAuth(){
    let result = await LocalAuthentication.authenticateAsync(
      'Scan your finger.'
    );

    setAuthenticated(result.success)
  }


  if(!authenticated){
    return(
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`mb-10`}>
          <Image source={recache_logo} style={{resizeMode: 'cover', width: 400, height: 100}} />
        </View>
        <View style={tw``}>
          <Button onPress={verifyAuth} mode="contained">Retry Fingerprint</Button>
        </View>
      </View>
    )
  }

  return (
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <StackNav />
        </PaperProvider>
      </NavigationContainer>
  );
}
