import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  Badge,
  ButtonGroup,
  Spinner,
  Modal,
  ModalBody,
} from "reactstrap";
import api from "../api/api";
import Header from "./Header";
import AddCards from "./AddCards";
import EditCards from "./EditCards";
import ReactPaginate from "react-paginate";
import "../App.css";
// import {useHistory} from 'react-router-dom';

const ManageCards = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedCards, setSearchedCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const history = useHistory()
  const [isDeleteModalOpen, set_isDeleteModalOpen] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const cardsPerPage = 4;
  const cardsVisited = pageNumber * cardsPerPage;
  const pageCount = Math.ceil(searchedCards.length / cardsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const toggleDeleteModal = () => {
    set_isDeleteModalOpen(!isDeleteModalOpen);
  };

  //Add a card
  const addCard = async (card) => {
    api.post("/cards", card).then(() => {
      setCards([...cards, card]);
      setFilteredCards([...filteredCards, card]);
    });
  };

  //Edit the card
  // const editCard = async (card) => {
  //     const response = await api.put(`/cards`, card);
  //     const {id} = response.data;
  //     setCards(cards.map( card => {
  //         return card.id===id ? {...response.data} : card;
  //     }));
  // };

  const editCard = async (card) => {
    const { card_id } = card;
    api.put(`/cards`, card).then(() => {
      setCards(
        cards.map((scard) => {
          return scard.id === card_id ? { card } : scard;
        })
      );
      setFilteredCards(
        filteredCards.map((fcard) => {
          return fcard.id === card_id ? { card } : fcard;
        })
      );
    });
  };

  //Delete a card
  const deleteCard = (id) => {
    api.delete(`/cards/${id}`).then(() => {
      setCards(cards.filter((card) => card.id !== id));
      setFilteredCards(filteredCards.filter((fcard) => fcard.id !== id));
    });
    toggleDeleteModal();
    window.location.reload();
  };

  // Filter Cards
  const filterButton = (button = "All") => {
    button === "All"
      ? setFilteredCards(cards)
      : setFilteredCards(cards.filter((card) => card.type === button));
  };

  // Search Cards
  useEffect(() => {
    // console.log('search changed');
    setSearchedCards(
      search.length !== 0
        ? filteredCards.filter((fcard) => {
            return (
              fcard.name.toLowerCase().includes(search.toLowerCase()) ||
              fcard.description.toLowerCase().includes(search.toLowerCase())
            );
          })
        : filteredCards
    );
  }, [search, filteredCards]);

  // const searchCard = () => {
  //     search.length !== 0 ?
  //     setSearchedCards(
  //         cards.filter( card => {
  //             return card.name.toLowerCase().includes(search.toLowerCase()) || card.description.toLowerCase().includes(search.toLowerCase())
  //         })
  //     )
  //     : setSearchedCards(cards)
  // }

  //Retrieve Cards
  useEffect(() => {
    api
      .get("/cards")
      .then((response) => {
        setCards(response.data);
        setFilteredCards(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  function RenderEventCard({ card, onDelete }) {
    return (
      <div className="container">
        <Card style={{ minWidth: "280px" }}>
          <span>
            <Badge color="info">{card.price}</Badge>
          </span>
          <CardImg top src={card.image} alt="Invitation Card" />
          <CardBody>
            <CardTitle tag="h5">{card.name} </CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {card.type}{" "}
              {card.new ? (
                <span>
                  <Badge pill color="danger">
                    New
                  </Badge>
                </span>
              ) : (
                <div></div>
              )}
            </CardSubtitle>
            <CardText style={{ minHeight: "80px" }}>
              {card.description}
            </CardText>
            <EditCards onEdit={editCard} card={card} />{" "}
            <Button className="btn-sm bg-danger" block onClick={onDelete}>
              Delete
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  // const eventcard = searchedCards.map((card) => {     //Here we are mapping the filtered cards for the searching purposes
  //     return(
  //         <div key={card._id} className="col-sm-4 col-md-3">
  //                 <RenderEventCard card={card} onDelete={() => deleteCard(card._id)}/>
  //         </div>
  //     );
  // });

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
      <div className="container-fluid">
        <Row>
          <Col xs="12" sm="5" md="4 fluid" className="m-auto center">
            <AddCards onAdd={addCard} />
          </Col>
          <Col xs="12" sm="7" md="4 fluid" className="m-auto center">
            <ButtonGroup>
              <Button color="info" onClick={() => filterButton("All")}>
                All
              </Button>
              <Button
                color="info"
                onClick={() => filterButton("Conference Invitation")}
              >
                Conference
              </Button>
              <Button
                color="info"
                onClick={() => filterButton("Wedding Invitation")}
              >
                Wedding
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs="12" sm="12" md="4 fluid" className="m-auto center">
            <Input
              type="search"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <div className="row">
            {cards.length > 0
              ? searchedCards
                  .slice(cardsVisited, cardsVisited + cardsPerPage)
                  .map((card) => {
                    //Here we are mapping the filtered cards for the searching purposes
                    return (
                      <div key={card._id} className="col-sm-4 col-md-3">
                        <RenderEventCard
                          card={card}
                          onDelete={() => {
                            toggleDeleteModal();
                            setDeleteCardId(card._id);
                            // console.log(deleteCardId);
                          }}
                        />
                      </div>
                    );
                  })
              : "No cards to show"}
          </div>
        </Row>
        <Row>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBtn"}
            activeClassName={"paginationActive"}
          />
        </Row>
      </div>
      <div>
        {/* Delete user Modal */}
        <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
          <ModalBody>
            Do you want to delete this card?
            <br />
            <Button
              style={{ margin: "auto" }}
              onClick={() => deleteCard(deleteCardId)}
            >
              Yes, Delete this card
            </Button>
            <Button
              style={{ margin: "0px 10px" }}
              onClick={() => toggleDeleteModal()}
            >
              Cancel
            </Button>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default ManageCards;
