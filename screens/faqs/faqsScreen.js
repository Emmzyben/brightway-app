import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const dummyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est magna at est, habitasse facilisis.Velit sed tempus et neque scelerisque vel faucibus.'

const faqsList = [
    {
        id: '1',
        question: 'How to login to application?',
        answer: dummyText,
        isOpen: true,
    },
    {
        id: '2',
        question: 'How to book an appointment?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '3',
        question: 'How to set new delivery address?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '4',
        question: 'Payment modes are avaliable?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '5',
        question: 'How to logout from the application?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '6',
        question: 'How to pay?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '7',
        question: 'How to login to application?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '8',
        question: 'How to book an appointment?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '9',
        question: 'How to set new delivery address?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '10',
        question: 'Payment modes are avaliable?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '11',
        question: 'How to logout from the application?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '12',
        question: 'How to pay?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '13',
        question: 'How to login to application?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '14',
        question: 'How to book an appointment?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '15',
        question: 'How to set new delivery address?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '16',
        question: 'Payment modes are avaliable?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '17',
        question: 'How to logout from the application?',
        answer: dummyText,
        isOpen: false,
    },
    {
        id: '18',
        question: 'How to pay?',
        answer: dummyText,
        isOpen: false,
    },
];

const FaqsScreen = ({ navigation }) => {

    const [faqs, setfaqs] = useState(faqsList);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {faqsInfo()}
            </View>
        </View>
    )

    function upateFaqsView({ id }) {
        const copyFaqs = faqs;
        const newFaqs = copyFaqs.map((item) => {
            if (item.id == id) {
                return { ...item, isOpen: !item.isOpen }
            }
            else {
                return item
            }
        })
        setfaqs(newFaqs);
    }

    function faqsInfo() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { upateFaqsView({ id: item.id }) }}
                style={{ backgroundColor: Colors.whiteColor, marginBottom: Sizes.fixPadding - 5.0, padding: Sizes.fixPadding * 2.0, }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ marginRight: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.blackColor16Medium }}>
                        {index + 1}. {item.question}
                    </Text>
                    <MaterialIcons
                        name={item.isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        color={Colors.blackColor}
                        size={20}
                    />
                </View>
                {
                    item.isOpen
                        ?
                        <Text style={{ lineHeight: 21.0, marginTop: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                            {item.answer}
                        </Text>
                        :
                        null
                }
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={faqs}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0, }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    FAQs
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default FaqsScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    }
})