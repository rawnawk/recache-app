import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNav from './TabNav';
import ContentScreen from '../screens/ContentScreen';

const Stack = createNativeStackNavigator();


export default function StackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false }} />
            <Stack.Screen name="ContentScreen" component={ContentScreen} options={{headerTitle: ""}} />
        </Stack.Navigator>
    )
}
