import { useContext, useEffect, useRef, useState } from "react";
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
import RBSheet from "react-native-raw-bottom-sheet";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Linking } from "react-native";
export default function Tab2() {
  const refRBSheet = useRef();
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [toggle, setToggle] = useState({
    view: false,
    id: "",
  });
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
                  <View className="relative">
                    <Entypo
                      name="dots-three-vertical"
                      size={24}
                      color="black"
                      onPress={() => {
                        setToggle((prev) => ({
                          ...prev,
                          view: !prev.view,
                          id: item._id,
                        }));
                      }}
                    />
                  </View>
                  {toggle.view && toggle.id === item._id && (
                    <View className=" absolute w-32 right-10 bg-gray-500 p-3 rounded-lg">
                      <View className="mb-2 rounded-md">
                        <Button title="Add to cart" onPress={()=>addToCart(item._id)}/>
                      </View>
                      <View>
                        <Button
                          title="Share"
                          onPress={() => refRBSheet.current.open()}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <RBSheet
          ref={refRBSheet}
          useNativeDriver={false}
          // style={}
          customStyles={{
            // wrapper: {
            //   backgroundColor: 'transparent',
            // },
            container: {
              height: 170,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
          draggable={true}
          customModalProps={{
            animationType: "slide",
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}
        >
          <View>
            <Text className="text-[23px] ml-3">Share with</Text>
            <View className="flex flex-row items-center gap-x-5 justify-center mt-3">
              <TouchableOpacity
                className="bg-green-500 p-2 rounded-full"
                onPress={() => {
                  const phoneNumber = "918074259123";
                  const message = "Hello!";
                  const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
                    message
                  )}`;
                  Linking.openURL(url).catch(() => {
                    alert("WhatsApp is not installed on your device");
                  });
                }}
              >
                <FontAwesome name="whatsapp" size={44} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-pink-500 p-2 rounded-full"
                onPress={() => {
                  const url = "instagram://user?username=mani_kanta_t";
                  Linking.openURL(url).catch(() => {
                    alert("Instagram is not installed on your device");
                  });
                }}
              >
                <Entypo name="instagram" size={40} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-black p-2 rounded-full"
                onPress={() => {
                  const url = "twitter://user?screen_name=your_username";
                  Linking.openURL(url).catch(() => {
                    alert("Twitter is not installed on your device");
                  });
                }}
              >
                <AntDesign name="twitter" size={40} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                className=" p-2 rounded-full"
                onPress={() => {
                  const url = "fb://profile/Mani0919";
                  Linking.openURL(url).catch(() => {
                    alert("Github is not installed on your device");
                  });
                }}
              >
                <AntDesign name="github" size={50} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 px-[1.3px] py-2 rounded-full"
                onPress={() => {
                  const url = "fb://profile/your_profile_id";
                  Linking.openURL(url).catch(() => {
                    alert("Facebook is not installed on your device");
                  });
                }}
              >
                <EvilIcons name="sc-facebook" size={55} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
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
