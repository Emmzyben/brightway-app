import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import React from 'react';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from '../../components/myStatusBar';
import useSearchProvidersByService from '../../hooks/useSearchProvidersByService';

const { width } = Dimensions.get('window');

const CategoryDetailScreen = ({ navigation, route }) => {
    const { item: service } = route.params; 
    const { providers, loading, error } = useSearchProvidersByService(service); 

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {nearestDoctorsInfo()}
            </View>
        </View>
    );

    function nearestDoctorsInfo() {
        if (loading) {
            return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
        }

        if (error) {
            return <Text style={{ textAlign: 'center', marginTop: 20 }}>{error}</Text>;
        }

        if (!providers.length) {
            return <Text style={{ textAlign: 'center', marginTop: 20 }}>No providers found for this category.</Text>;
        }

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('DoctorDetail', { email: item.email, username: item.username }) }} // Pass both email and phone
                style={styles.docorInfoWrapStyle}
            >
                <View style={{ backgroundColor: Colors.lightGrayColor, ...styles.doctorImageBackgroundStyle }}>
                    <Image
                           source={item?.profile_picture ? { uri: item.profile_picture } : require('../../assets/images/user.png')}
                      
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                            {item.firstName} {item.lastName}
                        </Text>
                    </View>
                    <Text style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                        {item.services} 
                    </Text>
                </View>
            </TouchableOpacity>
        );
        

        return (
            <FlatList
                data={providers} // Use the providers array from the hook
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
                <Text> Providers for {service}</Text>
                <MaterialIcons
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => {
                        setinSave(!inSave);
                        setshowSnackBar(true);
             }}
                />
            </View>
        );
    }
};

export default CategoryDetailScreen;

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
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
    },
    doctorImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: width / 4.5,
        width: width / 4.7,
        alignItems: 'center',
    },
    doctorImageStyle: {
       height: width / 4.5,
        width: width / 4.7,
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
});
