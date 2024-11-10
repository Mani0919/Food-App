import { StyleSheet, Text, View, Button, TextInput, form } from "react-native";

export default function Data({ route, navigation }) {
  const { name } = route.params;
  return (
    <>
      <View className="">
        <Button
          onPress={() => navigation.navigate("Second")}
          title={name}
          className="w-4/12"
          styles={styles.Button}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  Button: {
    width: "20px",
  },
});
