import React, { useRef, useState, useContext } from "react";
import {
  Jumbotron,
  Form,
  FormGroup,
  Label,
  CardBody,
  Card,
  CardTitle,
  Button,
  Alert,
  Input,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import api from "../api/api";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  // const checkRef = useRef();
  // const {login} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { getLoggedIn, setCurrentUser } = useContext(AuthContext);
  const history = useHistory();
  // const [profile, setProfile] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const loginData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      setError("");
      setLoading(true);
      // await login(emailRef.current.value, passwordRef.current.value)
      await api.post("/admins/login/", loginData);
      await getLoggedIn();
      setCurrentUser(emailRef.current.value);
      history.push("/home");
    } catch {
      setError("Failed to Login");
    }

    setLoading(false);
  }

  // async function handleSubmit(e){
  //     e.preventDefault();
  //     if(profile.emailId===emailRef.current.value && profile.password===passwordRef.current.value)
  //     // <Redirect to="/home" />
  //         history.push("/home")
  //     else{
  //         setError("Incorrect email and/or password")
  //     }
  // }

  //Retrieve Auth Details
  // const retrieveAuth = async () => {
  //     const response = await api.get('/profile');
  //     return response.data;
  // }
  // useEffect(() => {
  //     const getAllProfiles = async () => {
  //         const allProfiles = await retrieveAuth();
  //         if(allProfiles) setProfile(allProfiles);
  //     };

  //     getAllProfiles();
  // }, []);

  return (
    <div className>
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1 className="font-italic">The Pearl</h1>
              <h5>Welcome to the Login page</h5>
            </div>
          </div>
        </div>
      </Jumbotron>
      <Card className="col-10 col-sm-6 m-auto">
        <CardBody>
          <CardTitle tag="h5">Login</CardTitle>
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email  "
                innerRef={emailRef}
                required
              />
              {/* innerRef={ (input) => this.username = input } */}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                innerRef={passwordRef}
                required
              />
              {/* innerRef={ (input) => this.password = input } */}
            </FormGroup>
            <FormGroup>
              <Button
                disabled={loading}
                type="submit"
                className="mt-2 primary btn-block"
              >
                Login
              </Button>
            </FormGroup>
          </Form>
          {/* <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
