import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import ProfileStack from './ProfileStack'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc'
import dayjs from 'dayjs';
import { Button, Modal, Portal } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator initialRouteName="Home" tabBar={({navigation})=> {
          return (
            <CustomTabBar navigation={navigation} />
          )
        }} >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Profile" component={ProfileStack} options={{headerShown: false}} />
        </Tab.Navigator>
    );
  }

  function CustomTabBar({navigation}){
    const [dateModal, setDateModal] = useState(false)
    const [customDate, setCustomDate] = useState(new Date())

    const [showAndroidDatePicker, setShowAndroidDatePicker] = useState(false)

    let navState = navigation.getState()
    let currentScreen = navState.routeNames[navState.index]
    function handleNavigation(screenName){
      navigation.navigate(screenName)
    }
    function handleDatePicker(){
      setDateModal(true)
    }
    const onDateSelection = (event, selectedDate) => {
      const currentDate = selectedDate || customDate;
      setCustomDate(currentDate);
      setShowAndroidDatePicker(false)
    }
    function onCustomCreate(){
      setDateModal(false)
      navigation.navigate("ContentScreen", {pageslug: dayjs(customDate).format("DD-MM-YYYY")})
    }
    return (
      <View style={tw`flex-row justify-around items-center bg-gray-200 py-2.5 shadow-md`}>
        
        <TabButton icon="ios-home-sharp" title="Home" screen="Home" active={currentScreen === "Home"} handleNavigation={handleNavigation} />
        
        <TabButton icon="search" title="Search" screen="Search" active={currentScreen === "Search"} handleNavigation={handleNavigation} />

        <TouchableOpacity onPress={()=>navigation.navigate("ContentScreen", {pageslug: dayjs().format("DD-MM-YYYY")})} onLongPress={handleDatePicker}>
          <View style={tw`flex-col items-center`}>
            <Ionicons color='gray' name="add-circle" size={32} />
          </View>
        </TouchableOpacity>

        <TabButton icon="person-circle" title="Profile" screen="Profile" active={currentScreen === "Profile"} handleNavigation={handleNavigation} />

        {/* MODAL FOR SELECTING CUSTOM DATE */}
        {/* https://github.com/react-native-datetimepicker/datetimepicker */}
        {/* MODAL FOR SELECTING CUSTOM DATE */}
        {/* MODAL FOR SELECTING CUSTOM DATE */}
        <Portal>
          <Modal visible={dateModal} onDismiss={()=>setDateModal(false)}>
            <View style={tw`mx-6 bg-white shadow-md rounded-md p-6`}>
                {Platform.OS!=='android' && (
                  <>
                    <DateTimePicker textColor="black" value={customDate} display="spinner" onChange={onDateSelection} maximumDate={new Date()} />
                    <Button mode="contained" color="blue" onPress={onCustomCreate}>Create</Button>
                  </>
                )}
                {Platform.OS==='android' && (
                  <>
                    {showAndroidDatePicker &&
                      <DateTimePicker value={customDate} display="default" onChange={onDateSelection} maximumDate={new Date()} />
                    }
                    <Text style={tw`text-center text-lg mb-6`}>Selected Date: {dayjs(customDate).format("DD-MM-YYYY")}</Text>
                    <View style={tw`flex-row justify-around`}>
                      <Button style={tw`mr-3`} mode="contained" onPress={()=>setShowAndroidDatePicker(true)}>Change Date</Button>
                      <Button mode="contained" color="blue" onPress={onCustomCreate}>Create</Button>
                    </View>
                  </>
                )}
            </View>
          </Modal>
        </Portal>
        {/* MODAL FOR SELECTING CUSTOM DATE */}
        {/* MODAL FOR SELECTING CUSTOM DATE */}
        {/* MODAL FOR SELECTING CUSTOM DATE */}

      </View>
    )
  }
  function TabButton({icon, title, screen, active, handleNavigation}){
    return (
      <TouchableOpacity onPress={()=>handleNavigation(screen)}>
        <View style={tw`flex-col items-center px-2`}>
          <Ionicons name={icon} size={30} color={active ? '#170821' : 'gray'} />
          {/* <Text>{title}</Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  // tabBarActiveTintColor: '#170821',
  //           tabBarInactiveTintColor: 'gray',