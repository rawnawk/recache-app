import React, {useState} from 'react'
import { View, FlatList, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Searchbar, Card, Caption } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'
import dayjs from 'dayjs';

export default function SearchScreen({navigation}) {
    const [loadingPages, setLoadingPages] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [results, setResults] = useState([])

    async function getPages(){
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
          return temp
        }catch(err){
          Alert.alert(err)
        }
    }

    async function searchFunction(searchString){
        setSearchQuery(searchString)
        if(searchString.length > 3){
            setLoadingPages(true)
            let pages = await getPages()
            let tempResults = []
    
            pages.forEach((page)=>{
                let titleVal = page.title
                if(titleVal.toUpperCase().indexOf(searchString.toUpperCase()) > -1){
                    tempResults.push(page)
                }
            })
            setResults(tempResults)
            setLoadingPages(false)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={tw`flex-1`}>
                <View>
                    <Searchbar placeholder="Search" onChangeText={searchFunction} value={searchQuery} />
                </View>
                {!loadingPages &&
                    <View style={tw`flex-1`}>
                        <FlatList data={results} keyExtractor={item => item.slug} renderItem={({item})=>{
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
        </TouchableWithoutFeedback>
    )
}
