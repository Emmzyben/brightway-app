import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabBarScreen from './components/bottomTabBarScreen';
import ProviderBottomTabBar from './components/providerBottomTabBar';
import DriverBottomTabBar from './components/driverBottomTabBar';
import CategoryDetailScreen from './screens/categoryDetail/categoryDetailScreen';
import NearestHospitalScreen from './screens/nearestHospital/nearestHospitalScreen';
import HospitalDetailScreen from './screens/hospitalDetail/hospitalDetailScreen';
import SearchDoctorsScreen from './screens/searchDoctors/searchDoctorsScreen';
import DoctorsScreen from './screens/doctors/doctorsScreen';
import DoctorDetailScreen from './screens/doctorDetail/doctorDetailScreen';
import DoctorReviewsScreen from './screens/doctorReviews/doctorReviewsScreen';
import BookAppointmentScreen from './screens/bookAppointment/bookAppointmentScreen';
import AppointmentDetailScreen from './screens/appointmentDetail/appointmentDetailScreen';
import ChatWithDoctorScreen from './screens/chatWithDoctor/chatWithDoctorScreen';
import SellerProfileScreen from './screens/sellerProfile/sellerProfileScreen';
import ShopByCategoryScreen from './screens/shopByCategory/shopByCategoryScreen';
import MedicineDetailScreen from './screens/medicineDetail/medicineDetailScreen';
import CartScreen from './screens/cart/cartScreen';
import CheckoutScreen from './screens/checkout/checkoutScreen';
import PaymentMethodsScreen from './screens/paymentMethods/paymentMethodsScreen';
import OrderPlacedScreen from './screens/orderPlaced/orderPlacedScreen';
import EditProfileScreen from './screens/editProfile/editProfileScreen';
import WalletScreen from './screens/wallet/walletScreen';
import OrdersScreen from './screens/orders/ordersScreen';
import OrderStatusScreen from './screens/orderStatus/orderStatusScreen';
import OrderTrackScreen from './screens/orderTrack/orderTrackScreen';
import ChatWithDeliveryBoyScreen from './screens/chatWithDeliveryBoy/chatWithDeliveryBoyScreen';
import ReviewScreen from './screens/review/reviewScreen';
import PillReminderScreen from './screens/pillReminder/pillReminderScreen';
import CreateReminderScreen from './screens/createReminder/createReminderScreen';
import SavedAddressesScreen from './screens/savedAddresses/savedAddressesScreen';
import AddNewAddressScreen from './screens/addNewAddress/addNewAddressScreen';
import NotificationsScreen from './screens/notifications/notificationsScreen';
import SavedScreen from './screens/saved/savedScreen';
import ContactusScreen from './screens/contactUs/constactUsScreen';
import Conversation from './screens/conversations/conversation';
import TermsAndConditionScreen from './screens/termsAndCondition/termsAndConditionScreen';
import FaqsScreen from './screens/faqs/faqsScreen';
import SplashScreen from './screens/splashScreen';
import OnboardingScreen from './screens/onboarding/onboardingScreen';
import LoginScreen from './screens/auth/loginScreen';
import SignupScreen from './screens/auth/signupScreen';
import SignupScreen1 from './screens/auth/signupScreen1';
import SignupScreen2 from './screens/auth/signupScreen2';
import SignupScreen3 from './screens/auth/signupScreen3';
import SignupScreen4 from './screens/auth/signupScreen4';
import VerificationScreen from './screens/auth/verificationScreen';
import HomeScreen from './screens/home/homeScreen';
import ChatWithPatientScreen from './screens/chatWithPatient/chatWithPatientScreen';
import AddHospitalScreen from './screens/addHospital/addHospitalScreen';
import AddSpecializationScreen from './screens/addSpecialization/addSpecializationScreen';
import ChatWithCustomerScreen from './screens/chatWithCustomer/chatWithCustomerScreen';
import ChatWithSellerScreen from './screens/chatWithSeller/chatWithSellerScreen';
import DeliverySuccessScreen from './screens/deliverySuccess/deliverySuccessScreen';
import InsightScreen from './screens/insight/insightScreen';
import OrderInfoScreen from './screens/orderInfo/orderInfoScreen';
import OrderDetailScreen from './screens/orderDetail/orderDetailScreen';
import StoreItemsScreen from './screens/storItems/storeItemsScreen';
import EditItemScreen from './screens/editItem/editItemScreen';
import ProductReviewsScreen from './screens/productReviews/productReviewsScreen';
import AddNewItemScreen from './screens/addNewItem/addNewItemScreen';
import ProviderHome from './screens/providerHome/providerHome';
import { LogBox } from 'react-native';
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { useCallback } from 'react';
import { UserProvider } from './screens/auth/user';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProviderAppointmentScreen from './screens/appointment/ProviderAppointmentScreen';
import ProviderAppointmentDetailScreen from './screens/appointmentDetail/ProviderappointmentDetailScreen';
import ProviderSchedule from './screens/bookAppointment/ProviderSchedule';
import DriverHome from './screens/driverHome/driverhome';
import DriverAppointmentScreen from './screens/appointment/driverAppointmentScreen';
import DriverAppointmentDetailScreen from './screens/appointmentDetail/DriverappointmentDetailScreen';
import DriverConversation from './screens/conversations/driverConversation';
import StaffHome from './screens/staffHome/staffHome';
import StaffBottomTabBar from './components/StaffBottomTabBar';
import BookDriver from './screens/StaffScreens/bookDriver';
import DriversScreen from './screens/doctors/driversScreen';
import RecordScreen from './screens/StaffScreens/recordScreen';
import UserInfo from './components/userInfo';
import UpperTab from './components/upperTab';
import StaffAppointmentScreen from './screens/appointment/staffAppointmentScreen';
import StaffAppointmentDetailScreen from './screens/appointmentDetail/staffappointmentDetailScreen';
ExpoSplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs()

