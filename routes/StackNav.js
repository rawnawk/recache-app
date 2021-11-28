import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNav from './TabNav';
import ContentScreen from '../screens/ContentScreen';
import SettingsScreen from '../screens/SettingsScreen'
import CustomizeScreen from '../screens/CustomizeScreen'

const Stack = createNativeStackNavigator();


export default function StackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false }} />
            <Stack.Screen name="ContentScreen" component={ContentScreen} options={{headerTitle: ""}} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerTitle: "Settings"}} />
            <Stack.Screen name="CustomizeScreen" component={CustomizeScreen} options={{headerTitle: "Customize"}} />
        </Stack.Navigator>
    )
}
