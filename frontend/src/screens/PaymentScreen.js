import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions.js";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from "../components/CheckoutSteps"


const PaymentScreen = ({ history }) => {
  const cart = useSelector(state=>state.cart)
  const {shippingAddress} = cart;

  if(!shippingAddress){
      history.push("/shipping")
  }
  
  const [paymentMethod, setPaymentMethod] = useState('PayPal');


  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder")
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="paymentMethod">
          <Form.Label as="legend">Select Method</Form.Label>
       
        <Col>
        <Form.Check type="radio"
            label="Paypal or Credit Card"
            value="PayPal"
            id='PayPal'
            name="paymentmethod"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
        </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
