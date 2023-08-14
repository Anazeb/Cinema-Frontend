export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedMovies = await (await fetch('/api/movies')).json();
      const fetchedScreenings = await (await fetch('/api/screenings_overview')).json();

      // Combine movies with their screenings
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

  return (
    <div className="App">
      <h1>Feature Flicks</h1>
      <ScreeningsList movies={movies} />
    </div>
  );
}
