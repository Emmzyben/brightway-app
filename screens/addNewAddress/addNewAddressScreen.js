import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MapView, { Marker } from "react-native-maps";
import MyStatusBar from "../../components/myStatusBar";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const AddNewAddressScreen = ({ navigation }) => {
  const [currentmarker, setCurrentMarker] = useState({
    latitude: LATITUDE - SPACE,
    longitude: LONGITUDE - SPACE,
  });
  const [userLocationAvailable, setuserLocationAvailable] = useState(false);
  const [address, setAddress] = useState("");
  const [showSheet, setshowSheet] = useState(false);
  const [selectedAddressTypeIndex, setselectedAddressTypeIndex] = useState(2);
  const [typeAddress, settypeAddress] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      } else {
        const location = await Location.getCurrentPositionAsync();
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCurrentMarker(userLocation);
        setuserLocationAvailable(true);
        getAddress({ location: userLocation });
        getAddress({ location: userLocation });
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'height' : null}
      style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}
    >
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {userLocationAvailable && address != "" ? (
          <>
            {mapView()}
            {!showSheet ? (
              <>
                {addressInfo()}
                {pickThisPlaceButton()}
              </>
            ) : null}
          </>
        ) : (
          loadingSpinner()
        )}
      </View>
      {showSheet ? addressDetailSheet() : null}
    </KeyboardAvoidingView>
  );

  function loadingSpinner() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={Colors.primaryColor} size={40} />
      </View>
    );
  }

  function addressDetailSheet() {
    return (
      <View style={styles.addressDetailSheetWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.sheetHeaderStyle}>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <MaterialIcons
                name="location-pin"
                color={Colors.primaryColor}
                size={20}
              />
              <Text
                numberOfLines={1}
                style={{
                  marginHorizontal: Sizes.fixPadding - 5.0,
                  flex: 1,
                  ...Fonts.blackColor16Medium,
                }}
              >
                {address}
              </Text>
            </View>
            <MaterialIcons
              name="close"
              color={Colors.blackColor}
              size={20}
              onPress={() => {
                setshowSheet(false);
              }}
            />
          </View>
          <View
            style={{
              marginHorizontal: Sizes.fixPadding * 2.0,
              marginTop: Sizes.fixPadding * 2.5,
            }}
          >
            <Text
              style={{
                marginBottom: Sizes.fixPadding,
                ...Fonts.grayColor14Medium,
              }}
            >
              Select Address Type
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {addressTypeSort({ icon: "home", type: "Home", index: 0 })}
              {addressTypeSort({
                icon: "office-building",
                type: "Office",
                index: 1,
              })}
              {addressTypeSort({
                icon: "map-marker",
                type: "Other",
                index: 2,
              })}
            </View>
          </View>
          <View style={{ margin: Sizes.fixPadding * 2.0 }}>
            <Text
              style={{
                marginBottom: Sizes.fixPadding,
                ...Fonts.grayColor14Medium,
              }}
            >
              Enter Address
            </Text>
            <TextInput
              placeholder="Address"
              placeholderTextColor={Colors.grayColor}
              value={typeAddress}
              onChangeText={(value) => {
                settypeAddress(value);
              }}
              style={{ ...styles.addressFieldStyle }}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setshowSheet(false), navigation.pop();
            }}
            style={{ ...styles.buttonStyle }}
          >
            <Text style={{ ...Fonts.whiteColor17Bold }}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  function addressTypeSort({ icon, type, index }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setselectedAddressTypeIndex(index);
        }}
        style={{
          backgroundColor:
            selectedAddressTypeIndex == index
              ? Colors.primaryColor
              : Colors.bodyBackColor,
          marginHorizontal: index == 1 ? Sizes.fixPadding * 2.0 : 0.0,
          ...styles.addressTypeWrapStyle,
        }}
      >
        <MaterialCommunityIcons
          name={icon}
          color={
            selectedAddressTypeIndex == index
              ? Colors.whiteColor
              : Colors.primaryColor
          }
          size={16}
        />
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding - 2.0,
            ...(selectedAddressTypeIndex == index
              ? { ...Fonts.whiteColor16Medium }
              : { ...Fonts.blackColor16Medium }),
          }}
        >
          {type}
        </Text>
      </TouchableOpacity>
    );
  }

  function pickThisPlaceButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setshowSheet(true);
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor17Bold }}>Pick This Place</Text>
      </TouchableOpacity>
    );
  }

  function addressInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          padding: Sizes.fixPadding * 2.0,
          flexDirection: "row",
        }}
      >
        <MaterialIcons
          name="location-pin"
          color={Colors.primaryColor}
          size={24}
        />
        <Text
          numberOfLines={2}
          style={{
            marginLeft: Sizes.fixPadding - 5.0,
            flex: 1,
            ...Fonts.blackColor16Medium,
          }}
        >
          {address}
        </Text>
      </View>
    );
  }

  function mapView() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: currentmarker.latitude,
          longitude: currentmarker.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        mapType="terrain"
      >
        <Marker
          coordinate={currentmarker}
          onDragEnd={(e) => {
            setCurrentMarker(e.nativeEvent.coordinate),
              getAddress({ location: e.nativeEvent.coordinate });
          }}
          draggable
        >
          <MaterialIcons
            name="location-pin"
            color={Colors.primaryColor}
            size={30}
          />
        </Marker>
      </MapView>
    );
  }

  async function getAddress({ location }) {
    var streetNo = "";
    var street = "";
    var district = "";
    var postalCode = "";
    var city = "";
    var region = "";
    var country = "";
    let response = await Location.reverseGeocodeAsync(location);
    for (let item of response) {
      if (item.streetNumber != null) {
        streetNo = `${item.streetNumber} `;
      }
      if (item.street != null) {
        street = `${item.street}, `;
      }
      if (item.district != null) {
        district = `${item.district}, `;
      }
      if (item.postalCode != null) {
        postalCode = `${item.postalCode}, `;
      }
      if (item.city != null) {
        city = `${item.city}, `;
      }
      if (item.region != null) {
        region = `${item.region}, `;
      }
      if (item.country != null) {
        country = `${item.country}`;
      }

      let address = `${streetNo}${street}${district}${postalCode}${city}${region}${country}`;
      setAddress(address);
    }
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text
          numberOfLines={1}
          style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}
        >
          Add New Address
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

export default AddNewAddressScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  addressTypeWrapStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.fixPadding,
    justifyContent: "center",
    padding: Sizes.fixPadding + 2.0,
  },
  sheetHeaderStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
  },
  addressFieldStyle: {
    backgroundColor: Colors.bodyBackColor,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 3.0,
    ...Fonts.blackColor16Medium,
  },
  addressDetailSheetWrapper: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
