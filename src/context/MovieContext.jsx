import { createContext, useState, useContext } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [allMovies, setAllMovies] = useState([]);
  return (
    <MovieContext.Provider value={{ allMovies, setAllMovies }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  return useContext(MovieContext);
}
