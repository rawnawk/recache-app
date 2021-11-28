import React, {useState, useEffect} from 'react';
import {View, Alert, FlatList, BackHandler} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'
import { Caption, Card, Avatar,IconButton,  Headline  } from 'react-native-paper';

dayjs.extend(customParseFormat)

export default function HomeScreen({navigation}){
  const [pages, setPages] = useState([])
  const [loadingPages, setLoadingPages] = useState(false)

  useEffect(()=>{
    navigation.addListener('focus', ()=>{
      getPages()
      setLoadingPages(false)
    })
  }, [])

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  function backAction(){
    Alert.alert("Hold on!", "Do you want to close the app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  async function getPages(){
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


  return (
    <View style={tw`flex-1`}>
        <StatusBar style="auto" />
        {pages.length===0 &&
          <View style={tw`items-center mt-4 mb-16`}>
            <IconButton color="gray" icon="timer-sand-empty" size={120} />
            <Headline style={tw`text-gray-500`}>Your life seems empty.</Headline>
            <Caption>Press on the add button on the bottom menu to get started.</Caption> 
        </View>
        }
        {!loadingPages &&
          <View style={tw`flex-1`}>
            <FlatList data={pages} keyExtractor={item => item.slug} renderItem={({item})=>{
              return (
                <Card style={tw`mx-3 my-2`} onPress={()=>navigation.navigate('ContentScreen', {pageslug: item.slug})}>
                  <Card.Title title={item.title} subtitle={dayjs(item.slug, "DD-MM-YYYY").format("ddd, Do MMM YY")} right={()=>(item.selfie&&
                      <Avatar.Image size={60} style={tw`mr-3`} source={{uri: item.selfie.uri}} />
                  )} />
                  
                </Card>
              )
            }} />
          </View>
        }
    </View>
  );
};