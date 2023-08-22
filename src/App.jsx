import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import TicketSelection from './pages/TicketSelection';
import Receipt from './pages/Receipt';
import Footer from './components/Footer';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    (async () => {
      const fetchedMovies = await (await fetch('/api/movies')).json();
      const fetchedScreenings = await (await fetch('/api/screenings_overview')).json();
      const fetchedCategories = await (await fetch('/api/movies_by_category')).json();
      console.log(fetchedMovies)
      const uniqueCategories = [...new Set(fetchedCategories.map(cat => cat.category))];
      setCategories(uniqueCategories);

      const combinedMovies = fetchedMovies.map(movie => {
        const screeningsForMovie = fetchedScreenings.filter(screening => screening.movie === movie.title);
        return {
          test: fetchedMovies,
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
    <Router>
      <div className="App">
        <Header categories={categories} onCategoryChange={handleCategoryChange} />
        <Routes>
          <Route path="/" element={<HomePage movies={movies} selectedCategory={selectedCategory} />} />
          <Route path="/booking/:movieId" element={<BookingPage />} />
          <Route path="/ticket-selection" element={<TicketSelection />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
