import { StyleSheet, Text, View, Button } from "react-native";

export default function Home({ navigation,route }) {
    // const {message}=route.params || {}
  return (
    <View style={styles.container}>
        <Text>{route.params?.message}</Text>
      <Button
      
        onPress={() =>
          navigation.navigate("Tabs")
        }
        title="Go to Tabs"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
