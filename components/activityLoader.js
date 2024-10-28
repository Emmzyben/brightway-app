import React from 'react';  
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Sizes } from '../constants/styles';
import { Circle } from "react-native-animated-spinkit";

const Loader = ({ isLoading }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isLoading}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View style={{ justifyContent: "center", flex: 1 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => { }}
            style={styles.dialogStyle}
          >
            <View style={{ alignItems: "center" }}>
              <Circle color={Colors.primaryColor} size={56} />
              <Text
                style={{
                  marginTop: Sizes.fixPadding * 2.0,
                  ...Fonts.grayColor15Regular,
                }}
              >
                Please Wait...
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialogStyle: {
    width: "85%",
    padding: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    alignSelf: 'center',
  },
});

export default Loader;
