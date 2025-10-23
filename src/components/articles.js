// Mari kita bangun komponen untuk menampilkan daftar artikel.
// Ini akan menjadi galeri berita utama kita.

import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

// Ini adalah komponen utama kita untuk menampilkan daftar artikel.
// Ia menerima 'articles' sebagai prop dari HomeScreen.
export default function Articles({ articles }) {
  const navigation = useNavigation();

  // `renderItem` adalah fungsi yang akan dipanggil oleh FlatList untuk setiap artikel.
  // Ini memberitahu FlatList cara merender setiap 'kartu' artikel.
  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="title">
        Latest News
      </Text>
      {/* Di sinilah kita akan menampilkan daftar artikel kita. */}
      {/* `FlatList` sangat efisien untuk menampilkan daftar panjang. */}
      <View testID="articlesDisplay">
        <FlatList
          data={articles}
          keyExtractor={(item) => item.idArticle} // Kunci unik untuk setiap item.
          renderItem={renderItem}
          numColumns={2} // Kita atur 2 kolom untuk membuat tampilan grid.
          columnWrapperStyle={styles.row} // Menambahkan style untuk setiap baris grid.
        />
      </View>
    </View>
  );
}

// `ArticleCard` adalah komponen untuk satu kartu artikel.
const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View style={styles.cardContainer}>
      {/* `TouchableOpacity` membuat seluruh kartu dapat diklik. */}
      <TouchableOpacity
        testID="articleDisplay"
        onPress={() => navigation.navigate("ArticleDetail", { ...item })}
      >
        {/* Gambar thumbnail artikel. */}
        <Image
          source={{ uri: item.thumbnail }}
          // Tingginya kita buat dinamis agar grid terlihat lebih menarik.
          style={[
            styles.articleImage,
            { height: index % 3 === 0 ? hp(25) : hp(35) },
          ]}
        />
        {/* Judul artikel. Kita potong jika terlalu panjang. */}
        <Text style={styles.articleText}>
          {item.title.length > 20
            ? item.title.slice(0, 20) + "..."
            : item.title}
        </Text>
        {/* Deskripsi artikel. Kita juga potong jika terlalu panjang. */}
        <Text style={styles.articleDescription}>
          {item.description.length > 40
            ? item.description.slice(0, 40) + "..."
            : item.description}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Dan ini adalah semua style yang kita butuhkan untuk komponen ini.
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
    paddingHorizontal: wp(1), // Memberi sedikit ruang antar kartu.
  },
  articleImage: {
    width: "100%",
    borderRadius: 20, // Sedikit membulatkan sudut gambar.
    backgroundColor: "rgba(0, 0, 0, 0.05)",
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
