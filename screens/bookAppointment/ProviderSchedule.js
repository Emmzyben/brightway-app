import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import moment from "moment";
import MyStatusBar from "../../components/myStatusBar";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCreateSchedule from "../../hooks/useCreateSchedule";
import Loader from "../../components/activityLoader";

const { width } = Dimensions.get("window");

const ProviderSchedule = ({ navigation }) => {
  const [selectedFromTime, setSelectedFromTime] = useState(null);
  const [selectedToTime, setSelectedToTime] = useState(null);
  const [isFromTimePickerVisible, setFromTimePickerVisibility] = useState(false);
  const [isToTimePickerVisible, setToTimePickerVisibility] = useState(false);
  const [userId, setUserId] = useState(null);

  const { createSchedule, loading, error } = useCreateSchedule();

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
    };
    getUserId();
  }, []);

  const showFromTimePicker = () => setFromTimePickerVisibility(true);
  const hideFromTimePicker = () => setFromTimePickerVisibility(false);

  const handleConfirmFromTime = (time) => {
    setSelectedFromTime(moment(time).format("hh:mm A"));
    hideFromTimePicker();
  };

  const showToTimePicker = () => setToTimePickerVisibility(true);
  const hideToTimePicker = () => setToTimePickerVisibility(false);

  const handleConfirmToTime = (time) => {
    setSelectedToTime(moment(time).format("hh:mm A"));
    hideToTimePicker();
  };

  const handleSubmit = async () => {
    if (selectedFromTime && selectedToTime && userId) {
      if (moment(selectedFromTime, "hh:mm A").isBefore(moment(selectedToTime, "hh:mm A"))) {
        const scheduleDetails = {
          scheduleFromTime: selectedFromTime,
          scheduleToTime: selectedToTime,
          providerId: userId,
        };

        const success = await createSchedule(scheduleDetails);
        if (success) {
          setSelectedFromTime(null);
          setSelectedToTime(null);
          navigation.navigate("Schedules");
        } else {
          alert(error || "Error creating schedule");
        }
      } else {
        alert("From time must be before To time.");
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
          {selectFromTime()}
          {selectToTime()}
        </ScrollView>
      </View>
      {confirmButton()}
      <Loader isLoading={loading} />
    </View>
  );

  function confirmButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSubmit}
        style={styles.buttonStyle}
        disabled={loading}
      >
        <Text style={{ ...Fonts.whiteColor17Bold }}>
          {loading ? "Creating..." : "Create Schedule"}
        </Text>
      </TouchableOpacity>
    );
  }

  function selectFromTime() {
    return (
      <View style={styles.timeContainer}>
        <Text style={styles.timeTitle}>Available From</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={showFromTimePicker}
          style={styles.timeWrapStyle}
        >
          <Text style={selectedFromTime ? styles.timeText : styles.placeholderText}>
            {selectedFromTime ? selectedFromTime : "Select From Time"}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isFromTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmFromTime}
          onCancel={hideFromTimePicker}
        />
      </View>
    );
  }

  function selectToTime() {
    return (
      <View style={styles.timeContainer}>
        <Text style={styles.timeTitle}>To</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={showToTimePicker}
          style={styles.timeWrapStyle}
        >
          <Text style={selectedToTime ? styles.timeText : styles.placeholderText}>
            {selectedToTime ? selectedToTime : "Select To Time"}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isToTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmToTime}
          onCancel={hideToTimePicker}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View>
          <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
            Create Schedule
          </Text>
        </View>
        <View style={{marginTop:5}}>
          <TouchableOpacity onPress={() => navigation.navigate("Schedules")}>
            <Text style={{fontSize:15}}>My schedule</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default ProviderSchedule;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    display: 'flex',flexDirection:'row',
    justifyContent: "space-between",
    padding: Sizes.fixPadding * 2.0,
  },
  timeContainer: {
    padding: Sizes.fixPadding * 2.0,
  },
  timeWrapStyle: {
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding + 2.0,
    marginTop: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  timeTitle: {
    ...Fonts.blackColor17Bold,
    marginBottom: Sizes.fixPadding,
  },
  timeText: {
    ...Fonts.blackColor15Regular,
  },
  placeholderText: {
    ...Fonts.grayColor15Regular,
  },
});
