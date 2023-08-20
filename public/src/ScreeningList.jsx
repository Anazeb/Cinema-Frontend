import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import Movie from './Movie';
import { formatLength } from '../utilities/FormatMovieLength';


function ScreeningsList({ movies }) {
  const groupScreeningsByDate = (movies) => {
    const grouped = {};

    movies.forEach(movie => {
      movie.screenings.forEach(screening => {
        const date = new Date(screening.screeningTime).toLocaleDateString('en-US');
        if (!grouped[date]) {
          grouped[date] = [];
        }
        if (!grouped[date].some(m => m.title === movie.title)) {
          grouped[date].push(movie);
        }
      });
    });

    const sortedDates = Object.keys(grouped).sort();
    return sortedDates.map(date => ({ date, movies: grouped[date] }));
  };

  const screeningsByDate = groupScreeningsByDate(movies);

  return (
    <div>
      {screeningsByDate.map(({ date, movies }) => (
        <Container fluid key={date}>
          <h2>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
          <Row>
            {movies.map(movie => (
              <Col xs={12} md={6} lg={3} key={movie.title}>
                <Movie title={movie.title} description={movie.description} screenings={movie.screenings.filter(screening => new Date(screening.screeningTime).toLocaleDateString('en-US') === date)} />
                <p>Length: {formatLength(movie.description.length)}</p>
              </Col>
            ))}
          </Row>
        </Container>
      ))}
    </div>
  );
}

export default ScreeningsList;


