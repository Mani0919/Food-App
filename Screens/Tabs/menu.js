import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  form,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AllProducts } from "../Services/allproducts";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../UseContext/context";
export default function Tab2() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(false);
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
  useEffect(() => {
    setData(AllProducts);
  }, [wishlist]);
  const [wishlistStatus, setWishlistStatus] = useState({});
  const toggleWishlist = (productId) => {
    // Toggle the wishlist status for a specific product
    if (wishlistStatus[productId]) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    setWishlistStatus((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {data.map((item, index) => {
            const wishlistdata = wishlist.find(
              (item1) => item1.productId === item._id
            );
            const isInWishlist = wishlistdata || wishlistStatus[item._id];
            return (
              <TouchableOpacity
                key={index}
                className="mb-5 p-2 flex flex-row items-center gap-x-6 shadow-lg relative"
                onPress={() =>
                  navigation.navigate("singleproduct", {
                    id: item._id,
                  })
                }
              >
                <View className="relative">
                  <Image
                    source={item.image}
                    className="w-32 h-40 rounded-xl shadow-lg"
                  />
                  <View className="absolute right-1 top-1">
                    <MaterialIcons
                      name={
                        wishlistStatus[item._id]
                          ? "favorite"
                          : "favorite-border"
                      }
                      size={26}
                      color={isInWishlist ? "orange" : "white"}
                      onPress={() => toggleWishlist(item._id)}
                    />
                  </View>
                  <View className="absolute bottom-2">
                    <Text className="text-white font-bold text-xl ml-2">
                      {item.discount}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="font-bold text-[24px]">{item.name}</Text>
                  <View className="flex flex-row items-center gap-x-2">
                    <View className="bg-green-500 rounded-full p-1 w-7">
                      <AntDesign name="staro" size={20} color="white" />
                    </View>
                    <Text className="text-[19px] font-bold">
                      {item.rating} ({item.reviews.length}k+)
                    </Text>
                  </View>
                  <View>
                    <Text className="text-gray-500 text-[16px]">
                      {item.address} 1.7km
                    </Text>
                    <Text>{item.desc}</Text>
                  </View>
                </View>
                <View className="absolute right-4 top-3">
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    borderWidth: 1,
    padding: 5,
    // height:20,
  },
});
