import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DisplaySeats from '../components/DisplaySeats';
import useScreenings from '../utilities/useScreenings';
import { Button } from 'react-bootstrap';
import { useStates } from '../utilities/states';

import '../style/BookingPage.css'

export default function BookingPage() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movie, setMovie] = useState(null);
  const [screentime, setScreentime] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const screenings = useScreenings();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`/api/movies/${movieId}`);
      const movieData = await response.json();
      setMovie(movieData);
    };

    fetchMovieDetails();
  }, [movieId]);

  const selectedScreening = location.state?.screening;
  const screeningId = screenings.length > 0 ? screenings[0].id : null;
  useEffect(() => {
    const fetchscreenings = async () => {
      const response = (
        await (
          await fetch(`/api/occupied_seats?screeningId=${screeningId}`)
        ).json()
      )[0];
      console.log(response)
      setScreentime(response.screeningTime);
    };

    fetchscreenings();
  }, [screeningId]);


  const handleBookNow = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
    } else {
      navigate('/ticket-selection', { state: { seatCount: selectedSeats.length, selectedSeats: selectedSeats, screening: screentime} });
    }
  };

  return (
    <div className="container">
      {movie ? (
        <>
          {selectedScreening && (
            <p>
              Time: {new Date(selectedScreening.screeningTime).toLocaleTimeString('en-US')}
            </p>
          )}
          <DisplaySeats screeningId={screeningId} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
          <div className="button-container">
            <Button variant="primary" className="book-now-button" onClick={handleBookNow}>Book Now</Button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
