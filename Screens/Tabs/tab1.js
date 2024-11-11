import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import img1 from "./../assests/pizaa.jpg";
import img2 from "./../assests/grocery.jpeg";
import img3 from "./../assests/plate.jpg";
import img4 from "./../assests/deliverybox.jpg";
import * as ImagePicker from "expo-image-picker";
import banner1 from "../../Screens/assests/img11.jpg";
import banner2 from "../../Screens/assests/img12.jpg";
import banner3 from "../../Screens/assests/img13.jpg";
import Carousel from "react-native-reanimated-carousel";
export default function Tab1() {
  const ref = useRef();
  const data = [
    {
      title: "FOOD DELIVERY",
      subtitle: "SWIGGY WEEKENDS",
      tip: "LIVE NOW",
      image: img1,
    },
    {
      title: "INSTAMART",
      subtitle: "GET ANYTHING INSTANTLY",
      tip: "FREE DELIVERY",
      image: img2,
    },
    {
      title: "DINEOUT",
      subtitle: "EAT OUT & SAVE MORE",
      tip: "UP TO 50% OFF",
      image: img3,
    },
    {
      title: "GENIE",
      subtitle: "PICK-UP & DROP",
      // tip:"FREE DELIVERY",
      image: img4,
    },
  ];
  const items = ['"products"', '"dihes"', '"groceries"'];
  const [search, setSearch] = useState("");
  const [image, setImage] = useState("");
  const { width } = Dimensions.get("window");
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setSearch(items[index]);
      index = (index + 1) % items.length; // Cycle through items array
    }, 2000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);

  const openCamera = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      console.log(uri);
      setImage(uri);
    }
  };
  const images = [banner1, banner2, banner3];
  return (
    <SafeAreaView>
      <StatusBar animated={true} backgroundColor="#9ca3af" />
      <ScrollView className="mt-2">
        <View className="flex flex-row justify-between p-2 mx-3">
          <View>
            <View className="flex flex-row items-center gap-x-1">
              <FontAwesome5 name="location-arrow" size={24} color="orange" />
              <Text>Select location</Text>
              <AntDesign name="down" size={24} color="black" />
            </View>
            <Text>Tekkalipatnam village,palasa</Text>
          </View>

          <TouchableOpacity onPress={openCamera}>
            {image === "" ? (
              <Image
                source={require("./../assests/profile.png")}
                className="w-10 h-10"
              />
            ) : (
              <Image
                source={{ uri: image }}
                className="w-12 h-12 rounded-full"
              />
            )}
            {/* <Image source={image} style={style.img} /> */}
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-between items-center border-[0.7px] border-gray-500 rounded-lg mx-10 p-2 mt-5">
          <TextInput placeholder={`Search for ${search}`} />
          <View className="flex flex-row gap-x-1">
            <Feather name="search" size={24} color="black" />
          </View>
        </View>
        <View className="mt-5 h-32">
          <Carousel
            loop
            width={width}
            height={width / 3}
            autoPlay={true}
            data={images}
            mode="parallax" 
            scrollAnimationDuration={2000}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  marginHorizontal: 10,
                  height:"70px",
                }}
              >
                <Image
                  source={item}
                  style={{ width: "100%" }}
                  className="rounded-md h-40 object-cover"
                />
              </View>
            )}
          />
        </View>
        <View className="flex flex-row flex-wrap justify-start mt-5">
          {data.map((item, index) => (
            <TouchableOpacity
              className="bg-white p-3 w-44 h-56 rounded-xl relative m-2" // Adjust width to control how many items fit in each row
              key={index}
            >
              <View className="flex flex-col ml-2 gap-y-1">
                <Text className="text-[20px] font-bold">{item.title}</Text>
                <Text className="text-[13px] text-gray-500">
                  {item.subtitle}
                </Text>
                {item.tip && (
                  <Text className="bg-pink-300 w-32 text-center p-2 rounded-xl px-3 text-orange-500">
                    {item.tip}
                  </Text>
                )}
              </View>
              <Image
                source={item.image}
                className="w-28 h-28 absolute bottom-0 right-0 rounded-2xl"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
