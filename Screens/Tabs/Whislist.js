import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "../UseContext/context";
import { AllProducts } from "../Services/allproducts";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
export default function Tab4() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(CartContext);
  useEffect(() => {
    const matchedProducts = wishlist
      .map((item) =>
        AllProducts.find((product) => product._id === item.productId)
      )
      .filter(Boolean);

    setData(matchedProducts);
    console.log("www", wishlist);
    console.log(matchedProducts);
  }, [wishlist]);
  return (
    <SafeAreaView>
      <ScrollView>
        {data.length > 0 ? (
          <View>
            {data.map((item, index) => {
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
                    <View className="absolute right-1 top-1"></View>
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
                    <MaterialIcons
                      name="favorite"
                      size={26}
                      color="orange"
                      onPress={() => {
                        console.log("Removing from wishlist:", item._id);
                        removeFromWishlist(item._id);
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View className="flex justify-center items-center">
            <Text className="text-[32px] ">No Wishlists</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
