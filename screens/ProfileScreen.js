import React from 'react'
import { View} from 'react-native'
import { Button,IconButton,Headline,Caption } from 'react-native-paper'
import tw from 'twrnc'

export default function ProfileScreen({navigation}) {
    return (
        <View style={tw`flex-1`}>
            <View>
                <View style={tw`items-center mt-4 mb-16`}>
                    <IconButton color="gray" icon="account" size={120} />
                    <Headline style={tw`text-gray-500`}>Unavailable</Headline>
                    <Caption>Profile features will be enabled soon.</Caption> 
                </View>
                <Button mode="outlined" onPress={()=>navigation.navigate('SettingsScreen')}>Settings</Button>
                {/* <Button mode="outlined" onPress={()=>navigation.navigate('CustomizeScreen')}>Customize</Button> */}
            </View>
        </View>
    )
}
