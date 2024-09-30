import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { TabView, TabBar } from 'react-native-tab-view';
import SavedHospitalsScreen from '../savedHospitals/savedHospitalsScreen';
import SavedDoctorsScreen from '../savedDoctors/savedDoctorsScreen';
import SavedMedicineScreen from '../savedMedicine/savedMedicineScreen';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const SavedScreen = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Hospitals' },
        { key: 'second', title: 'Doctors' },
        { key: 'third', title: 'Medicine' },
    ]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {tabs()}
            </View>
        </View>
    )

    function tabs() {
        const renderScene = ({ route, jumpTo }) => {
            switch (route.key) {
                case 'first':
                    return <SavedHospitalsScreen navigation={navigation} />
                case 'second':
                    return <SavedDoctorsScreen navigation={navigation} />
                case 'third':
                    return <SavedMedicineScreen navigation={navigation} />
            }
        };
        return (
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                swipeEnabled={false}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: Colors.primaryColor, height: 2.0 }}
                        style={{ backgroundColor: Colors.whiteColor, elevation: 0.0 }}
                        pressColor={Colors.primaryColor}
                        renderLabel={({ route, focused }) => (
                            <Text style={focused ? { ...Fonts.primaryColor16Bold } : { ...Fonts.lightGrayColor16Bold }}>
                                {route.title}
                            </Text>
                        )}
                    />
                )}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Saved
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default SavedScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
})