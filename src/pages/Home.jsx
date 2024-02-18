import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../Components/Card";
import CardGroup from "react-bootstrap/CardGroup";

function HomePage() {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getData().then((data) => {
      console.log("data-->", data.docs[0].data());
      setBooks(data.docs);
    });
  }, []);
  console.log("books-->", books);

  return (
    <div className=" mt-5">
      <CardGroup>
        {books.map((data) => (
          <BookCard key={data.id} {...data.data()} />
        ))}
      </CardGroup>
    </div>
  );
}

export default HomePage;
