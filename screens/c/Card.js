import React from 'react'
import { View, Text } from 'react-native'
import tw from 'twrnc'
import dayjs from 'dayjs'
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat)

export default function Card({data}) {
    return (
        <View style={tw`px-3 py-3 bg-white rounded-md shadow`}>
            <Text style={tw`text-xl mb-1`}>{data.title}</Text>
            <Text>{dayjs(data.slug, "DD-MM-YYYY").format("ddd, Do MMM YY")}</Text>
        </View>
    )
}