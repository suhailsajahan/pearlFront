import React, { useRef, useState } from "react"
import { Form, Button, Alert, Input, FormGroup, Label, Col } from "reactstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()


    try {
      setMessage("");
      setError("");
      setLoading(true);
      // console.log(emailRef.current.value);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
    <Col sm="12" md={{ size: 6, offset: 3 }}>
      <div className="w-100 mt-2">
        <Link to="/">Go back</Link>
      </div>
      <h3 className="text-center mb-3">Password Reset</h3>
      {error && <Alert color="danger">{error}</Alert>}
      {message && <Alert color="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup id="email">
          <Label>Email</Label>
          <Input type="email" innerRef={emailRef} required />
        </FormGroup>
        <Button disabled={loading} className="w-100" type="submit">
          Reset Password
        </Button>
      </Form>
    </Col>
    </>
  )
}
