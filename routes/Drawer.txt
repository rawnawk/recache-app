import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from "../screens/SettingsScreen"
import TabNav from './TabNav';



const DrawerNav = createDrawerNavigator();

export default function Drawer() {
  return (
      <DrawerNav.Navigator initialRouteName="HomeStack">
        <DrawerNav.Screen 
          name="TabNav" 
          component={TabNav}
          options={{
            drawerLabel: "Home",
            headerTitle: "Recache"
          }}  
        />
        <DrawerNav.Screen name="Settings" component={SettingsScreen} />
      </DrawerNav.Navigator>
  );
}