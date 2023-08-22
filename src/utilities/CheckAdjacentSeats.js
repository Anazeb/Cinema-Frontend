export default function checkAdjacentSeats(seats) {
  // Sort seats by row and seat number
  seats.sort((a, b) => a.row - b.row || a.seat - b.seat);

  // Check if seats are adjacent and in the same row
  for (let i = 1; i < seats.length; i++) {
    if (
      seats[i].row !== seats[i - 1].row ||
      seats[i].seat !== seats[i - 1].seat + 1
    ) {
      return false;
    }
  }
  return true;
}
