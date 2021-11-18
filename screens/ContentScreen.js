import React, {useEffect, useState} from 'react'
import { View, Text, Modal, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard , Alert, Button  } from 'react-native'
import dayjs from 'dayjs'
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'

dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)

export default function ContentScreen({route, navigation}) {
    const {pageslug} = route.params

    const [page, setPage] = useState(null)
    const [createNewModal, setCreateNewModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")    

    useEffect(()=>{
        checkPageExists()
    }, [pageslug])

    async function checkPageExists(){
        setLoading(true)
        try{
            const value = await AsyncStorage.getItem(pageslug)
            if(value !== null){
                setPage(JSON.parse(value))
                setLoading(false)
                return
            }else{
                setCreateNewModal(true)
            }
        }catch(err){
            Alert.alert(err)
        }
    }

    async function createPage(){
        const pageData = {
            createdAt: new Date(),
            slug: pageslug,
            emote: null,
            title: title,
            data: []
        }
        try{
            await AsyncStorage.setItem(pageslug, JSON.stringify(pageData))
            setPage(pageData)
            setLoading(false)
        }catch(err){
            Alert.alert(err)
        }
    }
    function handleCancle(){
        setCreateNewModal(false)
        navigation.goBack()
    }
    async function deletePage(){
        try{
            await AsyncStorage.removeItem(pageslug)
            navigation.goBack()
        }catch(err){
            Alert.alert(err)
        }
    }
    if(loading){
        return (
            <View style={tw`flex-1 justify-center`}>
                <ActivityIndicator />
                <Modal animationType="slide" transparent={true} visible={createNewModal} onRequestClose={handleCancle}>
                    <TouchableWithoutFeedback onPress={handleCancle}>
                        <KeyboardAvoidingView style={tw`flex-1 bg-gray-300`}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={tw`my-20 mx-6 bg-white shadow-md rounded-md py-12 px-4 justify-center`}>
                                    <View>
                                        <Text>{dayjs(pageslug, "DD-MM-YYYY").format("dddd, Do MMM")}</Text>
                                    </View>
                                    <View>
                                        <Text style={tw`text-xl uppercase mb-4`}>Add a Title</Text>
                                        <TextInput style={tw`border rounded-md border-gray-200 text-black p-2.5`} placeholder="Title" value={title} onChangeText={(val)=>setTitle(val)} autoFocus={true} />
                                    </View>
                                    <View style={tw`flex-row justify-center mt-16`}>
                                        <Pressable style={tw`mr-4`}>
                                            <View style={tw`rounded-md bg-[#170821] px-4 py-2.5`}>
                                                <Text style={tw`text-white`} onPress={createPage}>Create</Text>
                                            </View>
                                        </Pressable>
                                        <Pressable android_ripple={{color: "white"}}>
                                            <View style={tw`rounded-md bg-red-500 px-4 py-2.5`}>
                                                <Text style={tw`text-white`} onPress={handleCancle}>Cancel</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }

    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Text>{page?.title}</Text>
            <Button onPress={deletePage} title="Delete" />
        </View>
    )
}
