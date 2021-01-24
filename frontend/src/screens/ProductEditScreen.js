import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  listProductDetails,
  updateProduct,
} from "../actions/productActions.js";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer.js";
import { constants } from "../constants/productConstants.js";

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errorUploading, setErrorUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: constants.PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
      dispatch(listProductDetails(productId));
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setCategory(product.category);
      }
    }
  }, [dispatch, history, product, productId, successUpdate]);

  const uploadFileHandler =async(e) =>{
    const file = e.target.files[0];
    const formData =new FormData();
    formData.append('image', file);
    setUploading(true);

    try {

        const config ={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }

      const {data} =   await axios.post('/api/upload',formData, config);

      setImage(data);
      setUploading(false);
      setErrorUploading(false);
        
    } catch (error) {
        console.error(error);
        setErrorUploading(true);
        setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        description,
        countInStock,
        image,
        category,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          error && <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {errorUploading && <Message variant="danger">Please upload an image file!!</Message>}
              {uploading && <Loader/>}
            </Form.Group>
            <Form.Group controlId="Brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="CountInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
