import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import MyStatusBar from "../../components/myStatusBar";
import { BottomSheet } from "@rneui/themed";

const { width } = Dimensions.get("window");

const hoursList = [...range(0, 12)];

const minutesList = [...range(0, 59)];

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

const specialistIn = ["Gastroenterology", "Cardiologist"];

const specializations = [
  "Family Physician",
  "Geriatrician",
  "Family Nurse Practitioner",
  "Urgent Care Specialist",
  "Child Neurology",
  "Certified Registered Nurse Anesthetist",
];

const availabilities = [
  {
    id: "1",
    day: "M",
    startTime: "10:00 am",
    endTime: "02:00 pm",
  },
  {
    id: "2",
    day: "T",
    startTime: "02:02 pm",
    endTime: "05:00 pm",
  },
  {
    id: "3",
    day: "W",
    startTime: "10:00 am",
    endTime: "02:00 pm",
  },
  {
    id: "4",
    day: "T",
    startTime: "",
    endTime: "",
  },
  {
    id: "5",
    day: "F",
    startTime: "",
    endTime: "",
  },
  {
    id: "6",
    day: "S",
    startTime: "02:00 pm",
    endTime: "05:00 pm",
  },
  {
    id: "7",
    day: "S",
    startTime: "",
    endTime: "",
  },
];

