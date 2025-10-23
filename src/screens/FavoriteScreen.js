// Welcome to the FavoriteScreen! Here, users can view all the articles they've marked as favorites.

import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // We retrieve the list of favorite articles from the Redux state using `useSelector`.
  const { favoriteArticles } = useSelector((state) => state.favorites);

  // If there are no favorite articles, we display a special message.
  if (favoriteArticles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite articles yet!</Text>
        {/* A button to navigate back to the previous screen. */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Text style={styles.goBackButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If there are favorite articles, we display them in a list.
  return (
    <View style={styles.container}>
      {/* Page Title */}
      <View testID="FavoriteArticles" style={styles.header}>
        <Text style={styles.headerTitle}>My Favorite Articles</Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.goBackButton, styles.goBackButtonList]}
      >
        <Text style={styles.goBackButtonText}>Go back</Text>
      </TouchableOpacity>

      {/* List of favorite articles using FlatList for performance. */}
      <FlatList
        data={favoriteArticles}
        contentContainerStyle={styles.listContentContainer}
        keyExtractor={(item) => item.idArticle.toString()} // Unique key for each item.
        renderItem={({ item }) => (
          // Each item is a tappable card that navigates to the detail screen.
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate("ArticleDetail", { ...item })}
          >
            <Image
              source={{ uri: item.thumbnail || item.image }} // Fallback for custom articles
              style={styles.articleImage}
            />
            <Text style={styles.articleTitle}>
              {item.title.length > 20
                ? `${item.title.slice(0, 20)}...`
                : item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Styles untuk komponen ini.
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  articleImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  articleTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563",
    flex: 1, // Memastikan teks tidak keluar dari container.
  },
});
