import React, {useEffect, useState} from 'react'
import {TextInput, View, ScrollView, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard , Alert, FlatList, Image  } from 'react-native'
import dayjs from 'dayjs'
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'
import { Headline, FAB, Text, Modal, Caption , Button, Paragraph, Card, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)

export default function ContentScreen({route, navigation}) {
    const {pageslug} = route.params

    const [page, setPage] = useState(null)
    const [createNewModal, setCreateNewModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")    

    const [open, setOpen] = useState(false) //for Floating Action Button
    const [textModal, setTextModal] = useState(false)
    const [newText, setNewText] = useState("")

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
            data: [],
            selfie: null
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
    async function saveText(){
        let newPageData = page
        let newTextToBeSaved = {
            createdAt: new Date(),
            type: "text",
            content: newText
        }
        newPageData.data.push(newTextToBeSaved)
        try{
            await AsyncStorage.setItem(page.slug, JSON.stringify(newPageData)).then(()=>{
                setPage(newPageData)
                setNewText("")
                setTextModal(false)
            })
        }catch(err){
            Alert.alert(err)
        }
    }
    async function attachSelfieToPage(){
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        let pickerResult = await ImagePicker.launchCameraAsync()
        if (pickerResult.cancelled === true) {
            return;
        }
        let newPageData = page
        newPageData.selfie = pickerResult
        try{
            await AsyncStorage.setItem(page.slug, JSON.stringify(newPageData))
            checkPageExists()
        }catch(err){
            Alert.alert(err)
        }
    }
    async function addImageToPage(){
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync()
        if (pickerResult.cancelled === true) {
            return;
        }
        let newPageData = page
        let newImageToBeSaved = {
            createdAt: new Date(),
            type: "image",
            content: pickerResult
        }
        newPageData.data.push(newImageToBeSaved)
        try{
            await AsyncStorage.setItem(page.slug, JSON.stringify(newPageData))
            checkPageExists()
        }catch(err){
            Alert.alert(err)
        }
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
                <Modal visible={createNewModal} onDismiss={handleCancle} style={tw`justify-start`}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView>
                        <View style={tw`mx-4 rounded-md bg-white py-12 px-4`}>
                            <View>
                                <Text>{dayjs(pageslug, "DD-MM-YYYY").format("dddd, Do MMM")}</Text>
                            </View>
                            <View>
                                <Text style={tw`text-xl mb-2`}>Add a Title</Text>
                                <TextInput style={tw`border rounded-md border-gray-200 text-black p-2.5`} placeholder="Title" value={title} onChangeText={(val)=>setTitle(val)} autoFocus={true} />
                            </View>
                            <View style={tw`flex-row justify-center mt-16`}>
                                <Button mode="contained" disabled={title.length<4} onPress={createPage}>Create</Button>
                                <Button color="red" onPress={handleCancle}>Cancel</Button>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }

    return (
        <>
            <ScrollView style={tw`flex-1 bg-white`}>
                <View style={tw`items-center mt-4 mb-4`}>
                    <Headline>{page?.title}</Headline>
                    <Caption>{dayjs(page?.slug, "DD-MM-YYYY").format("dddd, Do MMM")}</Caption>
                </View>
                <View style={tw`mb-4`}>
                    {page?.selfie && 
                        <Image source={{ uri: page?.selfie?.uri }} style={{
                            flex: 1,
                            height: 300,
                            resizeMode: "cover"
                          }} />
                    }
                </View>
                <View style={tw`mx-3 mb-4`}>
                    {page?.data.length===0 && !page?.selfie && 
                        <View style={tw`items-center mt-4 mb-16`}>
                            <IconButton color="gray" icon="timer-sand-empty" size={120} />
                            <Headline style={tw`text-gray-500`}>Your day seems empty.</Headline>
                            <Caption>Press on the floating button to add a widget.</Caption> 
                        </View>
                    }
                    {page?.data.map((content, key)=>{
                        if(content.type==="text"){
                            return (
                                <Card key={key} style={tw`mb-4`}>
                                    <Card.Content>
                                        <Paragraph style={tw`text-lg`}>{content.content}</Paragraph>
                                    </Card.Content>
                                </Card>
                            )
                        }else if(content.type==="image"){
                            return(
                                <Card key={key} style={tw`mb-4`}>
                                    <Card.Cover source={{ uri: content.content.uri }} />
                                </Card>
                            )
                        }
                    })}
                </View>
                <View style={tw`mb-8 flex-row justify-around`}>
                    {/* <Button>Edit Page</Button> */}
                    <Button onPress={deletePage} color="red">Delete Page</Button>
                </View>
            </ScrollView>



            <FAB.Group open={open} icon={open ? 'close' : 'plus'} onStateChange={({ open }) => setOpen(open)} actions={[
                { icon: 'account',
                    label: 'Selfie',
                    onPress: () => attachSelfieToPage(),},
                { icon: 'format-text',
                    label: 'Text',
                    onPress: () => setTextModal(true),},
                { icon: 'image',
                    label: 'Image',
                    onPress: () => addImageToPage(),},
            ]} />
            {/* ########################### */}
            {/* ########################### */}
            <Modal visible={textModal} onDismiss={()=>{setNewText("");setTextModal(false);}} style={tw`justify-start`}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={tw`mx-4 mt-6 p-4 bg-white rounded`}>
                        <Text style={tw`text-xl text-center mb-3`}>Text Widget</Text>
                        <View style={tw``}>
                            <TextInput style={tw`border-gray-300 border h-[150px] p-2`} multiline={true} value={newText} onChangeText={(val)=>setNewText(val)} autoFocus={true} />
                        </View>
                        <View style={tw`flex-row justify-end mt-3`}>
                            <Button color="red" onPress={()=>{setNewText("");setTextModal(false);}}>Cancel</Button>
                            <Button style={tw`mr-2`} disabled={newText.length < 4} mode="contained" onPress={saveText}>Save</Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {/* ########################### */}
            {/* ########################### */}
        </>
    )
}
