import { Col, Row } from "react-bootstrap";

const MySingleComment = (props) => {
  return (
    <Row className="mt-2">
      <Col lg={10}>
        <h6 className="text-white">{props.comment}</h6>
      </Col>
      <Col lg={2}>
        <p className="text-white">{props.rate}⭐</p>
      </Col>
    </Row>
  );
};

export default MySingleComment;
