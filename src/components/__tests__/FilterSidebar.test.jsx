import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import FilterSidebar from "../FilterSidebar";

import favoritesReducer from "@/store/slices/favoritesSlice";
import filterReducer from "@/store/slices/filterSlice";

function renderFilterSidebar() {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
      filters: filterReducer,
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <FilterSidebar />
      </Provider>
    ),
  };
}

describe("FilterSidebar", () => {
  test("renders filter heading", () => {
    renderFilterSidebar();

    expect(
      screen.getByText("Filters")
    ).toBeInTheDocument();
  });

  test("changes genre selection", async () => {
    const user = userEvent.setup();

    renderFilterSidebar();

    const genreSelect = screen.getByLabelText(/genre/i);

    await user.selectOptions(genreSelect, "28");

    expect(genreSelect).toHaveValue("28");
  });

  test("changes release year", async () => {
    const user = userEvent.setup();

    renderFilterSidebar();

    const yearSelect = screen.getByLabelText(/release year/i);

    await user.selectOptions(yearSelect, "2024");

    expect(yearSelect).toHaveValue("2024");
  });

  test("reset button restores default values", async () => {
    const user = userEvent.setup();

    renderFilterSidebar();

    const genreSelect = screen.getByLabelText(/genre/i);
    const yearSelect = screen.getByLabelText(/release year/i);

    await user.selectOptions(genreSelect, "35");
    await user.selectOptions(yearSelect, "2023");

    await user.click(
      screen.getByRole("button", {
        name: /reset filters/i,
      })
    );

    expect(genreSelect).toHaveValue("0");
    expect(yearSelect).toHaveValue("all");
  });
});