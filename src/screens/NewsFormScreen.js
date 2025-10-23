// Selamat datang di NewsFormScreen! Ini adalah tempat pengguna bisa menjadi jurnalis dan menulis artikel mereka sendiri.

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Kita gunakan AsyncStorage untuk menyimpan artikel secara lokal di perangkat.
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function NewsFormScreen({ route, navigation }) {
  // Kita ambil parameter yang mungkin dikirim dari layar sebelumnya.
  // Ini memungkinkan kita menggunakan form ini untuk membuat artikel baru atau mengedit yang sudah ada.
  const { articleToEdit, articleIndex, onArticleEdited } = route.params || {};

  // Kita gunakan `useState` untuk mengelola input dari pengguna.
  // Jika kita sedang mengedit, state diisi dengan data artikel yang ada. Jika tidak, string kosong.
  const [title, setTitle] = useState(articleToEdit ? articleToEdit.title : "");
  const [image, setImage] = useState(articleToEdit ? articleToEdit.image : "");
  const [description, setDescription] = useState(
    articleToEdit ? articleToEdit.description : ""
  );

  // Inilah fungsi inti untuk menyimpan artikel.
  const saveArticle = async () => {
    // Pertama, kita buat objek artikel baru dari state saat ini.
    const newArticle = { title, image, description };
    try {
      // Kita coba ambil daftar artikel yang sudah ada dari AsyncStorage.
      const existingArticles = await AsyncStorage.getItem("customArticles");
      // Jika ada, kita parse dari JSON. Jika tidak, kita mulai dengan array kosong.
      const articles = existingArticles ? JSON.parse(existingArticles) : [];

      // Sekarang, kita cek apakah kita sedang mengedit atau membuat baru.
      if (articleToEdit !== undefined) {
        // Jika mengedit, kita perbarui artikel yang ada di `articleIndex`.
        articles[articleIndex] = newArticle;
        await AsyncStorage.setItem(
          "customArticles",
          JSON.stringify(articles)
        );
        // Jika ada fungsi callback `onArticleEdited`, kita panggil untuk memberitahu layar sebelumnya bahwa ada perubahan.
        if (onArticleEdited) onArticleEdited();
      } else {
        // Jika membuat baru, kita tambahkan artikel baru ke dalam array.
        articles.push(newArticle);
        await AsyncStorage.setItem(
          "customArticles",
          JSON.stringify(articles)
        );
      }
      // Setelah berhasil menyimpan, kita kembali ke layar sebelumnya.
      navigation.goBack();
    } catch (error) {
      // Jika terjadi error, kita tampilkan di console.
      console.error("Error saving the article:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input untuk judul artikel */}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      {/* Input untuk URL gambar */}
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {/* Pratinjau gambar jika URL sudah diisi */}
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      {/* Input untuk deskripsi artikel */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      {/* Tombol untuk menyimpan artikel */}
      <TouchableOpacity onPress={saveArticle} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Article</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles untuk form ini.
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#aaa",
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
