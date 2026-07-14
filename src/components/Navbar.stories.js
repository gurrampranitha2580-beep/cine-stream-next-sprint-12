import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Navbar from "./Navbar";

import favoritesReducer from "../store/slices/favoritesSlice";
import filterReducer from "../store/slices/filterSlice";

function createStore(favorites = []) {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      filters: filterReducer,
    },
    preloadedState: {
      favorites: {
        favorites,
      },
      filters: {
        genre: 0,
        year: "all",
      },
    },
  });
}

export default {
  title: "Components/Navbar",
  component: Navbar,
  argTypes: {
    favoriteMovies: {
        control: "object",
    },
},
  decorators: [
    (Story, context) => {
      const store = createStore(
        context.args.favoriteMovies || []
      );

      return (
        <Provider store={store}>
          <div
            style={{
              padding: "20px",
            }}
          >
            <Story />
          </div>
        </Provider>
      );
    },
  ],
};

export const Default = {
  args: {
    favoriteMovies: [],
  },
};

export const WithFavorites = {
  args: {
    favoriteMovies: [
      {
        id: 1,
        title: "Inception",
      },
      {
        id: 2,
        title: "Avengers",
      },
    ],
  },
};