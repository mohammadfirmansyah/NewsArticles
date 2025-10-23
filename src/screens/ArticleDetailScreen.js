// Welcome to the ArticleDetailScreen! This is where we display the full details of a single article.

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
// We need hooks from Redux to manage our favorite state.
import { useDispatch, useSelector } from "react-redux";
// And the action to add/remove a favorite.
import { toggleFavorite } from "../redux/favoritesSlice";

export default function ArticleDetailScreen(props) {
  // First, we get the article data passed from the previous screen (e.g., HomeScreen).
  // React Navigation places this data in `props.route.params`.
  const article = props.route.params;

  const dispatch = useDispatch();
  // We use the `useSelector` hook to access the `favoriteArticles` array from our Redux state.
  const favoriteArticles = useSelector(
    (state) => state.favorites.favoriteArticles
  );
  // We then check if the current article is already in the favorites list.
  // The `some` method is an efficient way to check for existence.
  const isFavourite = favoriteArticles?.some(
    (favArticle) => favArticle.idArticle === article.idArticle
  );

  const navigation = useNavigation();

  // This function is called when the favorite button is pressed.
  const handleToggleFavorite = () => {
    // We 'dispatch' the `toggleFavorite` action, passing the current article as the payload.
    // Redux will then handle the logic to either add or remove it from the list.
    dispatch(toggleFavorite(article));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Article Image Section */}
      <View style={styles.imageContainer} testID="imageContainer">
        <Image
          source={{ uri: article.thumbnail }}
          style={styles.articleImage}
        />
      </View>

      {/* Back and Favorite Buttons */}
      {/* These buttons are positioned absolutely over the image for a modern UI effect. */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[
            styles.favoriteButton,
            {
              backgroundColor: "white", // A neutral background for the button.
            },
          ]}
        >
          {/* The favorite button's appearance changes based on the `isFavourite` status. */}
          <Text style={styles.heartIcon}>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Article Detail Content */}
      <View style={styles.contentContainer}>
        {/* Title and Category */}
        <View
          style={styles.articleDetailsContainer}
          testID="articleDetailsContainer"
        >
          <Text style={styles.articleTitle} testID="articleTitle">
            {article.title}
          </Text>
          <Text style={styles.articleCategory} testID="articleCategory">
            {article.category}
          </Text>
        </View>

        {/* Description */}
        <View style={styles.sectionContainer} testID="sectionContainer">
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{article.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Dan ini adalah semua style yang kita butuhkan.
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  articleImage: {
    width: wp(100),
    height: hp(50),
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(5),
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    marginLeft: wp(4),
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 50,
    marginRight: wp(4),
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  articleDetailsContainer: {
    marginBottom: hp(2),
  },
  articleTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#333",
  },
  articleCategory: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#666",
    marginTop: hp(1),
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(1),
  },
  descriptionText: {
    fontSize: hp(1.8),
    color: "#444",
    textAlign: "justify",
    lineHeight: hp(2.8),
  },
});
