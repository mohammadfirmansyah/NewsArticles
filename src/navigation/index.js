// Let's set up the navigation system for our news application.
// This is like creating a map so the app knows how to move from one screen to another.

// First, we import all the tools we need from React Navigation.
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native"; // This is the main "wrapper" for all navigation.
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // This is the type of navigation we'll use, like a stack of cards.

// Next, we import all the "destinations" or screens we will navigate to.
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import MyArticlesScreen from "../screens/MyArticlesScreen";
import CustomNewsScreen from "../screens/CustomNewsScreen";
import NewsFormScreen from "../screens/NewsFormScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";

// We create our navigator "stack". Think of this as a deck of cards where each card is a screen.
const Stack = createNativeStackNavigator();

/**
 * The main AppNavigation component.
 * This is where we define the entire navigation structure of the app.
 * It uses a Stack Navigator, which means new screens are "pushed" on top of the stack,
 * and going back "pops" them off.
 */
function AppNavigation() {
  return (
    // All navigation must be wrapped inside a `NavigationContainer`.
    <NavigationContainer>
      {/* `Stack.Navigator` is the component that manages our stack of screens. */}
      <Stack.Navigator
        // `initialRouteName` determines which screen will be the first card in the stack (the opening screen).
        initialRouteName="Welcome"
        // `screenOptions` lets us set styles for all screens in this stack.
        // Here, we hide the default header because we might want to create custom headers later.
        screenOptions={{ headerShown: false }}
      >
        {/* Now, we register all our screens as "cards" within the stack. */}
        {/* Each `Stack.Screen` needs a `name` (as a unique ID) and a `component` (the screen to display). */}
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

// Finally, we export `AppNavigation` so it can be used in our main app file (usually App.js).
export default AppNavigation;
