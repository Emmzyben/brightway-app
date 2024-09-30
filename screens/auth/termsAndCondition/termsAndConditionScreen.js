import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const termsOfUseList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est magna at est, habitasse facilisis.Velit sed tempus et neque scelerisque vel faucibus.',
    'Ac consequat loborproin volutpat. Velit ut nascetur amet dictumst a ut. Dictum morbi enim feugiat ipsum. Felis sed pretium eget mauris vitae sed.Lacus tellus quis nec vitae et bibendum duis.',
];

const companyPolicies = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est magna at est, habitasse facilisis.Velit sed tempus et neque scelerisque vel faucibus.',
    'Ac consequat loborproin volutpat. Velit ut nascetur amet dictumst a ut. Dictum morbi enim feugiat ipsum. Felis sed pretium eget mauris vitae sed.Lacus tellus quis nec vitae et bibendum duis.',
];

const TermsAndConditionScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}>
                    {termsofUseInfo()}
                    {companyPolicyInfo()}
                </ScrollView>
            </View>
        </View>
    )

    function companyPolicyInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    Company Policy
                </Text>
                {
                    companyPolicies.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{ lineHeight: 21.0, ...Fonts.grayColor14Medium, marginVertical: Sizes.fixPadding - 5.0, }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function termsofUseInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, marginVertical: Sizes.fixPadding, padding: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    Terms of Use
                </Text>
                {
                    termsOfUseList.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{ lineHeight: 21.0, ...Fonts.grayColor14Medium, marginVertical: Sizes.fixPadding - 5.0, }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Terms & Conditions
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default TermsAndConditionScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    }
})