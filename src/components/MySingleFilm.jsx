import React from "react";
import { Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

const MySingleFilm = (props) => {
  const navigate = useNavigate();

  return (
    <Col className="containerPosition">
      <Image
        className="w-100 h-100 object-fit-cover imageHover"
        src={props.imageUrl}
        alt="film-image"
        onClick={() => {
          navigate(`/movieDetails/${props.filmId}`);
        }}
      />
      {/* <i class="bi bi-play-circle text-danger positionIcon"></i> */}
    </Col>
  );
};

export default MySingleFilm;
