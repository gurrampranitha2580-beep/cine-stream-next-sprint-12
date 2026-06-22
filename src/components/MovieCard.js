"use client";

import { useContext } from "react";
import Link from "next/link";

import { FaHeart, FaRegHeart } from "react-icons/fa";

import { IMAGE_BASE_URL } from "../lib/tmdb";
import { FavoritesContext } from "../context/FavoritesContext";

export default function MovieCard({ movie }) {
  
  const { addToFavorites, isFavorite, loaded } = useContext(FavoritesContext);

  let posterUrl = null;

  if(movie.poster_path){
    posterUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;
  }

  let releaseYear = "N/A";

  if(movie.release_date){
    releaseYear = movie.release_date.split("-")[0];
  }

  
  const favoriteStatus = loaded && isFavorite(movie.id);

  function handleFavoriteClick(event) {
    event.preventDefault();
    addToFavorites(movie);
  }

  return(
    <Link href={`/movie/${movie.id}`} className="movie-card">

      <button
        className="heart-btn"
        onClick={handleFavoriteClick}
        aria-label="Toggle favorite movie"
      >
        {favoriteStatus ? <FaHeart /> : <FaRegHeart />}
      </button>

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

      <div className="movie-info">
        <h2>{movie.title}</h2>

        <div className="movie-details">
          <span>{releaseYear}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

    </Link>
  );
}