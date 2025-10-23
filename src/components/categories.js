// This component is responsible for rendering the category filter bar.
// It allows users to switch between different news categories and access personal sections.

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

/**
 * A horizontal scrolling list of categories.
 * @param {{
 *   categories: Array<Object>,
 *   activeCategory: string,
 *   handleChangeCategory: (category: string) => void
 * }} props - Component props.
 */
export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  const navigation = useNavigation();

  return (
    // We use an Animated.View to apply a "FadeInDown" animation when the component mounts.
    // This provides a smooth, professional entrance effect.
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* 
          Static "My News" category.
          This button navigates the user to the screen where they can see their own created articles.
        */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MyArticles")}
          style={styles.categoryContainer}
        >
          <View style={[styles.imageContainer, styles.myFoodButton]}>
            <Image
              source={require("../../assets/images/welcome.png")}
              style={styles.categoryImage}
            />
          </View>
          <Text style={styles.categoryText}>My News</Text>
        </TouchableOpacity>

        {/* 
          Static "My Favorites" category.
          This button navigates the user to their list of saved favorite articles.
        */}
        <TouchableOpacity
          onPress={() => navigation.navigate("FavoriteScreen")}
          style={styles.categoryContainer}
        >
          <View style={[styles.imageContainer, styles.myFoodButton]}>
            <Image
              source={require("../../assets/images/welcome.png")}
              style={styles.categoryImage}
            />
          </View>
          <Text style={styles.categoryText}>My Favorites</Text>
        </TouchableOpacity>

        {/* 
          Dynamically rendered categories from the API.
          We map over the `categories` array passed in as a prop.
        */}
        {categories.map((cat, index) => {
          // Check if the current category is the active one.
          let isActive = cat.strCategory === activeCategory;
          // Apply a different style to the active category button.
          let activeButtonStyle = isActive
            ? styles.activeButton
            : styles.inactiveButton;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={styles.categoryContainer}
            >
              <View style={[styles.imageContainer, activeButtonStyle]}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={styles.categoryImage}
                />
              </View>
              <Text style={styles.categoryText}>{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 15,
  },
  categoryContainer: {
    alignItems: "center",
    marginRight: wp(4),
  },
  imageContainer: {
    borderRadius: 9999, // A large number to ensure a perfect circle.
    padding: 6,
  },
  activeButton: {
    backgroundColor: "#7CF5FF", // A bright color to indicate the active state.
  },
  inactiveButton: {
    backgroundColor: "rgba(0, 0, 0, 0.1)", // A subtle color for inactive items.
  },
  categoryImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: 9999,
  },
  categoryText: {
    fontSize: hp(1.6),
    color: "#52525B",
    marginTop: hp(0.5),
  },
  // Styles for "My Food" category
  myFoodButton: {
    backgroundColor: "#6439FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  myFoodText: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp(1.5),
  },
});
