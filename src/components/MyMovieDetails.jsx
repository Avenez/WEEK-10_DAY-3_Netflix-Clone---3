import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";

const MyMovieDetails = () => {
  const filmId = useLocation();
  const [filmData, setFilmData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filmDataFetch = async () => {
    const apiKey = "cffdda84";

    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${filmId.pathname}`);

      if (!response.ok) {
        throw new Error("Errore");
      }

      const filmDataObj = await response.json();
      setFilmData(filmDataObj);
      setIsLoading(false);

      console.log(filmDataObj);
    } catch (error) {
      console.error("Errore durante il recupero dei dati:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    filmDataFetch();
  }, [filmId.pathname]);

  return (
    <Card>
      <Card.Img variant="top" src={filmData.Poster} className="object-fit-cover" />
      <Card.Body>
        <Card.Title>{filmData.Title}</Card.Title>
        <Card.Text>{filmData.Plot}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyMovieDetails;
