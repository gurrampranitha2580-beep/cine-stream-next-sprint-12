import {
  getPopularMovies,
  getMovieDetails,
  searchMovies,
} from "../tmdb";

describe("tmdb helpers", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getPopularMovies returns movie list", async () => {
    const fakeResponse = {
      results: [{ id: 1, title: "Inception" }],
    };

    fetch.mockResolvedValue({
      ok: true,
      json: async () => fakeResponse,
    });

    const data = await getPopularMovies();

    expect(fetch).toHaveBeenCalled();
    expect(data).toEqual(fakeResponse);
  });

  test("getMovieDetails returns movie details", async () => {
    const fakeResponse = {
      id: 1,
      title: "Inception",
    };

    fetch.mockResolvedValue({
      ok: true,
      json: async () => fakeResponse,
    });

    const data = await getMovieDetails(1);

    expect(fetch).toHaveBeenCalled();
    expect(data).toEqual(fakeResponse);
  });

  test("searchMovies returns search results", async () => {
    const fakeResponse = {
      results: [{ id: 2, title: "Batman" }],
    };

    fetch.mockResolvedValue({
      ok: true,
      json: async () => fakeResponse,
    });

    const data = await searchMovies("Batman");

    expect(fetch).toHaveBeenCalled();
    expect(data).toEqual(fakeResponse);
  });
});