const Stack = createNativeStackNavigator();

function MyApp() {
  const [fontsLoaded] = useFonts({
    Mulish_Regular: require("./assets/fonts/Mulish-Regular.ttf"),
    Mulish_Medium: require("./assets/fonts/Mulish-Medium.ttf"),
    Mulish_SemiBold: require("./assets/fonts/Mulish-SemiBold.ttf"),
    Mulish_Bold: require("./assets/fonts/Mulish-Bold.ttf"),
    Mulish_ExtraBold: require("./assets/fonts/Mulish-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (<GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <UserProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ ...TransitionPresets.DefaultTransition }} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Signup1" component={SignupScreen1} />
            <Stack.Screen name="Signup2" component={SignupScreen2} />
            <Stack.Screen name="Signup3" component={SignupScreen3} />
            <Stack.Screen name="Signup4" component={SignupScreen4} />
            <Stack.Screen name="Conversation" component={Conversation} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
            <Stack.Screen name="ProviderBottomTabBar" component={ProviderBottomTabBar} options={{ ...TransitionPresets.DefaultTransition }} />
            <Stack.Screen name="DriverBottomTabBar" component={DriverBottomTabBar} options={{ ...TransitionPresets.DefaultTransition }} />
            <Stack.Screen name="StaffBottomTabBar" component={StaffBottomTabBar} options={{ ...TransitionPresets.DefaultTransition }} />
            <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
            <Stack.Screen name="NearestHospital" component={NearestHospitalScreen} />
            <Stack.Screen name="HospitalDetail" component={HospitalDetailScreen} />
            <Stack.Screen name="SearchDoctors" component={SearchDoctorsScreen} />
            <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
            <Stack.Screen name="Doctors" component={DoctorsScreen} />
            <Stack.Screen name="DriversScreen" component={DriversScreen} />
            <Stack.Screen name="DoctorReviews" component={DoctorReviewsScreen} />
            <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
            <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
            <Stack.Screen name="ProviderAppointmentDetail" component={ProviderAppointmentDetailScreen} />
            <Stack.Screen name="ChatWithDoctor" component={ChatWithDoctorScreen} />
            <Stack.Screen name="SellerProfile" component={SellerProfileScreen} />
            <Stack.Screen name="ShopByCategory" component={ShopByCategoryScreen} />
            <Stack.Screen name="MedicineDetail" component={MedicineDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
            <Stack.Screen name="OrderTrack" component={OrderTrackScreen} />
            <Stack.Screen name="ChatWithDeliveryBoy" component={ChatWithDeliveryBoyScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen name="PillReminder" component={PillReminderScreen} />
            <Stack.Screen name="CreateReminder" component={CreateReminderScreen} />
            <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
            <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Saved" component={SavedScreen} />
            <Stack.Screen name="Contactus" component={ContactusScreen} />
            <Stack.Screen name="TermsAndCondition" component={TermsAndConditionScreen} />
            <Stack.Screen name="Faqs" component={FaqsScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ChatWithPatient" component={ChatWithPatientScreen} />
            <Stack.Screen name="AddHospital" component={AddHospitalScreen} />
            <Stack.Screen name="AddSpecialization" component={AddSpecializationScreen} />
            <Stack.Screen name="ChatWithCustomer" component={ChatWithCustomerScreen} />
            <Stack.Screen name="ChatWithSeller" component={ChatWithSellerScreen} />
            <Stack.Screen name="DeliverySuccess" component={DeliverySuccessScreen} />
            <Stack.Screen name="OrderInfo" component={OrderInfoScreen} />
            <Stack.Screen name="StoreItems" component={StoreItemsScreen} />
            <Stack.Screen name="EditItem" component={EditItemScreen} />
            <Stack.Screen name="ProductReviews" component={ProductReviewsScreen} />
            <Stack.Screen name="AddNewItem" component={AddNewItemScreen} />
            <Stack.Screen name="Insight" component={InsightScreen} />
            <Stack.Screen name="ProviderHome" component={ProviderHome} />
            <Stack.Screen name="ProviderAppointmentScreen" component={ProviderAppointmentScreen} />
            <Stack.Screen name="ProviderSchedule" component={ProviderSchedule} />
            <Stack.Screen name="DriverHome" component={DriverHome} />
            <Stack.Screen name="StaffHome" component={StaffHome} />
            <Stack.Screen name="DriverConversation" component={DriverConversation} />
            <Stack.Screen name="DriverAppointmentScreen" component={DriverAppointmentScreen} />
            <Stack.Screen name="DriverAppointmentDetailScreen" component={StaffAppointmentDetailScreen} />
            <Stack.Screen name="StaffAppointmentScreen" component={StaffAppointmentScreen} />
            <Stack.Screen name="StaffAppointmentDetailScreen" component={DriverAppointmentDetailScreen} />
            <Stack.Screen name="BookDriver" component={BookDriver} />
            <Stack.Screen name="RecordScreen" component={RecordScreen} />
            <Stack.Screen name="UserInfo" component={UserInfo} />
            <Stack.Screen name="UpperTab" component={UpperTab} />
          </Stack.Navigator>
        </UserProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
    );
  }
}

export default MyApp;