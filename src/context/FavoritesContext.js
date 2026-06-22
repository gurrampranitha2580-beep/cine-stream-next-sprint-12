"use client";

import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedItems = localStorage.getItem("favorites");

      if(savedItems){
        setFavorites(JSON.parse(savedItems));
      }

      setLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(loaded){
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, loaded]);

  function addToFavorites(movie) {
    const alreadyAdded = favorites.find((item) => item.id === movie.id);

    if(alreadyAdded){
      const updatedList = favorites.filter((item) => item.id !== movie.id);
      setFavorites(updatedList);
    }
    else{
      setFavorites([...favorites, movie]);
    }
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  return(
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        isFavorite,
        loaded
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}