import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const DriverAppointmentDetailScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }} showsVerticalScrollIndicator={false}>
                    {transportInfo()}
                    {transportDetail()}
                </ScrollView>
            </View>
            {callAndChatButton()}
        </View>
    )

    function callAndChatButton() {
        return (
            <View>
                <View style={{ flexDirection: 'row', borderTopColor: Colors.bodyBackColor, borderTopWidth: 1.0, }}>
                    {/* Confirm Button */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { /* handle confirm logic */ }}
                        style={{ backgroundColor: Colors.greenColor, ...styles.smallButtonStyle }}
                    >
                        <Text style={{ ...Fonts.whiteColor17Bold }}>
                            Confirm
                        </Text>
                    </TouchableOpacity>

                    {/* Cancel Button */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { /* handle cancel logic */ }}
                        style={{ backgroundColor:'grey', ...styles.smallButtonStyle }}
                    >
                        <Text style={{ ...Fonts.whiteColor17Bold }}>
                        Reschedule
                        </Text>
                    </TouchableOpacity>

                    {/* Delete Button */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { /* handle delete logic */ }}
                        style={{ backgroundColor: Colors.redColor, ...styles.smallButtonStyle }}
                    >
                        <Text style={{ ...Fonts.whiteColor17Bold }}>
                           Cancel
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Chat Button */}
                <View style={{ flexDirection: 'row', borderTopColor: Colors.bodyBackColor, borderTopWidth: 1.0, }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { navigation.push('ChatWithDoctor') }}
                        style={{ backgroundColor: Colors.primaryColor, ...styles.buttonStyle }}
                    >
                        <MaterialIcons name='chat' color={Colors.whiteColor} size={20} />
                        <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor17Bold, }}>
                            Chat
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function transportDetail() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, }}>

                {appointmentDetailShort({ title: 'Transport Date & Time', value: '12 Jan 2020 • 12:00 pm', icon: 'timer' })}
                {divider()}
                {appointmentDetailShort({ title: 'Transport Type', value: 'Pickup' })}
            </View>
        )
    }

    function divider() {
        return (
            <View style={{ backgroundColor: Colors.bodyBackColor, height: 1.0, marginVertical: Sizes.fixPadding * 2.0 }} />
        )
    }

    function appointmentDetailShort({ title, value, icon }) {
        return (
            <View>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    {title}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name={icon} size={22} color={Colors.primaryColor} />
                    <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.grayColor14Medium }}>
                        {value}
                    </Text>
                </View>
            </View>
        )
    }

    function transportInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                // onPress={() => { navigation.push('DoctorReviews') }}
                style={styles.doctorInfoWrapStyle}
            >
                <View style={{ ...styles.doctorImageBackgroundStyle, }}>
                    <Image
                        source={require('../../assets/images/users/user8.png')}
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
                        	Mrs Richards woods
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Tranport detail
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default DriverAppointmentDetailScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    doctorImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: 120,
        width: width / 3.5,
        alignItems: 'center',
        backgroundColor: Colors.purpleColor,
    },
    doctorImageStyle: {
        width: (width / 3.5) - 15.0,
        height: '100%',
        resizeMode: 'fill',
        position: 'absolute',
        bottom: 0.0,
    },
    doctorInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 4.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    smallButtonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 1.5,
        marginHorizontal: Sizes.fixPadding / 2,
    },
})
