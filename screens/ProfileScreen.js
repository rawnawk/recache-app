import React from 'react'
import { View} from 'react-native'
import { Button } from 'react-native-paper'
import tw from 'twrnc'

export default function ProfileScreen({navigation}) {
    return (
        <View style={tw`flex-1`}>
            <View>
                <Button mode="outlined" onPress={()=>navigation.navigate('SettingsScreen')}>Settings</Button>
                <Button mode="outlined" onPress={()=>navigation.navigate('CustomizeScreen')}>Customize</Button>
            </View>
        </View>
    )
}
