import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { PieChart, BarChart } from 'react-native-chart-kit';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const InsightScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {orderRideAndEarningInfo()}
                    {todaysTaskInfo()}
                    {earningsInfo()}
                </ScrollView>
            </View>
        </View>
    )

    function earningsInfo() {
        const data = {
            labels: ["8:00am", "12:00pm", "2:00pm", "4:00pm", '6:00pm', '8:00pm',],
            datasets: [
                {
                    data: [800, 425, 950, 752, 450, 650,]
                }
            ]
        };
        const chartConfig = {
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            fillShadowGradientFrom: Colors.primaryColor,
            fillShadowGradientFromOpacity: 1,
            fillShadowGradientTo: Colors.primaryColor,
            fillShadowGradientToOpacity: 1,
            color: (opacity = 1) => Colors.blackColor,
            strokeWidth: 2,
            barPercentage: 0.2,
            decimalPlaces: 0,
        };
        return (
            <View style={{ marginVertical: Sizes.fixPadding, padding: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
                        Earnings
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            { } (in $)
                        </Text>
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.primaryColor14Bold }}>
                            Today
                        </Text>
                        <MaterialIcons
                            name='arrow-drop-down'
                            color={Colors.primaryColor}
                            size={24}
                        />
                    </View>
                </View>
                <BarChart
                    style={{ alignSelf: 'center', marginTop: Sizes.fixPadding + 5.0 }}
                    data={data}
                    width={width - 20}
                    height={220}
                    yLabelsOffset={20}
                    yAxisLabel="$"
                    chartConfig={chartConfig}
                    fromZero={true}
                    withInnerLines={false}
                    showBarTops={false}
                />
            </View>
        )
    }

    function todaysTaskInfo() {
        const data = [
            {
                name: "New Task",
                taskPercentage: 20,
                color: "#81C784",
                legendFontColor: Colors.blackColor,
                legendFontSize: 14,
            },
            {
                name: "Accepted",
                taskPercentage: 55,
                color: "#64B5F6",
                legendFontColor: Colors.blackColor,
                legendFontSize: 14,
            },
            {
                name: "Delivered",
                taskPercentage: 25,
                color: "#FF8A65",
                legendFontColor: Colors.blackColor,
                legendFontSize: 14,
            },
        ];

        const chartConfig = {
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        };

        return (
            <View style={{ paddingVertical: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                    Today’s Task
                </Text>
                <PieChart
                    data={data}
                    width={width}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"taskPercentage"}
                    backgroundColor={"transparent"}
                    center={[20, 0]}
                />
            </View>
        )
    }

    function orderRideAndEarningInfo() {
        return (
            <View style={styles.orderRideAndEarningInfoWrapStyle}>
                {infoShort({ title: 'Orders', value: 90 })}
                {infoShort({ title: 'Ride', value: '105 km' })}
                {infoShort({ title: 'Earnings', value: '$350.50' })}
            </View>
        )
    }

    function infoShort({ title, value }) {
        return (
            <View style={{ alignItems: 'center', }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {value}
                </Text>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                    {title}
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Insight
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default InsightScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    orderRideAndEarningInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding
    }
})