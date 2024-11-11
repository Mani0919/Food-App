import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tab1 from "./Screens/Tabs/tab1";
import Tab2 from "./Screens/Tabs/menu";
import cart from "./Screens/Tabs/cart";
import Ionicons from "@expo/vector-icons/Ionicons";
import Second from "./Screens/second";
import Home from "./Screens/home";
import Tab4 from "./Screens/Tabs/Whislist";
import Whatsapp from "./Screens/Tabs/Whatsapp";
import Data from "./Screens/Data";
import SingleProduct from "./Screens/SingleProduct";
import { CartContext, CartProvider } from "./Screens/UseContext/context";
import { useContext } from "react";
import Cart from "./Screens/Tabs/cart";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { cart, wishlist } = useContext(CartContext);
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
    </Tab.Navigator>
  );
}

// The main app
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Tabs">
            <Stack.Screen name="Home" component={Home} />
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
            
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
