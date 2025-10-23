// Selamat datang di FavoriteScreen! Di sini, pengguna bisa melihat semua artikel yang telah mereka tandai sebagai favorit.

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

  // Kita ambil daftar artikel favorit dari state Redux menggunakan `useSelector`.
  const favoriteArticles = useSelector((state) => state.favorites);
  const favoriteArticlesList = favoriteArticles?.favoriteArticles || [];

  // Jika tidak ada artikel favorit, kita tampilkan pesan khusus.
  if (favoriteArticlesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite articles yet!</Text>
        {/* Tombol untuk kembali ke layar sebelumnya. */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "#2563EB",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            width: 100,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Jika ada artikel favorit, kita tampilkan daftarnya.
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Judul Halaman */}
      <View testID="FavoriteArticles" style={{ paddingTop: hp(5), paddingHorizontal: wp(4) }}>
        <Text
          style={{ fontSize: hp(3.8), fontWeight: "600", color: "#333" }}
        >
          My Favorite Articles
        </Text>
      </View>

      {/* Tombol untuk kembali */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#2563EB",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: 100,
          alignItems: "center",
          marginLeft: wp(4),
        }}
      >
        <Text style={{ color: "#fff" }}>Go back</Text>
      </TouchableOpacity>

      {/* Daftar artikel favorit menggunakan FlatList. */}
      <FlatList
        data={favoriteArticlesList}
        contentContainerStyle={styles.listContentContainer}
        keyExtractor={(item) => item.idArticle} // Kunci unik untuk setiap item.
        renderItem={({ item }) => (
          // Setiap item adalah kartu yang bisa diklik untuk melihat detail.
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate("ArticleDetail", item)}
          >
            <Image
              source={{ uri: item.thumbnail }}
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
