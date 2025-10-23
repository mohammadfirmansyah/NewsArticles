// Welcome to the WelcomeScreen! This is the first screen the user sees.
// Let's import everything we need.

// Import basic components from React Native to build the UI.
import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react"; // `useEffect` is used for side effects, like animations and navigation.

// `StatusBar` from Expo allows us to change the color of the status bar text (e.g., battery icon, clock).
import { StatusBar } from "expo-status-bar";

// This library is a great help! `hp` and `wp` make our UI responsive across different screen sizes.
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Here's the magic part! `react-native-reanimated` for smooth animations.
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

// `useNavigation` is a hook that gives us access to navigation functions to switch screens.
import { useNavigation } from "@react-navigation/native";

/**
 * The main WelcomeScreen component.
 * It displays an animated splash screen and then automatically navigates to the HomeScreen.
 */
export default function WelcomeScreen() {
  // We create two 'shared values' for the ring animations.
  // Think of these as special state variables for animations that can run smoothly on the UI thread.
  const ring1padding = useSharedValue(0); // Padding for the inner ring.
  const ring2padding = useSharedValue(0); // Padding for the outer ring.

  const navigation = useNavigation();

  // `useEffect` runs once when this component first mounts.
  useEffect(() => {
    // We reset the padding to 0 to start the animation from the beginning.
    ring1padding.value = 0;
    ring2padding.value = 0;

    // We use `setTimeout` to delay the animations, creating a sequential effect.
    // The first ring will start expanding after 100ms.
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))), // `withSpring` provides a natural, bouncy effect.
      100
    );
    // The second ring follows after 300ms.
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );

    // After the animation runs, we wait 2.5 seconds before moving to the main screen.
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  // Here we define the component's layout.
  return (
    <View style={styles.container}>
      {/* We set the status bar text to light, which suits the dark background. */}
      <StatusBar style="light" />

      {/* This is the outer ring whose animation is controlled by `ring2padding`. */}
      <Animated.View style={[styles.ring, { padding: ring2padding }]}>
        {/* And this is the inner ring, controlled by `ring1padding`. */}
        <Animated.View style={[styles.ring, { padding: ring1padding }]}>
          {/* In the center, we display the application logo. */}
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2013/07/12/17/43/newspaper-152320_1280.png",
            }}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      {/* Section for displaying the app title and subtitle. */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>WHATS GOING ON!</Text>
        <Text style={styles.subtitle}>your latest news app</Text>
      </View>
    </View>
  );
}

// `StyleSheet.create` is used to define all the styles for our component.
// This is more efficient than inline styles.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6439FF", // A bright and engaging background color.
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white for the ring effect.
    borderRadius: 9999, // A very large `borderRadius` to create a perfect circle.
  },
  logo: {
    width: hp(20), // Responsive width.
    height: hp(20), // Responsive height.
    resizeMode: "contain", // `contain` ensures the entire logo is visible without being cropped.
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(2), // Beri sedikit jarak dari logo.
  },
  title: {
    fontSize: hp(5), // Ukuran font yang besar dan mudah dibaca.
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 3, // Jarak antar huruf untuk gaya visual.
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 3,
  },
});
