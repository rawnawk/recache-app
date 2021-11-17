import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator 
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              
              let iconName
              switch (route.name) {
                case "Home":
                  iconName = 'home'
                  break;
                case "Search":
                  iconName = 'search'
                  break;
                case "DateSelector":
                  iconName = 'add-cirle'
                  break;
                default:
                  iconName = 'home'
                  break;
              }
              // You can return any component that you like here!
              return <MaterialIcons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: '#170821',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
          <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        </Tab.Navigator>
    );
  }