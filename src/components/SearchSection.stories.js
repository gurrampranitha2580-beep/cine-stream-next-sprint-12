import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import SearchSection from "./SearchSection";

import favoritesReducer from "../store/slices/favoritesSlice";
import filterReducer from "../store/slices/filterSlice";

const sampleMovies = [
  {
    id: 1,
    title: "Obsession",
    poster_path: "/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg",
    release_date: "2024-01-15",
    vote_average: 7.8,
    genre_ids: [28],
  },
  {
    id: 2,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    release_date: "2010-07-16",
    vote_average: 8.8,
    genre_ids: [28],
  },
  {
    id: 3,
    title: "Titanic",
    poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    release_date: "1997-12-19",
    vote_average: 8.2,
    genre_ids: [10749],
  },
];

function createStore() {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      filters: filterReducer,
    },
    preloadedState: {
      favorites: {
        favorites: [],
      },
      filters: {
        genre: 0,
        year: "all",
      },
    },
  });
}

function createSearchResponse(query) {
  const text = query.toLowerCase();

  return sampleMovies.filter((movie) =>
    movie.title.toLowerCase().includes(text)
  );
}

export default {
  title: "Components/SearchSection",
  component: SearchSection,
  decorators: [
  (Story) => {
    if (typeof window !== "undefined") {
      window.IntersectionObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
      };

      window.fetch = async (url) => {
        if (url.includes("/api/search")) {
          const searchUrl = new URL(url, window.location.origin);

          const query =
            searchUrl.searchParams.get("query") || "";

          return {
            ok: true,
            json: async () => ({
              results: createSearchResponse(query),
            }),
          };
        }

        return {
          ok: true,
          json: async () => ({
            results: [],
            total_pages: 1,
          }),
        };
      };
    }

    const store = createStore();

    return (
      <Provider store={store}>
        <div style={{ padding: "20px" }}>
          <Story />
        </div>
      </Provider>
    );
  },
],
};

export const Default = {
  args: {
    popularMovies: sampleMovies,
  },
};