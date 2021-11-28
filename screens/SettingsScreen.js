import React, {useState, useEffect} from 'react'
import { View, Alert  } from 'react-native'
import { ActivityIndicator, Button,Snackbar  } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'

export default function Settings() {
    const [snack, setSnack] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clearAllDisabled, setClearAllDisabled] = useState(false)

    useEffect(()=>{
        setLoading(true)
        disableClearAllButton()
    }, [])

    async function disableClearAllButton(){
        let keys
        try{
            keys = await AsyncStorage.getAllKeys()
        }catch(err){
            Alert.alert(err)
        }

        if(keys.length===0){
            setClearAllDisabled(true)
        }
        setLoading(false)
    }


    function deleteAlert(){
        Alert.alert(
            "Delete Everything",
            "Are you sure? This change is permanent.",
            [
              {
                text: "Confirm",
                onPress: () => deleteAll()
              },
              {
                text: "Cancel",
                style: "cancel"
              }
            ]
          );
    }

    async function deleteAll(){
        try {
          await AsyncStorage.clear()
        } catch(e) {
          Alert.alert(e)
        }
        
        setClearAllDisabled(true)
        setSnack(true)
      }

    if(loading){
        return (
            <ActivityIndicator />
        )
    }

    return (
        <View style={tw`flex-1`}>
            <Button disabled={clearAllDisabled} mode="outlined" color="red" onPress={deleteAlert}>Clear all data.</Button>
            <Snackbar onDismiss={()=>setSnack(false)} visible={snack} >Deleted</Snackbar>
        </View>
    )
}
