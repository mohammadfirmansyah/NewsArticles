// Let's build the component responsible for displaying a list of articles.
// This will serve as our main news gallery.

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

/**
 * The primary component for displaying a list of articles.
 * It receives an 'articles' array as a prop from HomeScreen.
 * @param {{ articles: Array<Object> }} props - The component props.
 */
export default function Articles({ articles }) {
  const navigation = useNavigation();

  // `renderItem` is a function passed to FlatList to define how each item is rendered.
  // It returns an `ArticleCard` component for each article in the data array.
  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="title">
        Latest News
      </Text>
      {/* 
        Here, we display our list of articles.
        `FlatList` is a highly efficient component for rendering long lists
        because it virtualizes the content, only rendering items currently in the viewport.
      */}
      <View testID="articlesDisplay">
        <FlatList
          data={articles}
          keyExtractor={(item) => item.idArticle} // Provides a unique key for each item.
          renderItem={renderItem}
          numColumns={2} // We set 2 columns to create a grid layout.
          columnWrapperStyle={styles.row} // Applies styling to each row of the grid.
        />
      </View>
    </View>
  );
}

/**
 * `ArticleCard` is a presentational component for a single article.
 * @param {{ item: Object, index: number, navigation: Object }} props - The component props.
 */
const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View style={styles.cardContainer}>
      {/* `TouchableOpacity` makes the entire card tappable. */}
      <TouchableOpacity
        testID="articleDisplay"
        onPress={() => navigation.navigate("ArticleDetail", { ...item })}
      >
        {/* The article's thumbnail image. */}
        <Image
          source={{ uri: item.thumbnail }}
          // We vary the height dynamically to create a more engaging, masonry-style grid.
          style={[
            styles.articleImage,
            { height: index % 3 === 0 ? hp(25) : hp(35) },
          ]}
        />
        {/* The article title. We truncate it if it's too long. */}
        <Text style={styles.articleText}>
          {item.title.length > 20
            ? item.title.slice(0, 20) + "..."
            : item.title}
        </Text>
        {/* The article description. Also truncated if it exceeds the limit. */}
        <Text style={styles.articleDescription}>
          {item.description.length > 40
            ? item.description.slice(0, 40) + "..."
            : item.description}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// And here are all the styles we need for this component.
// Using StyleSheet.create helps optimize performance.
const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#52525B",
    marginBottom: hp(1.5),
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: hp(1.5),
    paddingHorizontal: wp(1), // Adds a little space between cards.
  },
  articleImage: {
    width: "100%",
    borderRadius: 20, // Slightly rounds the corners of the image.
    backgroundColor: "rgba(0, 0, 0, 0.05)", // A placeholder color.
  },
  articleText: {
    fontSize: hp(1.7),
    fontWeight: "600",
    color: "#52525B",
    marginLeft: wp(1),
    marginTop: hp(1),
  },
  articleDescription: {
    fontSize: hp(1.3),
    color: "#6B7280",
    marginLeft: wp(1),
    marginTop: hp(0.5),
  },
  row: {
    justifyContent: "space-between", // Memastikan kolom terdistribusi dengan baik.
  },
});
