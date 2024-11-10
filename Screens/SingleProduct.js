import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AllProducts } from "./Services/allproducts";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "./UseContext/context";
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
  const handleaddtocart = (id) => {
    // console.log(id)
    addToCart(id);
    console.log(id);
  };
  return (
    <SafeAreaView className="relative flex-1">
      <View className="mt-2 bg-gray-400 " style={style.main}>
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
            <AntDesign name="sharealt" size={24} color="black" />
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
      <View className="bg-gray-400 mx-7 rounded-xl p-2 mt-20 flex flex-row justify-between">
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
            <AntDesign name={toggle ? "up" : "down"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="">
          {data.map((item, index) => {
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
                    <Text className="text-gray-500 text-[22px]">{"(182)"}</Text>
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
                      className="bg-white -mt-5 p-3 rounded-2xl mx-5 shadow-lg"
                      onPress={() => {
                        handleaddtocart(item._id);
                        setCartview((prev) => ({
                          ...prev,
                          count: prev.count + 1,
                          view: true,
                        }));
                      }}
                    >
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
        <ScrollView>
          {veg.slice(0, 14).map((item, index) => {
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
                    <Text className="text-gray-500 text-[22px]">{"(182)"}</Text>
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
                    <Text className="text-gray-500 text-[22px]">{"(182)"}</Text>
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

      <TouchableOpacity
        className="bg-green-500 p-2 px-3 w-full rounded-xl  py-5 absolute bottom-0 flex justify-between flex-row items-start"
        style={{ display: cartview.count > 0 ? "flex" : "none" }}
        onPress={() => navigation.navigate("tab3")}
      >
        <View>
          <Text className="text-[20px]">
            {cartview.count} {cartview.count > 1 ? "items" : "item"} added into
            cart
          </Text>
        </View>
        <View className="flex flex-row items-center gap-x-2">
          <Text className="text-[20px]">Cart</Text>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  main: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
