import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Drawer from './Drawer';
import ContentScreen from '../screens/ContentScreen';

const Stack = createNativeStackNavigator();


export default function StackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Drawer" component={Drawer} options={{headerShown: false}} />
            <Stack.Screen name="ContentScreen" component={ContentScreen} options={{headerTitle: "Today"}} />
        </Stack.Navigator>
    )
}
