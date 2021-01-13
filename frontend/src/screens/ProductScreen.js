import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import products from "../products";
import Rating from "../components/Rating";

const ProductScreen = ({ match }) => {
  let product = products.find((p) => p._id == match.params.id);
  return (
    <>
    <Link to="/" className="btn btn-light mb-4">Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> ${product.price}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                        <Col>
                        <strong>Price:</strong>
                        </Col>
                        <Col>
                        ${product.price}
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>
                        <strong>Status:</strong>
                        </Col>
                        <Col>
                        {product.countInStock >0 ? 'In Stock' : 'Out of Stock'}
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button className="btn btn-block" type="button" disabled={product.countInStock==0}>Add to Cart</Button>
                </ListGroup.Item>
            </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
