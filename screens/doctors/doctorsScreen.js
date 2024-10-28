import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import React from 'react';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import UserInfo from '../../components/userInfo';
import useGetServices from '../../hooks/useGetServices';
import Loader from '../../components/activityLoader';

const { width } = Dimensions.get('window');

const images = [
    require('../../assets/images/category/cardiologist.png'),
    require('../../assets/images/category/pediatrician.png'),
    require('../../assets/images/category/pharmacist.png'),
    require('../../assets/images/category/therapist.png'),
    require('../../assets/images/category/dentist.png'),
];

const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
};

const getRandomBackgroundColor = () => {
    const colors = ['#F3E5F5', '#E3F2FD', '#E0F7FA', '#E8F5E9', '#E0F2F1'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const DoctorsScreen = ({ navigation }) => {
    const { services, loading, error } = useGetServices();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <UserInfo />

            {/* Loader Component */}
            <Loader isLoading={loading} /> 
            <FlatList
                ListHeaderComponent={
                    <>
                        {categoryInfo()}
                        {listOfSpecialitiesInfo()}
                    </>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );

    function listOfSpecialitiesInfo() {
        const renderSpecialityItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('CategoryDetail', { item }) }}
                style={{
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginBottom: Sizes.fixPadding * 2.0
                }}
            >
                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                    •   {item} 
                </Text>
                <MaterialIcons
                    name='arrow-forward-ios'
                    color={Colors.primaryColor}
                    size={13}
                />
            </TouchableOpacity>
        );

        return (
            <View style={{ marginTop: Sizes.fixPadding * 3.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                    List of Services
                </Text>
                {error ? (
                    <Text style={{ textAlign: 'center' }}>Error: {error}</Text>
                ) : (
                    <View style={{ backgroundColor: Colors.whiteColor, paddingTop: Sizes.fixPadding * 2.0 }}>
                        <FlatList
                            data={services}
                            keyExtractor={(item, index) => `${index}`} 
                            renderItem={renderSpecialityItem}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}
            </View>
        );
    }

    function categoryInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('CategoryDetail', { item }) }}
                    style={{ backgroundColor: getRandomBackgroundColor(), ...styles.categoryWrapStyle }}
                >
                    <Image
                        source={getRandomImage()} 
                        style={{ width: 36.0, height: 36.0, resizeMode: 'contain' }}
                    />
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding }}>
                        {item}
                    </Text>
                </TouchableOpacity>
            );
        };
        
        return (
            <View style={{ marginTop: Sizes.fixPadding * 4.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                    Services
                </Text>
                {error ? (
                    <Text style={{ textAlign: 'center' }}>Error: {error}</Text>
                ) : (
                    <FlatList
                        data={services}
                        keyExtractor={(item, index) => `${index}`} 
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: Sizes.fixPadding + 10.0 }}
                    />
                )}
            </View>
        );
    }
}

export default DoctorsScreen;

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.bodyBackColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    categoryWrapStyle: {
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        marginRight: Sizes.fixPadding + 5.0,
        minWidth: 100.0,
    },
});
