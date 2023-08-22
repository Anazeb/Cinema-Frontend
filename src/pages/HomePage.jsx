import React from 'react';
import ScreeningsList from '../components/ScreeningList';
import "../style/HomePage.css"

function HomePage({ movies, selectedCategory }) {

  const filteredMovies = selectedCategory === 'all'
    ? movies
    : movies.filter(movie => movie.description.categories.includes(selectedCategory));

  return (
    <div>
      <ScreeningsList movies={filteredMovies} />
    </div>
  );
}

export default HomePage;
