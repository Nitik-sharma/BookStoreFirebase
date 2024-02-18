import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";

function BookCard(props) {
  const firebase = useFirebase();
  const [url, setURL] = useState();

  useEffect(() => {
    firebase.getImageURL(props.imageURl).then((url) => setURL(url));
  }, []);

  return (
    <Card style={{ width: "18rem", margin: "20px" }}>
      <Card.Img
        variant="top"
        style={{ width: "100%", height: "40rem" }}
        src={url}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          "The {props.name}" by {props.userName} | Price: ${props.price}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
