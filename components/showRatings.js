import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/styles'

export function showRating({ number }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {
                (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 || number == 1.0)
                    ?
                    <MaterialIcons name="star" size={14} color={Colors.darkYellowColor} />
                    :
                    <MaterialIcons name="star" size={14} color={Colors.lightGrayColor} />
            }
            {
                (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0)
                    ?
                    <MaterialIcons name="star" size={14} color={Colors.darkYellowColor} />
                    :
                    <MaterialIcons name="star" size={14} color={Colors.lightGrayColor} />
            }
            {
                (number == 5.0 || number == 4.0 || number == 3.0)
                    ?
                    <MaterialIcons name="star" size={14} color={Colors.darkYellowColor} />
                    :
                    <MaterialIcons name="star" size={14} color={Colors.lightGrayColor} />
            }
            {
                (number == 5.0 || number == 4.0)
                    ?
                    <MaterialIcons name="star" size={14} color={Colors.darkYellowColor} />
                    :
                    <MaterialIcons name="star" size={14} color={Colors.lightGrayColor} />
            }
            {
                (number == 5.0) ?
                    <MaterialIcons name="star" size={14} color={Colors.darkYellowColor} />
                    :
                    <MaterialIcons name="star" size={14} color={Colors.lightGrayColor} />
            }
        </View>
    )
}