import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import '../style/TicketSelection.css';

export default function TicketSelection() {
  const location = useLocation();
  const seatCount = location.state?.seatCount;
  const screening = location.state?.screening;
  const selectedSeats = location.state?.selectedSeats;
  console.log(selectedSeats)
  console.log(location)

  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState({});
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchTicketTypes = async () => {
      const response = await fetch('/api/ticketTypes');
      const ticketData = await response.json();
      setTicketTypes(ticketData);
      const initialTickets = {};
      ticketData.forEach((ticket) => {
        initialTickets[ticket.name] = 0;
      });
      setSelectedTickets(initialTickets);
    };

    fetchTicketTypes();
  }, []);

  const selectTicket = (ticketType) => {
    setSelectedTickets((prevTickets) => {
      const newTickets = { ...prevTickets };
      if (newTickets[ticketType.name] < seatCount && totalTickets < seatCount) {
        newTickets[ticketType.name]++;
        setTotalTickets(totalTickets + 1);
        setTotalValue(totalValue + ticketType.price);
      } else {
        alert('Cannot select more tickets than the number of seats.');
      }
      return newTickets;
    });
  };

  const unselectTicket = (ticketType) => {
    setSelectedTickets((prevTickets) => {
      const newTickets = { ...prevTickets };
      if (newTickets[ticketType.name] > 0) {
        newTickets[ticketType.name]--;
        setTotalTickets(totalTickets - 1);
        setTotalValue(totalValue - ticketType.price);
      }
      return newTickets;
    });
  };

    return (
      <div className="ticket-selection">
        <div className="main-content">
          <Row>
            {ticketTypes.map((ticketType) => (
              <Col key={ticketType.id} md={4}>
                <Card className="custom-card">
                  <Card.Body>
                    <Card.Title className="custom-card-title">{ticketType.name}</Card.Title>
                    <Card.Text>Price: ${ticketType.price}</Card.Text>
                    <Card.Text>Count: {selectedTickets[ticketType.name]}</Card.Text>
                    <Button variant="primary" onClick={() => selectTicket(ticketType)}>
                      Select
                    </Button>
                    <Button variant="secondary" className="unselect-button" onClick={() => unselectTicket(ticketType)}>
                      Unselect
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="justify-content-center">
            <Card className="total-card">
              <Card.Body>
                <Row>
                  <Col xs={4} className="header">Type</Col>
                  <Col xs={4} className="header">Quantity</Col>
                  <Col xs={4} className="header">Price</Col>
                </Row>
                {ticketTypes.map((ticketType) => {
                  const quantity = selectedTickets[ticketType.name];
                  return (
                    quantity > 0 && (
                      <Row key={ticketType.id}>
                        <Col xs={4}>{ticketType.name}</Col>
                        <Col xs={4}>{quantity}</Col>
                        <Col xs={4}>${ticketType.price * quantity}</Col>
                      </Row>
                    )
                  );
                })}
                <Row className="align-items-center">
                  <Col xs={8}>Total Value:</Col>
                  <Col xs={4} className="d-flex justify-content-between align-items-center">
                    ${totalValue}
                    <Link
                      to='/receipt'
                      state={{
                        totalValue: totalValue,
                        screening: screening,
                        selectedSeats: selectedSeats
                      }}>
                      <Button variant="primary" className="ml-2">Done</Button>
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </div>
      </div>
    );
  }

