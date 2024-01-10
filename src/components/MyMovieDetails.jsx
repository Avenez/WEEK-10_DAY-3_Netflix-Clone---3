import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useLocation, useParams } from "react-router-dom";

const MyMovieDetails = () => {
  const { filmId } = useParams();
  const [filmData, setFilmData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filmDataFetch = async () => {
    const apiKey = "cffdda84";

    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${filmId}`);

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
  }, [filmId]);

  return isLoading ? (
    <Spinner animation="border" variant="danger" />
  ) : (
    <Card className="w-25">
      <div className="w-100">
        <Card.Img variant="top" src={filmData.Poster} className="object-fit-cover" />
      </div>
      <Card.Body>
        <Card.Title>{filmData.Title}</Card.Title>
        <Card.Text>{filmData.Plot}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyMovieDetails;
