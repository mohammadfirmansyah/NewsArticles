// Mari kita definisikan "slice" Redux untuk mengelola artikel favorit kita.
// Anggap saja ini sebagai modul khusus untuk semua logika yang berhubungan dengan favorit.

import { createSlice } from "@reduxjs/toolkit";

// `initialState` adalah keadaan awal dari slice ini.
// Kita mulai dengan `favoriteArticles` sebagai array kosong.
const initialState = {
  favoriteArticles: [],
};

// `createSlice` dari Redux Toolkit membuat segalanya lebih mudah.
// Ia secara otomatis membuat action creators dan reducer untuk kita.
const favoritesSlice = createSlice({
  name: "favorites", // Nama untuk slice ini.
  initialState,
  // `reducers` adalah tempat kita mendefinisikan semua fungsi yang bisa mengubah state ini.
  reducers: {
    // Ini adalah reducer `toggleFavorite`. Ia akan menangani penambahan dan penghapusan artikel dari daftar favorit.
    toggleFavorite: (state, action) => {
      // `action.payload` berisi data yang kita kirim saat memanggil action ini (dalam kasus ini, objek artikel).
      const article = action.payload;
      
      // Kita cari tahu apakah artikel ini sudah ada di dalam daftar favorit.
      const existingIndex = state.favoriteArticles.findIndex(
        (item) => item.idArticle === article.idArticle
      );

      // Jika `existingIndex` lebih besar atau sama dengan 0, berarti artikel sudah ada.
      if (existingIndex >= 0) {
        // Jadi, kita hapus artikel itu dari array.
        state.favoriteArticles.splice(existingIndex, 1);
      } else {
        // Jika tidak ditemukan, berarti ini artikel baru. Kita tambahkan ke dalam array.
        state.favoriteArticles.push(article);
      }
    },
  },
});

// Kita ekspor action `toggleFavorite` agar bisa digunakan di komponen lain (seperti di ArticleDetailScreen).
export const { toggleFavorite } = favoritesSlice.actions;

// Kita juga ekspor reducer-nya agar bisa digabungkan di dalam store utama kita.
export default favoritesSlice.reducer;
