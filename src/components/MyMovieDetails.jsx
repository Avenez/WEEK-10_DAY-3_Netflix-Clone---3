import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useLocation, useParams } from "react-router-dom";
import MySingleComment from "./MySingleComment";
import MyCommentForm from "./MyCommentForm";

const MyMovieDetails = () => {
  const { filmId } = useParams();
  const [filmData, setFilmData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentPosted, setCommentPosted] = useState(false);

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

  const CommentsDataFetch = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${filmId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzlhYzBkOGEyMDAwMThhNDhhM2MiLCJpYXQiOjE3MDQ3MTk5MzIsImV4cCI6MTcwNTkyOTUzMn0.p4FkfXQ_psQrLx9sS5QJWWGy0uySa5OcdzIriiAw7sE",
        },
      });

      if (response.ok) {
        let comments = await response.json();
        setCommentData(comments);
      } else {
        console.error(`Errore nella richiesta: ${response.status}`);

        // Puoi aggiungere ulteriori dettagli dell'errore
        try {
          const errorData = await response.json();
          console.error("Dettagli dell'errore:", errorData);
        } catch (error) {
          console.error("Impossibile ottenere dettagli dell'errore:", error.message);
        }

        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
    } catch (error) {
      console.error("Errore durante il recupero dei commenti:", error.message);
    }
  };

  useEffect(() => {
    filmDataFetch();
    CommentsDataFetch();
    if (commentPosted) {
      setCommentPosted(false);
    }
  }, [filmId, commentPosted]);

  return isLoading ? (
    <Spinner animation="border" variant="danger" />
  ) : (
    <>
      <Container>
        <Row>
          <Col lg={4}>
            <Card className="bg-dark border-0">
              <div className="w-100">
                <Card.Img variant="top" src={filmData.Poster} className="object-fit-cover" />
              </div>
              <Card.Body>
                <Card.Title className="text-danger">{filmData.Title}</Card.Title>
                <Card.Text className="text-white">{filmData.Plot}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Row className="d-flex justify-content-center">
              <Col></Col>
              <Col lg={8}>
                <h2 className="text-danger">Dai il tuo parere</h2>
                <MyCommentForm filmId={filmId} setCommentPosted={setCommentPosted} />
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col lg={4}>
            <Row>
              <h1 className="text-danger">Dicono del Film</h1>
              {commentData && commentData.length > 0 ? (
                commentData
                  .slice(0, 12)
                  .map((commentObj, index) => (
                    <MySingleComment key={`comment-id-${index}`} comment={commentObj.comment} rate={commentObj.rate} />
                  ))
              ) : (
                <h5 className="text-white">Non ci sono commenti per questo film</h5>
              )}
            </Row>
            {/* <Row className="d-flex justify-content-center mt-5">
              <Col></Col>
              <Col lg={4}>
                <MyCommentForm filmId={filmId} setCommentPosted={setCommentPosted} />
              </Col>
              <Col></Col>
            </Row> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyMovieDetails;
