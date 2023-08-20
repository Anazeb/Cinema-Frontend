import { useState, useEffect } from "react";
import HomePage from './pages/HomePage';
import Header from './components/Header';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    (async () => {
      const fetchedMovies = await (await fetch('/api/movies')).json();
      const fetchedScreenings = await (await fetch('/api/screenings_overview')).json();

      const combinedMovies = fetchedMovies.map(movie => {
        const screeningsForMovie = fetchedScreenings.filter(screening => screening.movie === movie.title);
        return {
          ...movie,
          screenings: screeningsForMovie
        };
      });

      setMovies(combinedMovies);
    })();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <Header onCategoryChange={handleCategoryChange} />
      <HomePage movies={movies} selectedCategory={selectedCategory} />
    </div>
  );
}
