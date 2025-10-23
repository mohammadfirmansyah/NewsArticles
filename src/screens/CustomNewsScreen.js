// This screen displays the details of a user-created article.
// It's similar to ArticleDetailScreen but tailored for articles stored locally.

import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function CustomNewsScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  // We retrieve the 'article' object passed as a navigation parameter.
  const { article } = route.params || {};

  // Access the list of favorite articles from the Redux store.
  const favoriteArticles = useSelector(
    (state) => state.favorites.favoriteArticles
  );

  // Determine if this custom article is currently in the favorites list.
  // We use `some` because the favorites list stores complete article objects.
  const isFavourite =
    favoriteArticles?.some(
      (favArticle) => favArticle.idArticle === article?.idArticle
    ) ?? false;

  // If for some reason no article data is received, display a fallback message.
  if (!article) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Article Details Available</Text>
      </View>
    );
  }

  // This function dispatches the `toggleFavorite` action to update the Redux state.
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(article));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      testID="scrollContent"
    >
      {/* Article Image */}
      <View style={styles.imageContainer} testID="imageContainer">
        <Image source={{ uri: article.image }} style={styles.articleImage} />
      </View>

      {/* Overlay Buttons: Back and Favorite */}
      <View style={styles.topButtonsContainer} testID="topButtonsContainer">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          <Text style={styles.heartIcon}>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Article Details */}
      <View style={styles.contentContainer} testID="contentContainer">
        <Text style={styles.articleTitle}>{article.title}</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Content</Text>
          <Text style={styles.contentText}>{article.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

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
    width: wp(98),
    height: hp(50),
    borderRadius: 35,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  articleTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(2),
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(1),
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    marginLeft: wp(5),
    backgroundColor: "white",
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    marginRight: wp(5),
    backgroundColor: "white",
  },
  heartIcon: {
    fontSize: hp(3.5),
    color: "#f43f5e",
  },
  contentText: {
    fontSize: hp(1.6),
    color: "#4B5563",
  },
  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563",
    textAlign: "center",
    marginTop: hp(10),
  },
});
