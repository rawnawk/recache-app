import React, {useState, useEffect} from 'react';
import {View, Alert, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'
import { Caption, Card } from 'react-native-paper';

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
        {!loadingPages &&
          <View style={tw`flex-1`}>
            <FlatList data={pages} keyExtractor={item => item.slug} renderItem={({item})=>{
              return (
                <Card style={tw`mx-3 my-2`} onPress={()=>navigation.navigate('ContentScreen', {pageslug: item.slug})}>
                  <Card.Title title={item.title} />
                  <Card.Content>
                    <Caption>{dayjs(item.slug, "DD-MM-YYYY").format("ddd, Do MMM YY")}</Caption>
                  </Card.Content>
                </Card>
              )
            }} />
          </View>
        }
    </View>
  );
};