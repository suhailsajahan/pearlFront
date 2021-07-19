import React, { useState, useEffect } from "react";
import { Jumbotron, Spinner, Progress, Row } from "reactstrap";
import Header from "./Header";
import api from "../api/api";

function HomePage() {
  //For Firebase
  //   const [error, setError] = useState("")
  //   const { currentUser, logout } = useAuth()
  //   const history = useHistory()

  //   async function handleLogout() {
  //     setError("")

  //     try {
  //       await logout()
  //       history.push("/login")
  //     } catch {
  //       setError("Failed to log out")
  //     }
  //   }
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [cardLoaded, setCardLoaded] = useState(true);
  const [userLoaded, setUserLoaded] = useState(true);

  //Retrieve users & cards
  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        // console.log(response.data[0]);
        setUsers(response.data);
        setUserLoaded(false);
        setIsLoading(userLoaded||cardLoaded);
      })
      .catch(() => {
        console.log("Error");
      });
    api
      .get("/cards")
      .then((response) => {
        setCards(response.data);
        setCardLoaded(false);
        setIsLoading(userLoaded || cardLoaded);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <Header />
        <Spinner className="spinner" color="info" />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1 className="font-italic">The Pearl</h1>
              <h5>Welcome to the admin portal</h5>
            </div>
          </div>
        </div>
      </Jumbotron>
      <Row style={{ width: "60%", margin: "auto" }}>
        <Progress
          animated
          style={{
            flex: "auto",
            alignContent: "center",
            margin: "50px 50px",
            height: "30px",
          }}
          value={users.length}
        >
          {users.length} Users
        </Progress>
      </Row>
      <Row style={{ width: "60%", margin: "auto" }}>
        <Progress
          animated
          color="info"
          style={{
            flex: "auto",
            alignContent: "center",
            margin: "auto 50px",
            height: "30px",
          }}
          value={cards.length}
        >
          {cards.length} Cards
        </Progress>
      </Row>
    </div>
  );
}

export default HomePage;
