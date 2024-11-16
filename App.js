import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tab1 from "./Screens/Tabs/tab1";
import Tab2 from "./Screens/Tabs/menu";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tab4 from "./Screens/Tabs/Whislist";
import Data from "./Screens/Data";
import SingleProduct from "./Screens/SingleProduct";
import { CartContext, CartProvider } from "./Screens/UseContext/context";
import { useContext, useEffect, useState } from "react";
import Cart from "./Screens/Tabs/cart";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Onborading, { Onboarding } from "./Screens/onBaording/onborading";
import Login_signup from "./Screens/auth/login_signup";
import { Alert, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { cart, wishlist } = useContext(CartContext);
  const navigation = useNavigation();
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => navigation.navigate("auth") }, // Replace this with your logout logic
      ],
      { cancelable: true }
    );
  };

  return (
    <Tab.Navigator
      // initialRouteName="Menu"
      screenOptions={{
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tab.Screen
        name="home"
        component={Tab1}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} style={{ color: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Tab2}
        options={{
          // headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="menu-outline" size={24} style={{ color: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarBadge: cart.length > 0 ? cart.length : undefined,
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={24} style={{ color: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Whishlist"
        component={Tab4}
        options={{
          // tabBarLabel: "Wishlist",
          tabBarBadge: wishlist.length > 0 ? wishlist.length : undefined,
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={24} style={{ color: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={() => null}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="log-out-outline"
              size={24}
              style={{ color: color }}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Tab.Navigator>
  );
}

// The main app
export default function App() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(null);
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasOnboarded = await AsyncStorage.getItem("onboarding");
      setIsOnboardingCompleted(hasOnboarded === "true");
    };
    checkOnboardingStatus();
  }, []);

  if (isOnboardingCompleted === null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {isOnboardingCompleted === false ? (
              <Stack.Screen
                name="Onborading"
                component={Onboarding}
                options={{
                  headerShown: false,
                }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="auth"
                  component={Login_signup}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Tabs"
                  component={TabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="singleproduct"
                  component={SingleProduct}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="About" component={Data} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
