import React from 'react';

function ScreeningsList({ movies }) {
  const groupScreeningsByDate = (movies) => {
    const grouped = {};

    movies.forEach(movie => {
      movie.screenings.forEach(screening => {
        const date = new Date(screening.screeningTime).toLocaleDateString('en-US');
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push({
          title: movie.title,
          time: new Date(screening.screeningTime).toLocaleTimeString('en-US')
        });
      });
    });

    const sortedDates = Object.keys(grouped).sort();
    return sortedDates.map(date => ({ date, movies: grouped[date] }));
  };

  const screeningsByDate = groupScreeningsByDate(movies);

  return (
    <div>
      {screeningsByDate.map(({ date, movies }) => (
        <div key={date}>
          <h2>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
          {movies.map(movie => (
            <div key={movie.title + movie.time}>
              <h3>{movie.title}</h3>
              <p>Time: {movie.time}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ScreeningsList;
