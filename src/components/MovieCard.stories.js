import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import MovieCard from "./MovieCard";

import favoritesReducer from "../store/slices/favoritesSlice";
import filterReducer from "../store/slices/filterSlice";

const sampleMovie = {
  id: 101,
  title: "Inception",
  poster_path: "/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg",
  release_date: "2010-07-16",
  vote_average: 8.8,
};

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
  title: "Components/MovieCard",
  component: MovieCard,
  argTypes: {
  movie: {
    control: "object",
  },
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
              width: "220px",
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
    movie: sampleMovie,
    favoriteMovies: [],
  },
};

export const Favorite = {
  args: {
    movie: sampleMovie,
    favoriteMovies: [sampleMovie],
  },
};