import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const hospitalsList = [
    {
        id: '1',
        hospitalName: 'Apple Hospital',
        address: '83 Woodhedge Drive, Nottingham,',
        selected: true,
    },
    {
        id: '2',
        hospitalName: 'Johns Hopkins Hospital',
        address: 'Westheimer Rd. Santa Ana, Illinois',
        selected: false,
    },
    {
        id: '3',
        hospitalName: 'Cleveland Hospital',
        address: 'W. Gray St. Utica, Pennsylvania',
        selected: false,
    },
    {
        id: '4',
        hospitalName: 'St Jude Children\'s Hospital',
        address: 'Elgin St. Celina, Delaware 10299',
        selected: false,
    },
    {
        id: '5',
        hospitalName: 'Mayo Clinic Scottsdale AZ',
        address: '83 Woodhedge Drive, Nottingham,',
        selected: false,
    },
    {
        id: '6',
        hospitalName: 'Apple Hospital',
        address: '83 Woodhedge Drive, Nottingham,',
        selected: false,
    },
    {
        id: '7',
        hospitalName: 'Johns Hopkins Hospital',
        address: 'Westheimer Rd. Santa Ana, Illinois',
        selected: false,
    },
    {
        id: '8',
        hospitalName: 'Cleveland Hospital',
        address: 'W. Gray St. Utica, Pennsylvania',
        selected: false,
    },
    {
        id: '9',
        hospitalName: 'St Jude Children\'s Hospital',
        address: 'Elgin St. Celina, Delaware 10299',
        selected: false,
    },
    {
        id: '10',
        hospitalName: 'Mayo Clinic Scottsdale AZ',
        address: '83 Woodhedge Drive, Nottingham,',
        selected: false,
    },
    {
        id: '11',
        hospitalName: 'Apple Hospital',
        address: '83 Woodhedge Drive, Nottingham,',
        selected: false,
    },
];

const AddHospitalScreen = ({ navigation }) => {

    const [search, setsearch] = useState('');
    const [hospitals, sethospitals] = useState(hospitalsList);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {searchField()}
                {hospitalsInfo()}
            </View>
            {saveButton()}
        </View>
    )

    function saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.pop() }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Save
                </Text>
            </TouchableOpacity>
        )
    }

    function updateHospitals({ id }) {
        const copyHospitals = hospitals;
        const newHospitals = copyHospitals.map((item) => {
            if (item.id == id) {
                return { ...item, selected: !item.selected }
            }
            else {
                return item
            }
        })
        sethospitals(newHospitals);
    }

    function hospitalsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.hospitalInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { updateHospitals({ id: item.id }) }}
                    style={{
                        ...styles.checkBoxStyle,
                        backgroundColor: item.selected ? Colors.primaryColor : Colors.whiteColor,
                        borderColor: item.selected ? Colors.primaryColor : Colors.lightGrayColor,
                    }}
                >
                    {
                        item.selected
                            ?
                            <MaterialIcons
                                name='check'
                                color={Colors.whiteColor}
                                size={17}
                            />
                            :
                            null
                    }
                </TouchableOpacity>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding * 2.0, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                        {item.hospitalName}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name='location-pin'
                            color={Colors.lightGrayColor}
                            size={15}
                        />
                        <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor14Medium }}>
                            {item.address}
                        </Text>
                    </View>
                </View>
            </View>
        )
        return (
            <FlatList
                data={hospitals}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                ListHeaderComponent={
                    <Text style={{ ...Fonts.blackColor18SemiBold, margin: Sizes.fixPadding * 2.0 }}>
                        Select Hospital to add
                    </Text>
                }
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
            />
        )
    }

    function searchField() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor }}>
                <View style={styles.searchFieldWrapStyle}>
                    <MaterialIcons
                        name='search'
                        color={search ? Colors.primaryColor : Colors.grayColor}
                        size={22}
                    />
                    <TextInput
                        placeholder='Search hospitals'
                        placeholderTextColor={Colors.grayColor}
                        style={{ ...styles.textFieldStyle }}
                        value={search}
                        onChangeText={(value) => setsearch(value)}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Add Hospital
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default AddHospitalScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    searchFieldWrapStyle: {
        backgroundColor: Colors.bodyBackColor,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding - 5.0,
    },
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        flex: 1,
        height: 20.0,
        marginLeft: Sizes.fixPadding
    },
    checkBoxStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: Sizes.fixPadding - 8.0,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hospitalInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        marginBottom: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    }
})