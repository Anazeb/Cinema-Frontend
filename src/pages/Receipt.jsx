import React from 'react';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import generateBookingNumber from '../utilities/gennerateBookingNumbers';

function Receipt() {
  const location = useLocation();
  console.log(location)
  const totalValue = location.state?.totalValue;
  const screening = location.state?.screening;
  const selectedSeats = location.state?.selectedSeats;
  console.log(totalValue)
  console.log(selectedSeats)

  const bookingNumber = generateBookingNumber();

  return (
    <div className="receipt-page d-flex justify-content-center align-items-center">
      <Card style={{ width: '40rem' }}>
        <Card.Header className="text-center">Receipt</Card.Header>
        <Card.Body>
          <Card.Title>Booking Number: {bookingNumber}</Card.Title>
          <Card.Text>Date and Time: {new Intl.DateTimeFormat('sv-SE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date(screening))}</Card.Text>
          <Card.Text>
            Seats:
            {selectedSeats?.map((seat, index) => (
              <span key={index}>
                {index > 0 && ', '}
                {`Row ${seat.row}, Seat ${seat.seat}`}
              </span>
            ))}
          </Card.Text>
          <Card.Text>Total Value: ${totalValue}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Receipt;
