import SearchSection from "../components/SearchSection";

import { getPopularMovies } from "../lib/tmdb";

export default async function HomePage() {
  let movies = [];
  let errorMessage = "";

  try{
    const moviesData = await getPopularMovies();
    movies = moviesData.results;
  }
  catch(error){
    errorMessage = "Unable to load movies right now.";
  }

  return(
    <main className="page">

      <h1 className="page-title">
        Popular Movies
      </h1>

      {errorMessage !== "" && (
        <p className="error-text">
          {errorMessage}
        </p>
      )}

      <SearchSection popularMovies={movies} />

    </main>
  );
}