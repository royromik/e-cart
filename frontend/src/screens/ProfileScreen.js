import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import { getUserProfile, updateUserProfile } from "../actions/userActions.js";
import {getMyOrders} from "../actions/orderActions";
import { Form, Table, Row, Col, Button } from "react-bootstrap";
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

  const listMyOrders = useSelector(state=>state.listMyOrders);
  const {loading:loadingOrders, error:errorOrders, orders} = listMyOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }else{
        if(!user.name){
          dispatch(getMyOrders());
          dispatch(getUserProfile('profile'))
        }else{
            setName(user.name);
            setEmail(user.email);
        }
    }

  }, [dispatch, history, userInfo, user ]);

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
        <Col md={3}>
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
      <Col md={9}><h1>My Orders</h1>
      {loadingOrders?<Loader/>:errorOrders?<Message variant="danger">{errorOrders}</Message>:(
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order,index)=>(
              <tr key={index+1}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid?order.paidAt.substring(0,10):<i className="fas fa-times" style={{color:'red'}}></i>}</td>
                <td>{order.isDelivered?order.deliveredAt.substring(0,10):<i className="fas fa-times" style={{color:'red'}}></i>}</td>
                <td><LinkContainer to={`/order/${order._id}`}><Button variant="light" className="btn-sm border">Details</Button></LinkContainer></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </Col>
    </Row>
  );
};

export default LoginScreen;
