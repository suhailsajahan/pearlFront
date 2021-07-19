import React, { useRef, useState, useContext } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  FormGroup,
  Label,
  CardBody,
  Input,
} from "reactstrap";
import AuthContext from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import api from "../api/api";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(emailRef.current.value);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      const signupData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: passwordConfirmRef.current.value,
      };
      // console.log(signupData);
      setError("");
      setLoading(true);
      // await signup(emailRef.current.value, passwordRef.current.value)
      await api.post("/admins/", signupData);
      await getLoggedIn();
      history.push("/home");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card className="col-10 col-sm-6 m-auto">
        <CardBody>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
              <Label>Email</Label>
              <Input type="email" innerRef={emailRef} required />
            </FormGroup>
            <FormGroup id="password">
              <Label>Password</Label>
              <Input type="password" innerRef={passwordRef} required />
            </FormGroup>
            <FormGroup id="password-confirm">
              <Label>Password Confirmation</Label>
              <Input type="password" innerRef={passwordConfirmRef} required />
            </FormGroup>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </CardBody>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
