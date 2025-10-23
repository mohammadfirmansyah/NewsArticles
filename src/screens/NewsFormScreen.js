// Welcome to the NewsFormScreen! This is where users can become journalists and write their own articles.

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
// We use AsyncStorage to save articles locally on the device.
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function NewsFormScreen({ route, navigation }) {
  // We retrieve parameters that might have been sent from the previous screen.
  // This allows us to use this form for both creating new articles and editing existing ones.
  const { articleToEdit, articleIndex } = route.params || {};

  // We use `useState` to manage the user's input.
  // If we are editing, the state is pre-filled with the existing article's data. Otherwise, it's an empty string.
  const [title, setTitle] = useState(articleToEdit ? articleToEdit.title : "");
  const [image, setImage] = useState(articleToEdit ? articleToEdit.image : "");
  const [description, setDescription] = useState(
    articleToEdit ? articleToEdit.description : ""
  );

  /**
   * The core function for saving an article.
   * It handles both creating a new article and updating an existing one.
   */
  const saveArticle = async () => {
    // First, we create a new article object from the current state.
    // We add a unique ID for new articles, which is crucial for key extraction and state updates.
    const newArticle = {
      idArticle: articleToEdit ? articleToEdit.idArticle : Date.now().toString(),
      title,
      image,
      description,
    };

    try {
      // We try to get the list of existing articles from AsyncStorage.
      const existingArticles = await AsyncStorage.getItem("customArticles");
      // If it exists, we parse it from JSON. If not, we start with an empty array.
      const articles = existingArticles ? JSON.parse(existingArticles) : [];

      // Now, we check if we are editing or creating.
      if (articleToEdit !== undefined && articleIndex !== undefined) {
        // If editing, we update the article at the specified `articleIndex`.
        articles[articleIndex] = newArticle;
      } else {
        // If creating a new one, we add the new article to the array.
        articles.push(newArticle);
      }

      // We save the updated array back to AsyncStorage.
      await AsyncStorage.setItem("customArticles", JSON.stringify(articles));

      // After successfully saving, we navigate back to the previous screen.
      navigation.goBack();
    } catch (error) {
      // If an error occurs, we log it to the console.
      console.error("Error saving the article:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Input for the article title */}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      {/* Input for the image URL */}
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {/* Image preview if a URL has been entered */}
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Image Preview</Text>
      )}
      {/* Input for the article description */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, styles.descriptionInput]}
      />
      {/* Button to save the article */}
      <TouchableOpacity onPress={saveArticle} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Article</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles for this form.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginVertical: hp(1),
    fontSize: hp(2),
  },
  descriptionInput: {
    height: hp(20),
    textAlignVertical: "top",
  },
  image: {
    width: "100%",
    height: hp(25),
    marginVertical: hp(1),
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  imagePlaceholder: {
    height: hp(25),
    lineHeight: hp(25), // Vertically center the text
    textAlign: "center",
    color: "#aaa",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: hp(2.2),
  },
});
