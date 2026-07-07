import favoritesReducer, {
  loadFavorites,
  toggleFavorite,
} from "../favoritesSlice";

describe("favoritesSlice", () => {
  const movie = {
    id: 1,
    title: "Inception",
  };

  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
  });

  test("returns the initial state", () => {
    expect(favoritesReducer(undefined, { type: "" })).toEqual({
      favorites: [],
    });
  });

  test("loads favorites from storage", () => {
    const state = favoritesReducer(
      undefined,
      loadFavorites([movie])
    );

    expect(state.favorites).toEqual([movie]);
  });

  test("adds a movie to favorites", () => {
    const state = favoritesReducer(
      undefined,
      toggleFavorite(movie)
    );

    expect(state.favorites).toHaveLength(1);
    expect(state.favorites[0]).toEqual(movie);
  });

  test("removes a movie from favorites", () => {
    const initialState = {
      favorites: [movie],
    };

    const state = favoritesReducer(
      initialState,
      toggleFavorite(movie)
    );

    expect(state.favorites).toEqual([]);
  });
});