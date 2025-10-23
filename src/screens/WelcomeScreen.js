// Selamat datang di WelcomeScreen! Ini adalah layar pertama yang dilihat pengguna.
// Mari kita impor semua yang kita butuhkan.

// Impor komponen dasar dari React Native untuk membangun UI.
import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react"; // `useEffect` kita gunakan untuk efek samping, seperti animasi dan navigasi.

// `StatusBar` dari Expo memungkinkan kita mengubah warna teks di status bar (misalnya, ikon baterai dan jam).
import { StatusBar } from "expo-status-bar";

// Library ini sangat membantu! `hp` dan `wp` membuat UI kita responsif di berbagai ukuran layar.
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Inilah bagian ajaibnya! `react-native-reanimated` untuk animasi yang mulus.
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

// `useNavigation` adalah hook yang memberi kita akses ke fungsi navigasi untuk berpindah layar.
import { useNavigation } from "@react-navigation/native";

// Inilah komponen utama kita, `WelcomeScreen`.
export default function WelcomeScreen() {
  // Kita buat dua 'shared values' untuk animasi cincin.
  // Anggap saja ini sebagai state khusus untuk animasi yang bisa berjalan lancar.
  const ring1padding = useSharedValue(0); // Padding untuk cincin bagian dalam.
  const ring2padding = useSharedValue(0); // Padding untuk cincin bagian luar.

  // Kita panggil `useNavigation` untuk mendapatkan akses ke fungsi `navigate`.
  const navigation = useNavigation();

  // `useEffect` akan berjalan sekali saat komponen ini pertama kali muncul.
  useEffect(() => {
    // Kita reset padding ke 0 untuk memulai animasi dari awal.
    ring1padding.value = 0;
    ring2padding.value = 0;

    // Kita gunakan `setTimeout` untuk menunda animasi, menciptakan efek yang berurutan.
    // Cincin pertama akan mulai membesar setelah 100ms.
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(10))), // `withSpring` memberikan efek pegas yang alami.
      100
    );
    // Cincin kedua menyusul setelah 300ms.
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(10.5))),
      300
    );

    // Setelah animasi berjalan, kita tunggu 2.5 detik sebelum pindah ke layar utama.
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  // Di sini kita mendefinisikan tampilan komponen.
  return (
    <View style={styles.container}>
      {/* Kita atur status bar agar teksnya berwarna terang, cocok dengan background gelap. */}
      <StatusBar style="light" />

      {/* Ini adalah cincin luar yang animasinya dikontrol oleh `ring2padding`. */}
      <Animated.View style={[styles.ring, { padding: ring2padding }]}>
        {/* Dan ini cincin dalam, dikontrol oleh `ring1padding`. */}
        <Animated.View style={[styles.ring, { padding: ring1padding }]}>
          {/* Di tengah-tengah, kita tampilkan logo aplikasi. */}
          <Image
            source={{uri:'https://cdn.pixabay.com/photo/2013/07/12/17/43/newspaper-152320_1280.png'}}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      {/* Bagian untuk menampilkan judul dan subtitle aplikasi. */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>WHATS GOING ON!</Text>
        <Text style={styles.subtitle}>your latest news app</Text>
      </View>
    </View>
  );
}

// `StyleSheet.create` digunakan untuk mendefinisikan semua gaya (style) komponen kita.
// Ini lebih efisien daripada inline-style.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6439FF", // Warna latar yang cerah dan menarik.
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Warna putih semi-transparan untuk efek cincin.
    borderRadius: 9999, // `borderRadius` super besar untuk membuat lingkaran sempurna.
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain", // `contain` memastikan seluruh gambar logo terlihat tanpa terpotong.
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(2), // Beri sedikit jarak dari logo.
  },
  title: {
    fontSize: hp(5), // Ukuran font yang besar dan mudah dibaca.
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 3, // Jarak antar huruf untuk gaya visual.
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 3,
  },
});
