// Welcome to the entry point of our application!
// This file, App.js, is the root component that gets rendered.

// We begin by importing the necessary modules.
import AppNavigation from "./src/navigation"; // This handles all our screen transitions.
import { Provider } from 'react-redux'; // This component makes the Redux store available to any nested components.
import store from "./src/redux/store"; // This is our centralized Redux store.

/**
 * The main App component.
 * 
 * This function serves as the root of our component tree.
 * We wrap our entire application with the `Provider` component from Redux.
 * This is a key step in integrating Redux, as it uses React's "context" feature
 * to pass the store down to any component that needs to access the global state.
 * 
 * @returns {JSX.Element} The rendered AppNavigation component, with the Redux store provided.
 */
export default function App() {
  return (
    // The Provider component takes the Redux store as a prop and makes it
    // available to all components in the component tree.
    <Provider store={store}>
      {/* AppNavigation is the component that defines and manages all the screens of our app. */}
      <AppNavigation />
    </Provider>
  );
}
