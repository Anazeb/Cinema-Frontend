export default function Movie(props) {
  const { title, description, screenings } = props;
  const { posterImage } = description;
  const posterImageUrl = 'https://cinema-rest.nodehill.se/' + posterImage;

  return (
    <div className="movie">
      <h3>{title}</h3>
      <img src={posterImageUrl} alt={title} className="movie-poster" />
      {screenings.map(screening => (
        <p key={screening.screeningId}>
          Time: {new Date(screening.screeningTime).toLocaleTimeString('en-US')}
        </p>
      ))}
    </div>
  );
}


