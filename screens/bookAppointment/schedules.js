import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import React from 'react';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from '../../components/myStatusBar';
import useFetchSchedules from "../../hooks/useFetchSchedules"; 
import Loader from "../../components/activityLoader";
import { database } from '../../firebase/firebase'; 
import { ref, remove } from 'firebase/database';

const { width } = Dimensions.get('window');

const Schedules = ({ navigation }) => {
    const { schedules, loading, error, refetch } = useFetchSchedules();
    

    const handleDelete = (scheduleId) => {
        Alert.alert(
            "Delete Schedule",
            "Are you sure you want to delete this schedule?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => deleteSchedule(scheduleId) }
            ]
        );
    };

    const deleteSchedule = async (scheduleId) => {
        try {
            const scheduleRef = ref(database, `provider_schedules/${scheduleId}`);
            await remove(scheduleRef);
            Alert.alert("Success", "Schedule deleted successfully");
            refetch(); 
        } catch (err) {
            console.error("Failed to delete schedule:", err);
            Alert.alert("Error", "Failed to delete schedule");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {renderSchedules()}
            </View>
        </View>
    );

    function renderSchedules() {
        if (loading) {
            return <Loader isLoading={loading} />;
        }

        if (error) {
            return <Text style={{ textAlign: 'center', marginTop: 20 }}>{error}</Text>;
        }

        if (!schedules.length) {
            return <Text style={{ textAlign: 'center', marginTop: 20 }}>No schedules found.</Text>;
        }

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.docorInfoWrapStyle}
            >
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                         Schedule Date: {item.scheduleDate}
                        </Text>
                    </View>
                    <Text style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                        Available From: {item.scheduleFromTime}
                    </Text>
                    <Text style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                       Available To: {item.scheduleToTime}
                    </Text>
                    <Text style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                       Schedule Id: {item.scheduleId}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => handleDelete(item.scheduleId)} style={styles.btn}>
                        <Text style={{ color: '#fff' }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );

        return (
            <FlatList
                data={schedules}
                keyExtractor={(item, index) => `${index}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} onPress={() => { navigation.pop() }} />
                <Text>Schedules</Text>
                <MaterialIcons
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => {
                        setInSave(!inSave);
                        setShowSnackBar(true);
                    }}
                />
            </View>
        );
    }
};

export default Schedules;

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding * 2.0,
    },
    docorInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 8.0,
        paddingTop: Sizes.fixPadding * 2.0,
        margin: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: Colors.primaryColor,
        padding: 8,
        borderRadius: 10
    }
});
