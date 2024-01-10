import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const MyCommentForm = (props) => {
  const [comment, setComment] = useState({
    comment: "",
    rate: 1,
    elementId: props.filmId,
  });

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzlhYzBkOGEyMDAwMThhNDhhM2MiLCJpYXQiOjE3MDQ3MTk5MzIsImV4cCI6MTcwNTkyOTUzMn0.p4FkfXQ_psQrLx9sS5QJWWGy0uySa5OcdzIriiAw7sE",
        },
      });
      if (response.ok) {
        alert("Recensione inviata!");
        setComment({
          comment: "",
          rate: 1,
          elementId: props.filmId,
        });
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    } catch (error) {
      alert(error);
    }
  };

  const submitComment = (e) => {
    sendComment(e);
    props.setCommentPosted(true);
  };

  return (
    <>
      <Form className="" onSubmit={submitComment}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={comment.comment}
            type="text"
            placeholder="Inserisci il tuo commento..."
            maxlength="100"
            required
            onChange={(e) => {
              setComment({ ...comment, comment: e.target.value });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rate">
          <Form.Label>Voto</Form.Label>
          <Form.Control
            value={comment.rate}
            type="number"
            placeholder="1"
            min="1"
            max="5"
            onChange={(e) => {
              setComment({ ...comment, rate: e.target.value });
            }}
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Invia
        </Button>
      </Form>
    </>
  );
};

export default MyCommentForm;
