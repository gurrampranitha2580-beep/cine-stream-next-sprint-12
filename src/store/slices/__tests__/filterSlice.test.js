import filterReducer, {
  setGenre,
  setYear,
  resetFilters,
} from "../filterSlice";

describe("filterSlice", () => {
  test("returns the initial state", () => {
    expect(filterReducer(undefined, { type: "" })).toEqual({
      genre: 0,
      year: "all",
    });
  });

  test("updates selected genre", () => {
    const state = filterReducer(
      undefined,
      setGenre(28)
    );

    expect(state.genre).toBe(28);
    expect(state.year).toBe("all");
  });

  test("updates selected year", () => {
    const state = filterReducer(
      undefined,
      setYear("2024")
    );

    expect(state.year).toBe("2024");
    expect(state.genre).toBe(0);
  });

  test("resets all filters", () => {
    const currentState = {
      genre: 35,
      year: "2023",
    };

    const state = filterReducer(
      currentState,
      resetFilters()
    );

    expect(state).toEqual({
      genre: 0,
      year: "all",
    });
  });
});