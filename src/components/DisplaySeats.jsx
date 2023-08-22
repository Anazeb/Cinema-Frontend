import { useEffect } from 'react';
import { useStates } from '../utilities/states';
import checkAdjacentSeats from '../utilities/checkAdjacentSeats';
import '../style/BookingPage.css'

export default function DisplayChairs({ screeningId, selectedSeats, setSelectedSeats }) {
  const s = useStates({
    screening: null,
    movie: null,
    seats: [],
  });

  useEffect(() => {
    (async () => {

      let screening = (
        await (
          await fetch(`/api/occupied_seats?screeningId=${screeningId}`)
        ).json()
      )[0];
      screening.occupiedSeats = screening.occupiedSeats.split(', ').map((x) => +x);

      s.screening = screening;

      s.movie = (
        await (await fetch(`/api/movies?title=${screening.movie}`)).json()
      )[0];
      console.log(s.movie)

      let auditoriumId = ['Stora Salongen', 'Lilla Salongen'].indexOf(s.screening.auditorium) + 1;

      let seats = await (await fetch(`/api/seats/?auditoriumId=${auditoriumId}&sort=seatNumber`)).json();

      let rows = [];
      let row;
      let latestRow;

      for (let seat of seats) {
        seat.occupied = screening.occupiedSeats.includes(seat.seatNumber);
        if (latestRow !== seat.rowNumber) {
          row = [];
          rows.push(row);
        }
        row.push(seat);
        latestRow = seat.rowNumber;
      }

      s.seats = rows;
    })();
  }, []);

  function toggleSeatSelection(seat) {
    if (seat.occupied) {
      return;
    }

    seat.selected = !seat.selected;

    if (seat.selected) {
      const newSeats = [...selectedSeats, { row: seat.rowNumber, seat: seat.seatNumber }];
      if (newSeats.length > 1 && !checkAdjacentSeats(newSeats)) {
        alert('Please select adjacent seats.');
        seat.selected = false;
      } else {
        setSelectedSeats(newSeats);
      }
    } else {
      setSelectedSeats((prevSeats) =>
        prevSeats.filter((s) => s.row !== seat.rowNumber || s.seat !== seat.seatNumber)
      );
    }
  }
  return s.seats.length === 0 ? null : (
    <div className="screening-and-seats">
      <h1>{s.screening.movie}</h1>
      <h2>
        {new Intl.DateTimeFormat('sv-SE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date(s.screening.screeningTime))}
      </h2>
      <img className="poster-screen" src={'https://cinema-rest.nodehill.se' + s.movie.description.posterImage} />
      <div className="seats">
        {s.seats.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seat) => (
              <div
                key={seat.seatNumber}
                className={(seat.selected ? 'selected' : '') + (seat.occupied ? ' occupied' : '')}
                onClick={() => toggleSeatSelection(seat)}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
