import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import SearchSection from "../SearchSection";

import favoritesReducer from "@/store/slices/favoritesSlice";
import filterReducer from "@/store/slices/filterSlice";

jest.mock("../MovieCard", () => {
  return function MovieCard({ movie }) {
    return <div>{movie.title}</div>;
  };
});

const sampleMovies = [
  {
    id: 1,
    title: "Inception",
    release_date: "2010-07-16",
    vote_average: 8.8,
    genre_ids: [28],
  },
  {
    id: 2,
    title: "Avengers",
    release_date: "2024-05-01",
    vote_average: 8.5,
    genre_ids: [28],
  },
  {
    id: 3,
    title: "Titanic",
    release_date: "2023-01-10",
    vote_average: 8.2,
    genre_ids: [10749],
  },
];

function renderSearchSection() {
  const store = configureStore({
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

  return render(
    <Provider store={store}>
      <SearchSection popularMovies={sampleMovies} />
    </Provider>
  );
}

describe("SearchSection", () => {beforeEach(() => {
  jest.useFakeTimers();

  global.fetch = jest.fn();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();

  jest.restoreAllMocks();
});

  test("renders search input", () => {
    renderSearchSection();

    expect(
      screen.getByPlaceholderText(/search movies/i)
    ).toBeInTheDocument();
  });

  test("updates input value when user types", async () => {
    const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTime,
    });
    global.fetch.mockResolvedValue({
        json: async () => ({
            results: [],
        }),
    });
    renderSearchSection();
    const input = screen.getByPlaceholderText(/search movies/i);
    await user.type(input, "Batman");
    expect(input).toHaveValue("Batman");
    await act(async () => {
        jest.advanceTimersByTime(500);
    });
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
    });
});

  test("renders movie title from props", () => {
    renderSearchSection();

    expect(
      screen.getByText("Inception")
    ).toBeInTheDocument();
  });
  test("shows searched movies from mocked API response", async () => {
  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  global.fetch.mockResolvedValue({
    json: async () => ({
      results: [
        {
          id: 2,
          title: "Batman Begins",
          release_date: "2005-06-15",
          vote_average: 8.2,
          genre_ids: [28],
        },
      ],
    }),
  });

  renderSearchSection();

  const input = screen.getByPlaceholderText(/search movies/i);

  await user.type(input, "Batman");

  await act(async () => {
    jest.advanceTimersByTime(500);
  });

  await waitFor(() => {
    expect(screen.getByText("Batman Begins")).toBeInTheDocument();
  });

  expect(global.fetch).toHaveBeenCalledTimes(1);

  expect(global.fetch).toHaveBeenCalledWith(
    "/api/search?query=Batman"
  );
});
});