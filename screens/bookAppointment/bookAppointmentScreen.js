import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import useFetchUserByEmailAndUsername from '../../hooks/useFetchUserByEmailAndUsername';
import useBookProvider from "../../hooks/useBookProvider";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";
import useGetProviderSchedules from "../../hooks/useGetProviderSchedule";
const { width } = Dimensions.get("window");

const BookAppointmentScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reason, setReason] = useState("");
  const { email, username } = route.params;

  const { user, providerId, loading: userLoading, error: userError } = useFetchUserByEmailAndUsername(email, username);
  const { bookAppointment, loading: bookingLoading, error: bookingError } = useBookProvider();
  const { schedules, loading: schedulesLoading, error: schedulesError } = useGetProviderSchedules(providerId);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(moment(date).format("DD MMM YYYY"));
    hideDatePicker();   
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleSubmit = async () => {
    if (selectedDate && selectedTime && reason) {
      const appointmentDetails = {
        providerEmail: email,
        providerUsername: username,
        bookDate: selectedDate,
        bookTime: selectedTime,
        reason,
        service: user?.services,
        providerProfile_picture: user?.profile_picture,
        providerFirstName: user?.firstName,
        providerLastName: user?.lastName
      };

      const success = await bookAppointment(appointmentDetails); 
      if (success) {
        navigation.push("DeliverySuccess");
      } else {
        console.error(bookingError);
      }
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
          {doctorInfo()}
          {selectDate()}
          {selectTime()}
          {appointmentReasonInfo()}
        </ScrollView>
      </View>
      {confirmButton()}

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        date={new Date()}
      />
    </View>
  );

  function confirmButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSubmit} 
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor17Bold }}>
          {bookingLoading ? "Booking..." : "Confirm Appointment"}
        </Text>
      </TouchableOpacity>
    );
  }

  function appointmentReasonInfo() {
    return (
      <View style={styles.appointmentInfoContainer}>
        <Text style={styles.appointmentInfoTitle}>Appointment for</Text>
        <TextInput
          placeholder="e.g Heart pain, Body ache, etc."
          placeholderTextColor={Colors.grayColor}
          style={styles.appointmentForField}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          numberOfLines={4}
          multiline
          value={reason}
          onChangeText={setReason}
          textAlignVertical="top"
        />
      </View>
    );
  }

  function selectTime() {
    return (
      <View style={styles.timeContainer}>
        <Text style={styles.timeTitle}>Select a Time Slot</Text>
        <Picker
          selectedValue={selectedTime}
          onValueChange={(itemValue) => setSelectedTime(itemValue)}
          style={styles.pickerStyle}
        >
          <Picker.Item label="Select Time" value={null} />
          {schedules.map((time, index) => (
            <Picker.Item key={index} label={time} value={time} />
          ))}
        </Picker>
      </View>
    );
  }

  function selectDate() {
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dateTitle}>Select Date</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={showDatePicker}
          style={styles.dateWrapStyle}
        >
          <Text style={selectedDate ? styles.dateText : styles.placeholderText}>
            {selectedDate || "Select Date"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function doctorInfo() {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.doctorInfoWrapStyle}>
        <View style={styles.doctorImageBackgroundStyle}>
          <Image
            source={user?.profile_picture ? { uri: user.profile_picture } : require('../../assets/images/user.png')}
            style={styles.doctorImageStyle}
          />
        </View>
        <View style={styles.doctorDetails}>
          <Text numberOfLines={1} style={styles.doctorName}>
            {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'No name available'}
          </Text>
          <Text numberOfLines={1} style={styles.doctorService}>
            {user?.services || 'No services available'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
          Select Date & Time
        </Text>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={Colors.blackColor}
          style={{ position: "absolute", left: 20.0 }}
          onPress={() => navigation.pop()}
        />
      </View>
    );
  }
};

export default BookAppointmentScreen;


const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
  },
  doctorImageBackgroundStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    height: 125,
    width: width / 3.5,
    alignItems: "center",
    backgroundColor: Colors.purpleColor,
  },
  doctorImageStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    height: 125,
    width: width / 3.5,
    resizeMode: "fill",
    position: "absolute",
    bottom: 0.0,
  },
  doctorInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 4.0,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  dateWrapStyle: {
    paddingVertical: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayColor,
  },
  timeWrapStyle: {
    paddingVertical: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayColor,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 15,
  },
  appointmentForField: {
    borderWidth: 1,
    borderColor: Colors.grayColor,
    padding: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding,
    textAlignVertical: "top",margin:10
  },
 
  doctorDetails: {
    paddingHorizontal: Sizes.fixPadding,
    flex: 1,
  },
  doctorName: {
    ...Fonts.blackColor16Bold,
  },
  doctorService: {
    ...Fonts.grayColor14Regular,
  },
  dateContainer: {
    margin: Sizes.fixPadding * 2.0,
  },
  dateTitle: {
    ...Fonts.blackColor16Bold,
  },
  timeContainer: {
    margin: Sizes.fixPadding * 2.0,
  },
  timeTitle: {
    ...Fonts.blackColor16Bold,
  },
  placeholderText: {
    ...Fonts.grayColor14Regular,
  },
  dateText: {
    ...Fonts.blackColor16Bold,
  },
  timeText: {
    ...Fonts.blackColor16Bold,
  },
  appointmentInfoContainer: {
    margin: Sizes.fixPadding * 2.0,
  },
  appointmentInfoTitle: {
    ...Fonts.blackColor16Bold,
  },
  pickerStyle: {
    height: 50,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayColor,
  },
});
