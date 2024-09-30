import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const servicesList = [
    {
        id: '1',
        service: 'Allergy & Immunology',
        selected: true,
    },
    {
        id: '2',
        service: 'Dermatology',
        selected: false,
    },
    {
        id: '3',
        service: 'ECG',
        selected: false,
    },
    {
        id: '4',
        service: 'Fever Treatment',
        selected: true,
    },
    {
        id: '5',
        service: 'Colon & Rectal Surgery',
        selected: false,
    },
    {
        id: '6',
        service: 'Family Medicine',
        selected: true,
    },
    {
        id: '7',
        service: 'Emergency Medicine',
        selected: false,
    },
    {
        id: '8',
        service: 'Anesthesiology',
        selected: false,
    },
    {
        id: '9',
        service: 'Infectious Disease',
        selected: false,
    },
    {
        id: '10',
        service: 'General Surgery',
        selected: true,
    },
    {
        id: '11',
        service: 'Internal Medicine',
        selected: true,
    },
    {
        id: '12',
        service: 'Hematology',
        selected: false,
    },
    {
        id: '13',
        service: 'Endocrinology',
        selected: false,
    },
    {
        id: '14',
        service: 'Orthopaedic Surgery',
        selected: false,
    },
    {
        id: '15',
        service: 'Obstetrics & Gynecology',
        selected: false,
    },
    {
        id: '16',
        service: 'Other MD/DO',
        selected: true,
    },
    {
        id: '17',
        service: 'Pathology',
        selected: false,
    },
    {
        id: '18',
        service: 'Pediatric Emergency Medicine',
        selected: false,
    },
    {
        id: '19',
        service: 'Plastic Surgery',
        selected: true,
    },
    {
        id: '20',
        service: 'Radiology',
        selected: true,
    },
];

const AddSpecializationScreen = ({ navigation }) => {

    const [search, setsearch] = useState('');
    const [services, setservices] = useState(servicesList);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {searchField()}
                {servicesInfo()}
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

    function updateServices({ id }) {
        const copyServices = services;
        const newServices = copyServices.map((item) => {
            if (item.id == id) {
                return { ...item, selected: !item.selected }
            }
            else {
                return item
            }
        })
        setservices(newServices);
    }

    function servicesInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.serviceWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { updateServices({ id: item.id }) }}
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
                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding * 2.0 }}>
                    {item.service}
                </Text>
            </View>
        )
        return (
            <FlatList
                data={services}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                        Select Services to add
                    </Text>
                }
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
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
                        placeholder='Search services'
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
                    Add Specialization
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default AddSpecializationScreen

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
    serviceWrapStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        marginBottom: Sizes.fixPadding - 9.0,
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    }
})