import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile, updateUserByAdmin } from "../actions/userActions.js";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer.js";
import userConstants from "../constants/userConstants";

const UserEditScreen = ({ location, history, match }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate;

  useEffect(() => {
      if(successUpdate){
          dispatch({
              type:userConstants.USER_UPDATE_BY_ADMIN_RESET
          })
          history.push("/admin/userlist")
      }else{
        if(!user.name || user._id !==userId){
            dispatch(getUserProfile(userId))
        }else{
            setName(user.name);
            setEmail(user.email)
            setIsAdmin(user.isAdmin);
        }
      }
      
  }, [user,dispatch,userId,successUpdate,history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserByAdmin({_id:userId,name, email, isAdmin}))
  };

  return (
    <>
      <Link to="admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate &&<Loader/>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? <Loader />: error?error && <Message variant="danger">{error}</Message>:(
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
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
  
            <Button type="submit" variant="primary">
              update
            </Button>
          </Form>
        ) }
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
