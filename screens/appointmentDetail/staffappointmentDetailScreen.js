import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';
import useGetAppointmentDetails from '../../hooks/useGetBookingDetails';
import useUpdateAppointmentStatus from '../../hooks/useUpdateBookingStatus';
import Successfull from '../../components/successfull';
import useCreateConversation from '../../hooks/useCreateConversation';

const { width } = Dimensions.get('window');

const StaffAppointmentDetailScreen = ({ navigation, route }) => {
    const { appointmentId } = route.params; 
    const { appointmentDetails, loading: loadingDetails, error: errorDetails } = useGetAppointmentDetails(appointmentId);
    const { loading: loadingStatus, error: errorStatus, changeStatus } = useUpdateAppointmentStatus();
    const [showSuccess, setShowSuccess] = useState(false);
    const { createConversation, loading: loadingConversation, error } = useCreateConversation();

    
    const handleCancel = async () => {
        try {
            const success = await changeStatus(appointmentId, 'cancelled');
            if (success) {
                setShowSuccess(true); 
            } else {
                Alert.alert('Error', 'Failed to cancel the appointment'); 
            }
        } catch (error) {
            console.error("Error in handleCancel:", error);
        }
    };

    const handleCreateConversation = useCallback(async () => {
        try {
            const { providerId, providerFirstName, providerLastName, providerProfile_picture } = appointmentDetails;
            
            const result = await createConversation(providerId, providerFirstName, providerLastName, providerProfile_picture, "Initial message");
    
            if (result.success) {
                const { conversationId, conversationData } = result;
                const { participant1Id } = conversationData; 
    
                navigation.navigate('ChatWithDoctor', {
                    conversationId,
                    participant1Id,
                    participant2Id: providerId,
                    conversationData, 
                });
            } else {
                console.log("Failed to create conversation");
            }
        } catch (error) {
            console.error("Error in handleCreateConversation:", error);
        }
    }, [appointmentDetails, createConversation, navigation]);
    
    const renderChatButton = () => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCreateConversation}
            style={{ backgroundColor: Colors.primaryColor, ...styles.buttonStyle }}
            disabled={loadingConversation}
        >
            {loadingConversation ? (
                <ActivityIndicator color={Colors.whiteColor} />
            ) : (
                <>
                    <MaterialIcons name='chat' color={Colors.whiteColor} size={20} />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor17Bold }}>
                        Chat
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );

    const renderButtons = () => {
        const appointmentStatus = appointmentDetails?.status; 

        return (
            <View style={{ flexDirection: 'row', borderTopColor: Colors.bodyBackColor, borderTopWidth: 1.0 }}>
                {appointmentStatus === 'pending' && (
                    <>
                        <ButtonComponent 
                            title="Cancel" 
                            onPress={handleCancel} 
                            loading={loadingStatus} 
                            backgroundColor={Colors.redColor} 
                        />
                        {renderChatButton()}
                    </>
                )}

                {appointmentStatus === 'cancelled' && (
                    <>
                        <ButtonComponent 
                            title="Reschedule" 
                            onPress={() => { navigation.push('DoctorDetail', { email: appointmentDetails?.providerEmail, username: appointmentDetails?.ProviderUsername }) }} 
                            loading={loadingStatus} 
                            backgroundColor="grey" 
                        />
                        {renderChatButton()}
                    </>
                )}

                {appointmentStatus === 'confirmed' && (
                    <>
                        {renderChatButton()}
                    </>
                )}
            </View>
        );
    };
    const ButtonComponent = ({ title, onPress, loading, backgroundColor }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{ backgroundColor, ...styles.smallButtonStyle }}
            disabled={loading} 
        >
            {loading ? (
                <ActivityIndicator color={Colors.whiteColor} />
            ) : (
                <Text style={{ ...Fonts.whiteColor17Bold }}>{title}</Text>
            )}
        </TouchableOpacity>
    );


    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
        <MyStatusBar />
        <View style={{ flex: 1 }}>
            {header()}
            <ScrollView contentContainerStyle={{ paddingBottom: Sizes.fixPadding }} showsVerticalScrollIndicator={false}>
                {loadingDetails ? (
                    <ActivityIndicator size="large" color={Colors.primaryColor} style={{ marginVertical: Sizes.fixPadding * 2 }} />
                ) : errorDetails ? (
                    <Text style={{ textAlign: 'center', color: Colors.redColor }}>
                        An error occurred while fetching appointment details. Please try again later.
                    </Text>
                ) : (
                    <>
                        {doctorInfo()}
                        {appointmentDetail()}
                    </>
                )}
            </ScrollView>
        </View>
        {showSuccess ? <Successfull /> : renderButtons()}
    </View>
    );

    function appointmentDetail() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0 }}>
              {appointmentDetailShort({  title: 'Patient Name',  value: `${appointmentDetails?.patientFirstName || 'N/A'} ${appointmentDetails?.patientLastName || 'N/A'}`,  icon: 'person-outline'  })}
            {divider()}
                {appointmentDetailShort({ title: 'Destination', value: appointmentDetails?.destination || 'N/A', icon: 'home' })}
                {divider()}
                {appointmentDetailShort({ title: 'Appointment Date & Time', value: `${appointmentDetails?.date || 'N/A'} • ${appointmentDetails?.time || 'N/A'}`, icon: 'timer' })}
                {divider()}
                {appointmentDetailShort({ title: 'Appointment Status', value: `${appointmentDetails?.status || 'N/A'}`, icon: 'timer' })}
           
            </View>
        );
    }

    function divider() {
        return (
            <View style={{ backgroundColor: Colors.bodyBackColor, height: 1.0, marginVertical: Sizes.fixPadding * 2.0 }} />
        );
    }

    function appointmentDetailShort({ title, value, icon }) {
        return (
            <View>
                <Text style={{ ...Fonts.blackColor16Medium }}>{title}</Text>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name={icon} size={22} color={Colors.primaryColor} />
                    <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.grayColor14Medium }}>{value}</Text>
                </View>
            </View>
        );
    }

    function doctorInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('DoctorReviews') }}
                style={styles.doctorInfoWrapStyle}
            >
                <View style={styles.doctorImageBackgroundStyle}>
                    <Image
                        source={appointmentDetails?.profile_picture ? { uri: appointmentDetails.profile_picture} : require('../../assets/images/doctors/doctor1.png')}
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
                        {appointmentDetails?.driverName} 
                    </Text>
                    <Text numberOfLines={1} style={{ marginVertical: Sizes.fixPadding - 5.0, ...Fonts.grayColor15Medium }}>
                       Id: {appointmentDetails?.driverId || 'N/A'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Booking Details
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        );
    }
}

export default StaffAppointmentDetailScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    doctorImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: 110,
        width: width / 3.5,
        alignItems: 'center',
        backgroundColor: Colors.purpleColor,
    },
    doctorImageStyle: {
        height: 110,
        width: width / 3.5,
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0.0, borderRadius: Sizes.fixPadding - 5.0,
    },
    doctorInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
        margin: 5,
        borderRadius: 10,
    },
    smallButtonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
        margin: 5,
        borderRadius: 10,
    },
});
