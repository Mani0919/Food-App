import { StyleSheet, Text, View, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import React, { useRef } from "react";

export default function Tab1() {
  const ref = useRef();
  return (
    <View style={styles.container}>
      <Button title="Submit" onPress={() => ref.current.open()} />
      <RBSheet
        ref={ref}
        height={260}
        draggable={true}
      >
        
          <View className="flex bg-black justify-center w-full">
            <Text className="text-center font-bold text-[20px] text-blue-600">Manikanta</Text>
          </View>
    
      </RBSheet>
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
