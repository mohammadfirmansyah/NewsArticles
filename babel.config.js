// This is the configuration file for Babel, a JavaScript compiler.
// Babel allows us to use the latest JavaScript features (like ES6+)
// and transforms them into a backward-compatible version of JavaScript
// that can be understood by older browsers or environments.

module.exports = function(api) {
  // `api.cache(true)` tells Babel to cache the result of this configuration function.
  // This means Babel won't re-execute the function every time a file is compiled,
  // leading to faster build times.
  api.cache(true);

  return {
    // Presets are a collection of Babel plugins.
    // `babel-preset-expo` includes all the necessary transformations for a React Native
    // project created with Expo.
    presets: ['babel-preset-expo'],

    // Plugins are used to add specific transformations that are not included in the presets.
    plugins: [
      // "nativewind/babel" is the plugin for NativeWind, which allows us to use
      // Tailwind CSS classes in our React Native components.
      "nativewind/babel",
      
      // 'react-native-reanimated/plugin' is a required plugin for the
      // `react-native-reanimated` library. It must be listed last.
      // This plugin enables powerful and performant animations.
      'react-native-reanimated/plugin'
    ],
  };
};
