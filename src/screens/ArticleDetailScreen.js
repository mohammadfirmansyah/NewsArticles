// Selamat datang di ArticleDetailScreen! Di sini kita akan menampilkan detail lengkap dari sebuah artikel.

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
import { useDispatch, useSelector } from "react-redux"; // Kita butuh hook dari Redux untuk mengelola state favorit.
import { toggleFavorite } from "../redux/favoritesSlice"; // Dan action untuk menambah/menghapus favorit.

export default function ArticleDetailScreen(props) {
  // Pertama, kita ambil data artikel yang dikirim dari layar sebelumnya (HomeScreen).
  const article = props.route.params;

  const dispatch = useDispatch();
  // Kita ambil daftar artikel favorit dari state Redux.
  const favoriteArticles = useSelector(
    (state) => state.favorites.favoriteArticles
  );
  // Kita cek apakah artikel ini sudah ada di daftar favorit.
  const isFavourite = favoriteArticles?.some(
    (favArticle) => favArticle.idArticle === article.idArticle
  );

  const navigation = useNavigation();

  // Fungsi ini akan dijalankan saat tombol favorit ditekan.
  const handleToggleFavorite = () => {
    // Kita 'dispatch' action `toggleFavorite` dengan membawa data artikel ini.
    // Redux akan menangani logika untuk menambah atau menghapusnya dari daftar.
    dispatch(toggleFavorite(article));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Bagian Gambar Artikel */}
      <View style={styles.imageContainer} testID="imageContainer">
        <Image
          source={{ uri: article.thumbnail }}
          style={styles.articleImage}
        />
      </View>

      {/* Tombol Kembali dan Favorit */}
      {/* Tombol-tombol ini kita letakkan di atas gambar dengan posisi absolut. */}
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
              backgroundColor: "white",
            },
          ]}
        >
          {/* Tampilan tombol favorit berubah tergantung status `isFavourite`. */}
          <Text>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Konten Detail Artikel */}
      <View style={styles.contentContainer}>
        {/* Judul dan Kategori */}
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

        {/* Deskripsi */}
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
