import { cache } from "react";

import { getMovieDetails, IMAGE_BASE_URL } from "../../../lib/tmdb";

const getMovie = cache(async (id) => {
  return getMovieDetails(id);
});

export async function generateMetadata({ params }) {
  try{
    const { id } = await params;

    const movie = await getMovie(id);

    return {
      title:`${movie.title} | CineStream`,
      description:movie.overview || "Movie details on CineStream"
    };
  }
  catch(error){
    return {
      title:"Movie Details | CineStream",
      description:"Movie details on CineStream"
    };
  }
}

export default async function MovieDetailsPage({ params }) {
  let movie = null;
  let errorMessage = "";

  try{
    const { id } = await params;

    movie = await getMovie(id);
  }
  catch(error){
    console.log("Movie details error:", error);
    errorMessage = "Unable to load movie details. Please refresh once.";
  }

  if(errorMessage !== ""){
    return(
      <main className="page">
        <p className="error-text">{errorMessage}</p>
      </main>
    );
  }

  let posterUrl = null;

  if(movie.poster_path){
    posterUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;
  }

  let releaseYear = "N/A";

  if(movie.release_date){
    releaseYear = movie.release_date.split("-")[0];
  }

  return(
    <main className="movie-details-page">
      <div className="details-poster">
        {
          posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
            />
          ) : (
            <div className="no-poster">
              No Image
            </div>
          )
        }
      </div>

      <div className="details-content">
        <p className="details-label">Movie Details</p>

        <h1>{movie.title}</h1>

        <div className="details-meta">
          <span>{releaseYear}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>{movie.runtime ? `${movie.runtime} min` : "Runtime N/A"}</span>
        </div>

        <p className="details-overview">
          {movie.overview || "No overview available for this movie."}
        </p>
      </div>
    </main>
  );
}