import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AllProducts } from "./Services/allproducts";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "./UseContext/context";
import banner from ".././Screens/assests/6985.jpg";
import RBSheet from "react-native-raw-bottom-sheet";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
export default function SingleProduct({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState({});
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const navigation = useNavigation();
  const [veg, setVeg] = useState([]);
  const [nonveg, setNonVeg] = useState([]);
  const [vegtoggle, setVegtoggle] = useState(false);
  const [nonvegtoggle, setNonVegtoggle] = useState(false);
  const [addtocart, setAddtocart] = useState([
    {
      view: false,
      id: "",
    },
  ]);
  const refRBSheet = useRef();
  const {
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    cart,
    wishlist,
  } = useContext(CartContext);

  const [cartview, setCartview] = useState({
    count: 0,
    view: false,
  });
  useEffect(() => {
    fun();
    fun1();
    fun2();
    const foundProduct = AllProducts.find((item) => item._id === id);
    setProduct(foundProduct);
  }, [id]);
  function fun() {
    setData(AllProducts);
  }
  function fun1() {
    setVeg(AllProducts);
  }
  function fun2() {
    setNonVeg(AllProducts);
  }

  const handleAddToCart = (id) => {
    addToCart(id);
    setCartview((prev) => ({
      ...prev,
      count: prev.count + 1,
      view: true,
    }));
    setAddtocart((prev) => {
      const isInCart = prev.find((item) => item.id === id);

      if (!isInCart) {
        return [...prev, { view: true, id }];
      }
      return prev;
    });
  };

  return (
    <SafeAreaView className="relative flex-1">
      <StatusBar animated={true} backgroundColor="#9ca3af" />
      <View className=" bg-gray-400 " style={style.main}>
        <View className="flex flex-row justify-between items-center">
          <View className="ml-3">
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View className="flex flex-row gap-x-4 mr-3">
            <MaterialIcons name="favorite-border" size={24} color="black" />
            <AntDesign
              name="sharealt"
              size={24}
              color="black"
              onPress={() => refRBSheet.current.open()}
            />
          </View>
        </View>
        <View className="bg-white  rounded-xl mx-5 p-3 my-5 flex flex-row justify-between">
          <View>
            <Text className="font-bold text-[18px]">{product.name}</Text>
            <View className="flex flex-row items-center gap-x-1 ">
              <Text>12-25 mins</Text>
              <View className="bg-black w-1 h-1 rounded-full"></View>
              <Text>5.6km</Text>
              <View className="bg-black w-1 h-1 rounded-full"></View>
              <Text>{product.address}</Text>
            </View>
            <Text className="text-gray-500">South indian</Text>
          </View>
          <View className="flex flex-col items-start gap-y-1">
            <View className="flex flex-row bg-green-500 p-1 w-12 px-2 items-center gap-x-1 rounded-lg">
              <AntDesign name="staro" size={20} color="black" />
              <Text className="text-md">{product.rating}</Text>
            </View>
            {/* <Text>{product.reviews.length} rating</Text> */}
          </View>
        </View>
      </View>
      <ScrollView className="relative ">
        <Image source={banner} className="w-80 mt-3 h-32 mx-auto rounded-md" />

        <View className="bg-gray-400 mx-7 rounded-xl p-2 mt-5 flex flex-row justify-between">
          <TextInput placeholder="Search for dishes" />
          <View className="flex flex-row gap-x-3">
            <Feather name="search" size={24} color="black" />
            <View className="border-r-2 border-gray-500"></View>
          </View>
        </View>
        <View className="p-2 mt-5 ">
          <View className="flex flex-row justify-between">
            <Text className="font-bold text-xl">Reccommended{" ( 29 ) "}</Text>

            <TouchableOpacity
              // onPress={() => setToggle(!toggle)}
              onPress={() => {
                setToggle(!toggle);
                if (!toggle) {
                  setData([]);
                } else {
                  fun();
                }
              }}
            >
              <AntDesign
                name={toggle ? "up" : "down"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="">
            {data.map((item, index) => {
              const isAdded = addtocart.some(
                (cartItem) => cartItem.id === item._id && cartItem.view
              );
              return (
                <View className="p-2 flex flex-row justify-between" key={index}>
                  <View>
                    <Text className="text-2xl font-bold">{item.name}</Text>
                    <View className="flex flex-row items-center justify-start">
                      <Text className="text-md">₹</Text>
                      <Text className="text-xl">{item.price}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-x-1">
                      <AntDesign name="star" size={18} color="green" />
                      <Text className="text-green-700 text-[24px]">
                        {item.rating}
                      </Text>
                      <Text className="text-gray-500 text-[22px]">
                        {"(182)"}
                      </Text>
                    </View>
                    <View className="bg-pink-200 rounded-2xl p-2 flex flex-row  items-center gap-x-2">
                      <Entypo name="save" size={24} color="white" />
                      <Text className="text-[18px] text-gray-500">
                        Save to Eatlist
                      </Text>
                    </View>
                    <Text className="mt-2 text-[19px]">{item.desc}...more</Text>
                  </View>
                  <View className="">
                    <View className="relative">
                      <Image
                        source={item.image}
                        className="w-40 h-32 rounded-xl shadow-lg "
                      />
                      <TouchableOpacity
                        className={`${
                          isAdded ? "bg-gray-500" : "bg-white"
                        } -mt-5 p-3 rounded-2xl mx-5 shadow-lg`}
                        onPress={() => handleAddToCart(item._id)}
                      >
                        <Text className="text-green-600 text-center text-[20px]">
                          {isAdded ? "ADDED" : "ADD"}
                        </Text>
                      </TouchableOpacity>

                      <Text className="text-gray-500 text-center">
                        Customisable
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View className="p-2 mt-5">
          <View className="flex flex-row justify-between">
            <Text className="font-bold text-xl">Veg Products{" ( 14 ) "}</Text>
            <TouchableOpacity
              onPress={() => {
                setVegtoggle(!vegtoggle);
                if (!vegtoggle) {
                  setVeg([]);
                } else {
                  fun1();
                }
              }}
            >
              <AntDesign
                name={vegtoggle ? "up" : "down"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <ScrollView className="">
            {veg.slice(0, 15).map((item, index) => {
              return (
                <View className="p-2 flex flex-row justify-between" key={index}>
                  <View>
                    <Text className="text-2xl font-bold">{item.name}</Text>
                    <View className="flex flex-row items-center justify-start">
                      <Text className="text-md">₹</Text>
                      <Text className="text-xl">{item.price}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-x-1">
                      <AntDesign name="star" size={18} color="green" />
                      <Text className="text-green-700 text-[24px]">
                        {item.rating}
                      </Text>
                      <Text className="text-gray-500 text-[22px]">
                        {"(182)"}
                      </Text>
                    </View>
                    <View className="bg-pink-200 rounded-2xl p-2 flex flex-row  items-center gap-x-2">
                      <Entypo name="save" size={24} color="white" />
                      <Text className="text-[18px] text-gray-500">
                        Save to Eatlist
                      </Text>
                    </View>
                    <Text className="mt-2 text-[19px]">{item.desc}...more</Text>
                  </View>
                  <View className="">
                    <View className="relative">
                      <Image
                        source={item.image}
                        className="w-40 h-32 rounded-xl shadow-lg "
                      />
                      <TouchableOpacity className="bg-white -mt-5 p-3 rounded-2xl mx-5 shadow-lg">
                        <Text className="text-green-600 text-center text-[20px]">
                          ADD
                        </Text>
                      </TouchableOpacity>
                      <Text className="text-gray-500 text-center">
                        Customisable
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View className="p-2 mt-5">
          <View className="flex flex-row justify-between">
            <Text className="font-bold text-xl">
              Non-Veg Products{" ( 13 ) "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setNonVegtoggle(!nonvegtoggle);
                if (!nonvegtoggle) {
                  setNonVeg([]);
                } else {
                  fun2();
                }
              }}
            >
              <AntDesign
                name={nonvegtoggle ? "up" : "down"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {nonveg.slice(14, 29).map((item, index) => {
              return (
                <View className="p-2 flex flex-row justify-between">
                  <View>
                    <Text className="text-2xl font-bold">{item.name}</Text>
                    <View className="flex flex-row items-center justify-start">
                      <Text className="text-md">₹</Text>
                      <Text className="text-xl">{item.price}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-x-1">
                      <AntDesign name="star" size={18} color="green" />
                      <Text className="text-green-700 text-[24px]">
                        {item.rating}
                      </Text>
                      <Text className="text-gray-500 text-[22px]">
                        {"(182)"}
                      </Text>
                    </View>
                    <View className="bg-pink-200 rounded-2xl p-2 flex flex-row  items-center gap-x-2">
                      <Entypo name="save" size={24} color="white" />
                      <Text className="text-[18px] text-gray-500">
                        Save to Eatlist
                      </Text>
                    </View>
                    <Text className="mt-2 text-[19px]">{item.desc}...more</Text>
                  </View>
                  <View className="">
                    <View className="relative">
                      <Image
                        source={item.image}
                        className="w-40 h-32 rounded-xl shadow-lg "
                      />
                      <TouchableOpacity className="bg-white -mt-5 p-3 rounded-2xl mx-5 shadow-lg">
                        <Text className="text-green-600 text-center text-[20px]">
                          ADD
                        </Text>
                      </TouchableOpacity>
                      <Text className="text-gray-500 text-center">
                        Customisable
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="bg-green-500 p-2 px-3 w-full rounded-xl  py-5 absolute bottom-0 flex justify-between flex-row items-start"
        style={{ display: cartview.count > 0 ? "flex" : "none" }}
        onPress={() => navigation.navigate("cart")}
      >
        <View>
          <Text className="text-[20px]">
            {cartview.count} {cartview.count > 1 ? "items" : "item"} added into
            cart
          </Text>
        </View>
        <View className="flex flex-row items-center gap-x-2">
          <Text className="text-[20px]">View cart</Text>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </TouchableOpacity>
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
              className="bg-blue-500 p-1 rounded-full"
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
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  main: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
