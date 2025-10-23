// Mari kita siapkan sistem navigasi untuk aplikasi berita kita.
// Ini seperti membuat peta agar aplikasi tahu cara berpindah dari satu layar ke layar lainnya.

// Pertama, kita impor semua alat yang kita butuhkan dari React Navigation.
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Ini adalah "pembungkus" utama untuk semua navigasi.
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Ini adalah jenis navigasi yang kita gunakan, seperti tumpukan kartu.

// Selanjutnya, kita impor semua "tujuan" atau layar yang akan kita navigasikan.
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import MyArticlesScreen from "../screens/MyArticlesScreen";
import CustomNewsScreen from "../screens/CustomNewsScreen";
import NewsFormScreen from "../screens/NewsFormScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";

// Kita buat "tumpukan" navigator kita. Anggap saja ini sebagai dek kartu di mana setiap kartu adalah layar.
const Stack = createNativeStackNavigator();

// Ini adalah komponen utama yang mengatur semua logika navigasi.
function AppNavigation() {
  return (
    // Semua navigasi harus dibungkus di dalam `NavigationContainer`.
    <NavigationContainer>
      {/* `Stack.Navigator` adalah komponen yang mengelola tumpukan layar kita. */}
      <Stack.Navigator
        // `initialRouteName` menentukan layar mana yang akan menjadi kartu pertama di tumpukan (layar pembuka).
        initialRouteName="Welcome"
        // `screenOptions` memungkinkan kita mengatur gaya untuk semua layar di tumpukan ini.
        // Di sini, kita menyembunyikan header default karena kita mungkin ingin membuat header kustom nanti.
        screenOptions={{ headerShown: false }}
      >
        {/* Sekarang, kita daftarkan semua layar kita sebagai "kartu" di dalam tumpukan. */}
        {/* Setiap `Stack.Screen` membutuhkan `name` (sebagai ID unik) dan `component` (layar yang akan ditampilkan). */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
        <Stack.Screen name="MyArticles" component={MyArticlesScreen} />
        <Stack.Screen name="CustomNewsScreen" component={CustomNewsScreen} />
        <Stack.Screen name="NewsFormScreen" component={NewsFormScreen} />
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Terakhir, kita ekspor `AppNavigation` agar bisa digunakan di file utama aplikasi kita (biasanya App.js).
export default AppNavigation;
