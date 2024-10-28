import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';
import useGetAppointmentDetails from '../../hooks/useGetAppointmentDetails';
import useUpdateAppointmentStatus from '../../hooks/useUpdateAppointmentStatus';
import Successfull from '../../components/successfull';
import useCreateConversation from '../../hooks/useCreateConversation';
import Loader from '../../components/activityLoader';

const { width } = Dimensions.get('window');

const ProviderAppointmentDetailScreen = ({ navigation, route }) => {
    const { appointmentId } = route.params; 
    const { appointmentDetails, loading: loadingDetails, error: errorDetails } = useGetAppointmentDetails(appointmentId);
    const { loading: loadingStatus, error: errorStatus, changeStatus } = useUpdateAppointmentStatus();
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { createConversation, loading: loadingConversation } = useCreateConversation();

    const handleCancel = async () => {
        await handleStatusChange('cancelled', 'Failed to cancel the appointment');
    };

    const handleConfirm = async () => {
        await handleStatusChange('confirmed', 'Failed to confirm the appointment');
    };

    const handleComplete = async () => {
        await handleStatusChange('completed', 'Failed to complete the appointment');
    };

    const handleStatusChange = async (status, errorMsg) => {
        try {
            const success = await changeStatus(appointmentId, status);
            if (success) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                showError(errorMsg);
            }
        } catch (error) {
            console.error("Error in handleStatusChange:", error);
            showError('An error occurred while updating the appointment status. Please try again.');
        }
    };

    const showError = (message) => {
        setErrorMessage(message);
        Alert.alert('Error', message);
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
                showError("Failed to create conversation");
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
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor17Bold }}>Chat</Text>
                </>
            )}
        </TouchableOpacity>
    );

    const renderButtons = () => {
        const appointmentStatus = appointmentDetails?.status; 

        return (
            <View >
                {appointmentStatus === 'pending' && (
                    <>
                    <View style={{ flexDirection: 'row', borderTopColor: Colors.bodyBackColor, borderTopWidth: 1.0 }}>
                        <ButtonComponent title="Confirm" onPress={handleConfirm} loading={loadingStatus} backgroundColor={Colors.greenColor} />
                        <ButtonComponent title="Complete" onPress={handleComplete} loading={loadingStatus} backgroundColor={Colors.blueColor} />
                        <ButtonComponent title="Cancel" onPress={handleCancel} loading={loadingStatus} backgroundColor={Colors.redColor} />
                       </View>
                       {renderChatButton()}
                    </>
                )}
                {appointmentStatus === 'confirmed' && (
                    <>
                    <View style={{ flexDirection: 'row', borderTopColor: Colors.bodyBackColor, borderTopWidth: 1.0 }}>
                        <ButtonComponent title="Complete" onPress={handleComplete} loading={loadingStatus} backgroundColor={Colors.blueColor} />
                       {renderChatButton()}
                        </View>
                    </>
                )}
            </View>
            
        );
    };

    const ButtonComponent = ({ title, onPress, loading, backgroundColor }) => (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ backgroundColor, ...styles.smallButtonStyle }} disabled={loading}>
            <Text style={{ ...Fonts.whiteColor17Bold }}>{title}</Text>
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
            {showSuccess && <Successfull />}
            {errorMessage && <Text style={{ color: Colors.redColor }}>{errorMessage}</Text>}
            {renderButtons()}
            {loadingStatus && <Loader isLoading={loadingStatus} />}
        </View>
    );

    function appointmentDetail() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0 }}>
                {appointmentDetailShort({ title: 'Reason', value: appointmentDetails?.reason || 'N/A', icon: 'person-outline' })}
                {divider()}
                {appointmentDetailShort({ title: 'Appointment ID', value: appointmentDetails?.appointmentId || 'N/A', icon: 'medical-services' })}
                {divider()}
                {appointmentDetailShort({ title: 'Appointment Date & Time', value: `${appointmentDetails?.bookDate || 'N/A'} • ${appointmentDetails?.bookTime || 'N/A'}`, icon: 'timer' })}
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
                        source={appointmentDetails?.patient_profile_picture ? { uri: appointmentDetails.patient_profile_picture } : require('../../assets/images/doctors/doctor1.png')}
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
                        {appointmentDetails?.patient_firstName} {appointmentDetails?.patient_lastName}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Appointment Details
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        );
    }
};

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
        paddingTop: Sizes.fixPadding * 4.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        display:'flex',
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

export default ProviderAppointmentDetailScreen;