const EditProfileScreen = ({ navigation }) => {
  const [fullName, setfullName] = useState("Dr. Ismail Sendi");
  const [mobileNumber, setmobileNumber] = useState("+1 789-896-159");
  const [email, setemail] = useState("drismailsendi@gmail.com");
  const [password, setpassword] = useState("123456789");
  const [experience, setexperience] = useState("15 Years");
  const [fees, setfees] = useState("$23.00");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showSheet, setshowSheet] = useState(false);
  const [sheetOpenForStartTime, setsheetOpenForStartTime] = useState(null);
  const [selectedItemId, setselectedItemId] = useState(null);
  const [selectedHour, setselectedHour] = useState(null);
  const [selectedMinute, setselectedMinute] = useState(null);
  const [selectedAmPm, setselectedAmPm] = useState(null);
  const [availabilitiesData, setavailabilitiesData] = useState(availabilities);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
          automaticallyAdjustKeyboardInsets={true}
        >
          {personalInfo()}
          {serviceAtInfo()}
          {expercienceAndFeesInfo()}
          {specialistInfo()}
          {specializeInfo()}
          {availabilityInfo()}
        </ScrollView>
      </View>
      {updateButton()}
      {changeProfilePicOptionsSheet()}
      {timeSheet()}
    </View>
  );

  function timeSheet() {
    return (
      <BottomSheet
        onBackdropPress={() => {
          setshowSheet(false);
        }}
        isVisible={showSheet}
      >
        <View style={styles.sheetStyle}>{timesInfo()}</View>
      </BottomSheet>
    );
  }

  function changeTime() {
    const hour = `${selectedHour.toString().length == 1 ? `0${selectedHour}` : selectedHour
      }`;
    const minute = `${selectedMinute.toString().length == 1
      ? `0${selectedMinute}`
      : selectedMinute
      }`;
    const time = `${hour ? hour : `00`}:${minute ? minute : `00`} ${selectedAmPm ? selectedAmPm : sheetOpenForStartTime ? `am` : `pm`
      }`;
    const copyTimes = availabilitiesData;
    const newTime = copyTimes.map((item) => {
      if (item.id == selectedItemId) {
        return {
          ...item,
          startTime: sheetOpenForStartTime ? time : item.startTime,
          endTime: !sheetOpenForStartTime ? time : item.endTime,
        };
      } else {
        return item;
      }
    });
    setavailabilitiesData(newTime);
    setshowSheet(false);
  }

  function timesInfo() {
    return (
      <View style={{ }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: Sizes.fixPadding,
          }}
        >
          <Text style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
            Select Time
          </Text>
          <Text
            onPress={() => {
              changeTime();
            }}
            style={{ ...Fonts.primaryColor14Bold }}
          >
            Done
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {hourPicker()}
          <Text
            style={{
              ...Fonts.blackColor20Bold,
              marginHorizontal: Sizes.fixPadding * 2.0,
            }}
          >
            :
          </Text>
          {minutePicker()}
          <Text
            style={{
              ...Fonts.blackColor20Bold,
              marginHorizontal: Sizes.fixPadding * 2.0,
            }}
          >
            :
          </Text>
          {amPmPicker()}
        </View>
      </View>
    );
  }

  function amPmPicker() {
    const list = ["am", "pm"];
    return (
      <ScrollPicker
        dataSource={list}
        selectedIndex={list.indexOf(selectedAmPm)}
        renderItem={(data) => {
          return (
            <Text
              style={
                data == selectedAmPm
                  ? { ...Fonts.blackColor14Medium }
                  : { ...Fonts.lightGrayColor14Medium }
              }
            >
              {data}
            </Text>
          );
        }}
        onValueChange={(data) => {
          setselectedAmPm(data);
        }}
        wrapperColor={Colors.whiteColor}
        itemHeight={50}
        highlightColor={Colors.bodyBackColor}
        highlightBorderWidth={1}
      />
    );
  }

  function hourPicker() {
    return (
      <ScrollPicker
        dataSource={hoursList}
        selectedIndex={hoursList.indexOf(Number(selectedHour))}
        renderItem={(data) => {
          return (
            <Text
              style={
                data == Number(selectedHour)
                  ? { ...Fonts.blackColor14Medium }
                  : { ...Fonts.lightGrayColor14Medium }
              }
            >
              {data.toString().length == 1 ? `0${data}` : data}
            </Text>
          );
        }}
        onValueChange={(data) => {
          setselectedHour(data);
        }}
        wrapperColor={Colors.whiteColor}
        itemHeight={50}
        highlightColor={Colors.bodyBackColor}
        highlightBorderWidth={1}
      />
    );
  }

  function minutePicker() {
    return (
      <ScrollPicker
        dataSource={minutesList}
        selectedIndex={minutesList.indexOf(Number(selectedMinute))}
        renderItem={(data) => {
          return (
            <Text
              style={
                data == Number(selectedMinute)
                  ? { ...Fonts.blackColor14Medium }
                  : { ...Fonts.lightGrayColor14Medium }
              }
            >
              {data.toString().length == 1 ? `0${data}` : data}
            </Text>
          );
        }}
        onValueChange={(data) => {
          setselectedMinute(data);
        }}
        wrapperColor={Colors.whiteColor}
        itemHeight={50}
        highlightColor={Colors.bodyBackColor}
        highlightBorderWidth={1}
      />
    );
  }

  function availabilityInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          padding: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          Availability
        </Text>
        {availabilitiesData.map((item, index) => (
          <View
            key={`${item.id}`}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom:
                availabilitiesData.length - 1 == index
                  ? 0.0
                  : Sizes.fixPadding * 2.0,
            }}
          >
            <View
              style={{
                ...styles.dayWrapStyle,
                backgroundColor:
                  item.startTime == item.endTime
                    ? Colors.bodyBackColor
                    : Colors.primaryColor,
              }}
            >
              <Text
                style={
                  item.startTime == item.endTime
                    ? { ...Fonts.lightGrayColor16ExtraBold }
                    : { ...Fonts.whiteColor16ExtraBold }
                }
              >
                {item.day}
              </Text>
            </View>
            <View
              style={{
                marginLeft: Sizes.fixPadding * 2.0,
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setsheetOpenForStartTime(true);
                  setselectedItemId(item.id);
                  setselectedHour(
                    item.startTime ? item.startTime.substring(0, 2) : `00`
                  );
                  setselectedMinute(
                    item.startTime ? item.startTime.slice(3, 5) : `00`
                  );
                  setselectedAmPm(
                    item.startTime ? item.startTime.slice(6, 8) : `am`
                  );
                  setshowSheet(true);
                }}
                style={styles.availabilityTimeWrapStyle}
              >
                <Text
                  style={{ maxWidth: width / 5.5, ...Fonts.blackColor14Medium }}
                >
                  {item.startTime ? item.startTime : "00:00 am"}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  color={Colors.lightGrayColor}
                  size={20}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginHorizontal: Sizes.fixPadding * 2.0,
                  ...Fonts.lightGrayColor16Medium,
                }}
              >
                to
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setsheetOpenForStartTime(false);
                  setselectedItemId(item.id);
                  setselectedHour(
                    item.endTime ? item.endTime.substring(0, 2) : "00"
                  );
                  setselectedMinute(
                    item.endTime ? item.endTime.slice(3, 5) : "00"
                  );
                  setselectedAmPm(
                    item.endTime ? item.endTime.slice(6, 8) : "pm"
                  );
                  setshowSheet(true);
                }}
                style={styles.availabilityTimeWrapStyle}
              >
                <Text
                  style={{ maxWidth: width / 5.5, ...Fonts.blackColor14Medium }}
                >
                  {item.endTime ? item.endTime : "00:00 pm"}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  color={Colors.lightGrayColor}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  }

  function specializeInfo() {
    return (
      <View
        style={{
          ...styles.specialistInfoWrapStyle,
          marginVertical: Sizes.fixPadding,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              flex: 1,
              marginBottom: Sizes.fixPadding * 2.0,
              ...Fonts.blackColor18SemiBold,
            }}
          >
            Specialize In
          </Text>
          <Text
            onPress={() => {
              navigation.push("AddSpecialization");
            }}
            style={{ ...Fonts.primaryColor14Bold }}
          >
            Edit
          </Text>
        </View>
        {specializations.map((item, index) => (
          <Text
            key={`${index}`}
            numberOfLines={1}
            style={{
              ...Fonts.grayColor14Medium,
              marginBottom: Sizes.fixPadding,
            }}
          >
            • {item}
          </Text>
        ))}
      </View>
    );
  }

  function specialistInfo() {
    return (
      <View style={styles.specialistInfoWrapStyle}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          Specialist In
        </Text>
        {specialistIn.map((item, index) => (
          <Text
            key={`${index}`}
            numberOfLines={1}
            style={{
              ...Fonts.grayColor14Medium,
              marginBottom: Sizes.fixPadding,
            }}
          >
            • {item}
          </Text>
        ))}
      </View>
    );
  }

  function expercienceAndFeesInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          padding: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          Experience & Fees
        </Text>
        {experienceInfo()}
        {feesInfo()}
      </View>
    );
  }

  function feesInfo() {
    return (
      <View>
        <Text style={{ ...Fonts.grayColor14Medium }}>Fees</Text>
        <View style={styles.textFieldWrapStyle}>
          <MaterialIcons
            name="account-balance-wallet"
            color={Colors.lightGrayColor}
            size={20}
          />
          <TextInput
            value={fees}
            onChangeText={(value) => {
              setfees(value);
            }}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  }

  function experienceInfo() {
    return (
      <View style={{ marginBottom: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor14Medium }}>Experience</Text>
        <View style={styles.textFieldWrapStyle}>
          <MaterialCommunityIcons
            name="hand-heart"
            color={Colors.lightGrayColor}
            size={20}
          />
          <TextInput
            value={experience}
            onChangeText={(value) => {
              setexperience(value);
            }}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function serviceAtInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          padding: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          Services at
        </Text>
        {hospitalNameInfo()}
      </View>
    );
  }

  function hospitalNameInfo() {
    return (
      <View>
        <Text style={{ ...Fonts.grayColor14Medium }}>Hospital Name</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push("AddHospital");
          }}
          style={styles.textFieldWrapStyle}
        >
          <MaterialCommunityIcons
            name="hospital-building"
            size={20}
            color={Colors.lightGrayColor}
          />
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              marginLeft: Sizes.fixPadding,
              ...Fonts.blackColor16Medium,
            }}
          >
            Apple Hospital
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function personalInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          marginVertical: Sizes.fixPadding,
        }}
      >
        {profilePic()}
        <Text
          style={{
            margin: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          Personal Details
        </Text>
        {fullNameInfo()}
        {mobileNumberInfo()}
        {emailAddressInfo()}
        {passwordInfo()}
      </View>
    );
  }

  function changeProfilePicOptionsSheet() {
    return (
      <BottomSheet
        isVisible={showBottomSheet}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.50, 0, 0.50)" }}
        onBackdropPress={() => {
          setShowBottomSheet(false);
        }}
      >
        <View style={styles.bottomSheetStyle}>
          <Text style={{ ...Fonts.blackColor18SemiBold }}>Choose Option</Text>
          <View
            style={{ marginTop: Sizes.fixPadding * 2.5, flexDirection: "row" }}
          >
            {changeProfilePicOptionsSort({
              bgColor: "#009688",
              icon: "camera",
              option: "Camera",
            })}
            <View style={{ marginHorizontal: Sizes.fixPadding * 3.0 }}>
              {changeProfilePicOptionsSort({
                bgColor: "#00A7F7",
                icon: "image",
                option: "Gallery",
              })}
            </View>
            {changeProfilePicOptionsSort({
              bgColor: "#DD5A5A",
              icon: "delete",
              option: "Remove photo",
            })}
          </View>
        </View>
      </BottomSheet>
    );
  }

  function changeProfilePicOptionsSort({ bgColor, icon, option }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setShowBottomSheet(false);
        }}
      >
        <View
          style={{
            ...styles.changeProfilePicOptionsIconWrapStyle,
            backgroundColor: bgColor,
          }}
        >
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={Colors.whiteColor}
          />
        </View>
        <Text style={styles.profileOptionTextStyle}>{option}</Text>
      </TouchableOpacity>
    );
  }

  function updateButton() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.pop();
          }}
          style={styles.buttonStyle}
        >
          <Text style={{ ...Fonts.whiteColor17Bold }}>Update</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function passwordInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor14Medium }}>Password</Text>
        <View style={styles.textFieldWrapStyle}>
          <MaterialIcons name="lock" color={Colors.lightGrayColor} size={20} />
          <TextInput
            value={password}
            onChangeText={(value) => {
              setpassword(value);
            }}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            secureTextEntry={true}
          />
        </View>
      </View>
    );
  }

  function emailAddressInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor14Medium }}>Email Address</Text>
        <View style={styles.textFieldWrapStyle}>
          <MaterialIcons name="email" color={Colors.lightGrayColor} size={20} />
          <TextInput
            value={email}
            onChangeText={(value) => {
              setemail(value);
            }}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function mobileNumberInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor14Medium }}>Mobile Number</Text>
        <View style={styles.textFieldWrapStyle}>
          <MaterialIcons
            name="phone-android"
            color={Colors.lightGrayColor}
            size={20}
          />
          <TextInput
            value={mobileNumber}
            onChangeText={(value) => {
              setmobileNumber(value);
            }}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    );
  }

  function fullNameInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor14Medium }}>Full Name</Text>
        <View style={styles.textFieldWrapStyle}>
          <MaterialIcons
            name="person"
            color={Colors.lightGrayColor}
            size={20}
          />
          <TextInput
            value={fullName}
            onChangeText={(value) => {
              setfullName(value);
            }}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function profilePic() {
    return (
      <View
        style={{
          alignSelf: "center",
          marginTop: Sizes.fixPadding * 3.0,
          marginBottom: Sizes.fixPadding,
        }}
      >
        <Image
          source={require("../../assets/images/doctor/doctor1.png")}
          style={styles.profilePicStyle}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowBottomSheet(true);
          }}
          style={styles.cameraIconWrapStyle}
        >
          <MaterialIcons
            name="camera-alt"
            color={Colors.primaryColor}
            size={width / 25.0}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text
          numberOfLines={1}
          style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}
        >
          Edit Profile
        </Text>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={Colors.blackColor}
          style={{ position: "absolute", left: 20.0 }}
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
    );
  }
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
  },
  profilePicStyle: {
    width: width / 4.3,
    height: width / 4.3,
    borderRadius: width / 4.3 / 2.0,
    backgroundColor: Colors.primaryColor,
    resizeMode: "contain",
  },
  cameraIconWrapStyle: {
    width: width / 13.5,
    height: width / 13.5,
    borderRadius: width / 13.5 / 2.0,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0.0,
    right: 0.0,
    elevation: 2.0,
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 }
  },
  textFieldWrapStyle: {
    backgroundColor: Colors.bodyBackColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 7.0,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding,
  },
  textFieldStyle: {
    flex: 1,
    ...Fonts.blackColor16Medium,
    height: 20.0,
    marginLeft: Sizes.fixPadding,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 8.0,
    marginBottom: Sizes.fixPadding * 2.0,
    elevation: 1.0,
    ...CommonStyles.buttonShadow
  },
  changeProfilePicOptionsIconWrapStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 2.5,
  },
  profileOptionTextStyle: {
    textAlign: "center",
    maxWidth: width / 4.5,
    marginTop: Sizes.fixPadding - 5.0,
    ...Fonts.grayColor14Medium,
  },
  specialistInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding + 5,
  },
  availabilityTimeWrapStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: Sizes.fixPadding + 2.0,
    backgroundColor: Colors.bodyBackColor,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 2.0,
  },
  dayWrapStyle: {
    width: width / 8.0,
    height: width / 8.0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: width / 8.0 / 2.0,
  },
});
