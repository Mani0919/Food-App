import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const Img = require("../../assets/img.jpg");
export default function Whatsapp({navigation}) {
  const data = [
    {
      name: "Manikanta",
      message: "Hi ra",
      data: "24-10-2024",
      notificationcount: "4",
    },
    {
      name: "Prasad",
      message: "Hi",
      data: "24-10-2024",
      notificationcount: "5",
    },
    {
      name: "Vamsi",
      message: "Hi ra",
      data: "24-10-2024",
      //   notificationcount:"4"
    },
    {
      name: "Venu",
      message: "Chepara",
      data: "23-10-2024",
      // notificationcount:"5"
    },
    {
      name: "Rakesh",
      message: "Akkada",
      data: "22-10-2024",
      // notificationcount:"5"
    },
    {
      name: "Manikanta",
      message: "Hi ra",
      data: "24-10-2024",
      notificationcount: "4",
    },
    {
      name: "Prasad",
      message: "Hi",
      data: "24-10-2024",
      notificationcount: "5",
    },
    {
      name: "Vamsi",
      message: "Hi ra",
      data: "24-10-2024",
      //   notificationcount:"4"
    },
    {
      name: "Venu",
      message: "Chepara",
      data: "23-10-2024",
      // notificationcount:"5"
    },
    {
      name: "Rakesh",
      message: "Akkada",
      data: "22-10-2024",
      // notificationcount:"5"
    },
  ];
  return (
    <>
      <SafeAreaView className="bg-[#25D366]">
        <ScrollView>
          <View className="mt-10 ">
            <View style={styles.head}>
              <View>
                <Text className="text-2xl">Whatsapp</Text>
              </View>
              <View className="flex flex-row justify-between gap-5">
                <Ionicons name="camera" size={28} onPress={()=>alert("camers is not installed")}/>
                <Ionicons name="ellipse" size={28} />
              </View>
            </View>
            <View className="bg-gray-100 mt-4 p-3">
              <TextInput
                value="Aks meta ai for aearch"
                className="boder-2 border rounded-2xl pl-5 h-[40px]"
              />
            </View>
            <Pressable className="bg-gray-100 p-2 flex flex-row justify-between">
              <View className="flex flex-row items-center gap-3">
                <Ionicons name="archive" size={28} className="bg-none" />
                <Text className="text-lg">Archieve</Text>
              </View>
              <View className="mr-3">
                <Text className="text-md">20</Text>
              </View>
            </Pressable>
            {data.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  className="bg-gray-100 p-3 flex flex-row items-center justify-between"
                  onPress={()=>navigation.navigate("About",{name:item.name})}
                >
                  <View className="flex flex-row">
                    <Image
                      source={Img}
                      resizeMode="cover"
                      className="w-14 h-14 rounded-full"
                    />
                    <View className="pl-4">
                      <Text className="text-lg">{item.name}</Text>
                      <Text className="text-md">{item.message}</Text>
                    </View>
                  </View>
                  <View className="">
                    <Text>{item.data}</Text>
                    {item.notificationcount && (
                      <Text className="font-bold bg-[#25D366] px-1 w-7 text-center py-1 rounded-full ">
                        {item.notificationcount}
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
