import Navbar from "../components/Navbar";
import FavoritesProvider from "../context/FavoritesContext";

import "./globals.css";

export const metadata = {
  title:"CineStream",
  description:"Movie discovery app built with Next.js"
};

export default function RootLayout({ children }) {
  return(
    <html lang="en">
      <body>
        <FavoritesProvider>
          <Navbar />
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}