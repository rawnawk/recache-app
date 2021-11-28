import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen'
import SettingsScreen from '../screens/SettingsScreen'
import CustomizeScreen from '../screens/CustomizeScreen'

const Stack = createNativeStackNavigator();


export default function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="ProfileScreen">
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerTitle: "Profile"}} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerTitle: "Settings"}} />
            <Stack.Screen name="CustomizeScreen" component={CustomizeScreen} options={{headerTitle: "Customize"}} />
        </Stack.Navigator>
    )
}
