import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { CartContext } from "../UseContext/context";
import { SafeAreaView } from "react-native-safe-area-context";
import { AllProducts } from "../Services/allproducts";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
export default function Cart() {
  const navigation = useNavigation();
  const {
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    cart,
    decreaseCount,
    increaseCount,
    wishlist,
  } = useContext(CartContext);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const matchedProducts = cart
      .map((cartItem) =>
        AllProducts.find((product) => product._id === cartItem.productId)
      )
      .filter(Boolean); // Filter out undefined values if no match is found

    setData(matchedProducts);
    console.log(matchedProducts);
  }, [cart]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="relative flex-1">
        <View className="mt-5 flex-grow">
          <View className="ml-3 mb-8">
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          {data.length > 0 ? (
            <ScrollView>
              {data.map((item, index) => {
                const cartItem = cart.find(
                  (item1) => item1.productId === item._id
                );
                if (!cartItem) return null; // Skip if no matching cart item

                return (
                  <View
                    className="bg-white rounded-xl mx-4 p-2 py-4 mb-4"
                    key={index}
                  >
                    <View className="flex flex-row justify-between items-center">
                      <View>
                        <Text className="text-[20px]">{item.name}</Text>
                      </View>
                      <View className="flex flex-row items-center justify-between gap-x-5">
                        <View className="flex flex-row items-center gap-x-2 border-[0.7px] rounded-xl p-2">
                          <AntDesign
                            name="minus"
                            size={24}
                            color="green"
                            onPress={() => decreaseCount(item._id)}
                          />
                          <Text className="text-green-500 font-bold text-[18px]">
                            {cartItem.count}
                          </Text>
                          <AntDesign
                            name="plus"
                            size={24}
                            color="green"
                            onPress={() => increaseCount(item._id)}
                          />
                        </View>
                        <Text className="text-[23px]">₹{item.price}</Text>
                      </View>
                    </View>
                    <View className="border-b-[0.7px] border-dotted mt-4"></View>
                    <View className="flex flex-row justify-between items-center mt-4">
                      <Text className="text-[20px] text-gray-500">
                        Add more items
                      </Text>
                      <AntDesign
                        name="pluscircleo"
                        size={24}
                        color="black"
                        onPress={() => navigation.navigate("Menu")}
                      />
                    </View>
                    <View className="border-b-[0.7px] border-dotted mt-4"></View>
                    <View className="flex flex-row justify-between items-center mt-4">
                      {toggle ? (
                        <TextInput
                          placeholder="Type cooking requests"
                          className="border-b-[0.7px] "
                        />
                      ) : (
                        <Text className="text-[20px] text-gray-500">
                          Type cooking requests
                        </Text>
                      )}
                      <AntDesign
                        name="pluscircleo"
                        size={24}
                        color="black"
                        onPress={() => setToggle(!toggle)}
                      />
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <View className="flex justify-center items-center">
              <Text className="text-[32px] ">No cart items</Text>
            </View>
          )}
        </View>
        {data.length > 0 && (
          <TouchableOpacity className="bg-orange-400 p-2 mx-20 rounded-lg mb-2 ">
            <Text className="text-center text-white text-xl">Proceed</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
