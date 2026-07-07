import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Navbar from "../Navbar";

import favoritesReducer from "@/store/slices/favoritesSlice";
import filterReducer from "@/store/slices/filterSlice";

jest.mock("next/link", () => {
  return ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

function renderNavbar(initialFavorites = []) {
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

  return render(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
}

describe("Navbar", () => {
  test("renders application title", () => {
    renderNavbar();

    expect(
      screen.getByRole("heading", {
        name: /cinestream/i,
      })
    ).toBeInTheDocument();
  });

  test("renders home link", () => {
    renderNavbar();

    expect(
      screen.getByRole("link", {
        name: /home/i,
      })
    ).toBeInTheDocument();
  });

  test("renders favorites link", () => {
    renderNavbar();

    expect(
      screen.getByRole("link", {
        name: /favorites/i,
      })
    ).toBeInTheDocument();
  });

  test("shows favorite count when favorites exist", () => {
    renderNavbar([
      {
        id: 1,
        title: "Inception",
      },
    ]);

    expect(
      screen.getByRole("link", {
        name: /favorites \(1\)/i,
      })
    ).toBeInTheDocument();
  });
});