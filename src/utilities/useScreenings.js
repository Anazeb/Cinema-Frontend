import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useScreenings = () => {
  const [screenings, setScreenings] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchScreenings = async () => {
      try {
        const response = await fetch('/api/screenings');
        const screeningsData = await response.json();
        const movieScreenings = screeningsData.filter(screening => screening.movieId === parseInt(movieId));
        setScreenings(movieScreenings);
      } catch (error) {
        console.error('Failed to fetch screenings:', error);
      }
    };

    fetchScreenings();
  }, [movieId]);

  return screenings;
};

export default useScreenings;
