//https://github.com/react-native-datetimepicker/datetimepicker


import React, {useState, useEffect} from 'react';
import {View, Button, Platform, Alert, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from "./c/Card"

dayjs.extend(customParseFormat)

export default function HomeScreen({navigation}){
  const [pages, setPages] = useState([])
  const [loadingPages, setLoadingPages] = useState(false)

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(()=>{
    getPageKeys()
    setLoadingPages(false)
  },[])

  async function getPageKeys(){
    setLoadingPages(true)
    let keys, pages
    try{
      keys = await AsyncStorage.getAllKeys()
    }catch(err){
      Alert.alert(err)
    }
    try{
      pages = await AsyncStorage.multiGet(keys)
      let temp = pages.map((item)=>{
        return JSON.parse(item[1])
      })
      temp.sort((a,b)=>dayjs(b.slug, "DD-MM-YYYY").valueOf() - dayjs(a.slug, "DD-MM-YYYY").valueOf())
      setPages(temp)
    }catch(err){
      Alert.alert(err)
    }
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function handleCreate(){
    navigation.navigate('ContentScreen', {pageslug: dayjs(date).format("DD-MM-YYYY")})
  }

  return (
    <View>
        <StatusBar />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
        <Button title="Create" onPress={handleCreate} />
        {!loadingPages &&
          <FlatList data={pages} keyExtractor={item => item.slug} renderItem={({item})=>{
            return (
                <ScrollView>
                  <TouchableOpacity onPress={()=>navigation.navigate('ContentScreen', {pageslug: item.slug})}>
                    <Card data={item} />
                  </TouchableOpacity>
                </ScrollView>
            )
          }} />
        }
    </View>
  );
};