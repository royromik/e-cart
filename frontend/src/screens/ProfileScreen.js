import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../actions/userActions.js";
import { Form, Row, Col, Button } from "react-bootstrap";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";

const LoginScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const { success } = userUpdateDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }else{
        if(!user.name){
            dispatch(getUserProfile('profile'))
        }else{
            setName(user.name);
            setEmail(user.email);
        }
    }

  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch Login
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      //dispatch update profile
      dispatch(updateUserProfile({
          id: user._id,
          name,email,password
      }))
    }
  };

  return (
    <Row>
        <Col md={4}>
      <h1>User Profile</h1>
      {message && <Message variant="danger">{message}</Message>}
      {success && <Message variant="success">Profile Updated Successfully</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
      </Col>
      <Col md={8}><h2>My Orders</h2></Col>
    </Row>
  );
};

export default LoginScreen;
