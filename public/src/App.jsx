
import { useState, useEffect } from "react";
import Movie from "./Movie";

export default function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    (async () => {
      setMovies(await (await (fetch('/api/movies'))).json());
    })();
  }, []);

  return (
    <div className="App">
      <h1>Feature Flicks</h1>
      <ScreeningsList movies={movies} />
    </div>
  );
}
