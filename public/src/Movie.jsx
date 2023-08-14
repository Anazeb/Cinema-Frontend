export default function Movie(props) {
  let { title, description, screenings } = props;
  let { posterImage } = description;
  posterImage = 'https://cinema-rest.nodehill.se/' + posterImage;

  return (
    <div className="movie">
      <h2>{title}</h2>
      <img src={posterImage} alt={title} />
      {screenings.map(screening => (
        <div key={screening.screeningId}>
        </div>
      ))}
    </div>
  );
}
