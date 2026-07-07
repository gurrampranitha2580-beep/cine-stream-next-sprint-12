import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import MovieCard from "../MovieCard";

import favoritesReducer from "@/store/slices/favoritesSlice";
import filterReducer from "@/store/slices/filterSlice";

jest.mock("../MovieCard", () => {
  function MockMovieCard({ movie }) {
    return <div>{movie.title}</div>;
  }

  MockMovieCard.displayName = "MockMovieCard";

  return MockMovieCard;
});

const sampleMovie = {
  id: 101,
  title: "Inception",
  poster_path: "/poster.jpg",
  release_date: "2010-07-16",
  vote_average: 8.8,
};


function renderMovieCard(initialFavorites = []) {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
      filters: filterReducer,
    },
    preloadedState: {
      favorites: {
        favorites: initialFavorites,
      },
      filters: {
        genre: 0,
        year: "all",
      },
    },
  });

  const renderResult = render(
    <Provider store={store}>
      <MovieCard movie={sampleMovie} />
    </Provider>
  );

  return {
    store,
    ...renderResult,
  };
}

describe("MovieCard", () => {
  test("renders movie title", () => {
    renderMovieCard();

    expect(
      screen.getByRole("heading", {
        name: /inception/i,
      })
    ).toBeInTheDocument();
  });

  test("renders release year", () => {
    renderMovieCard();

    expect(screen.getByText("2010")).toBeInTheDocument();
  });

  test("renders movie rating", () => {
    renderMovieCard();

    expect(screen.getByText("⭐ 8.8")).toBeInTheDocument();
  });

  test("renders favorite button", () => {
    renderMovieCard();

    expect(
      screen.getByRole("button", {
        name: /toggle favorite movie/i,
      })
    ).toBeInTheDocument();
  });

  test("adds movie to favorites when favorite button is clicked", async () => {
  const user = userEvent.setup();

  const { store } = renderMovieCard();

  const favoriteButton = screen.getByRole("button", {
    name: /toggle favorite movie/i,
  });

  expect(store.getState().favorites.favorites).toHaveLength(0);

  await user.click(favoriteButton);

  expect(store.getState().favorites.favorites).toHaveLength(1);
  expect(store.getState().favorites.favorites[0].id).toBe(sampleMovie.id);
});
});