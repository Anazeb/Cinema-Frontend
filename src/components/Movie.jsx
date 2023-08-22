import { Link } from 'react-router-dom';
import "../style/HomePage.css"

export default function Movie(props) {

  const { id, title, description, screenings } = props;
  const { posterImage } = description;
  const posterImageUrl = 'https://cinema-rest.nodehill.se/' + posterImage;

  return (
    <div className="movie">
      {screenings.map(screening => (
        <Link key={screening.screeningId} className="movie-link" to={{
          pathname: `/booking/${id}`,
          state: { screening: screening }
        }}>
          <h3>{title}</h3>
          <img src={posterImageUrl} alt={title} className="movie-poster" />
          <p className="time-text"> 
            Time: {new Date(screening.screeningTime).toLocaleTimeString('en-US')}
          </p>
        </Link>
      ))}
    </div>
  );
}
