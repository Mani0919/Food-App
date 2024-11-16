import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

import { theme } from "./theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({ dataLength, flatListIndex, flatListRef }) {
  const navigation = useNavigation();
  const buttonAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      width: isLastScreen ? withSpring(140) : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(0) : withTiming(1),
      transform: [
        { translateX: isLastScreen ? withTiming(100) : withTiming(0) },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(1) : withTiming(0),
      transform: [
        { translateX: isLastScreen ? withTiming(0) : withTiming(-100) },
      ],
    };
  });

  const handleNextScreen = () => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    }
  };
  const handleAuth = async () => {
    try {
      console.log("consolllllll")
      // await AsyncStorage.setItem("onboarding", "true");
      navigation.navigate("auth"); 
    } catch (error) {
      console.error("Error saving onboarding status: ", error);
    }
  };
  ;
  return (
    <AnimatedPressable
      onPress={handleNextScreen}
      style={[styles.container, buttonAnimationStyle]}
    >
      <Animated.Text
        style={[styles.text, textAnimationStyle]}
        onPress={handleAuth}
      >
        Get Started
      </Animated.Text>

      <Animated.View style={[styles.arrow, arrowAnimationStyle]}>
        <Feather
          name="arrow-right"
          size={30}
          color={theme.colors.textHighlightColor}
        />
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundHighlightColor,
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  text: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.textHighlightColor,
  },
});
