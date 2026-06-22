"use client";

import { useContext } from "react";
import Link from "next/link";

import { FavoritesContext } from "../context/FavoritesContext";

export default function Navbar() {
  
  const { favorites, loaded } = useContext(FavoritesContext);

  return(
    <nav className="navbar">

      <h1>CineStream</h1>

      <div className="nav-links">
        <Link href="/">Home</Link>

        
        <Link href="/favorites" suppressHydrationWarning>
          {loaded && favorites.length > 0
            ? `Favorites (${favorites.length})`
            : "Favorites"
          }
        </Link>
      </div>

    </nav>
  );
}