import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {listProductDetails} from "../actions/productActions"
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails);

  const {loading , error ,product} = productDetails;

    useEffect(()=>{
      dispatch(listProductDetails(match.params.id))
    },[dispatch,match])
    
  return (
    <>
    <Link to="/" className="btn btn-light mb-4">Go Back</Link>
    {loading?(<Loader/>):error?(<Message variant='danger'>{error}</Message>):(  <Row>
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
    )}
    </>
  );
};

export default ProductScreen;
