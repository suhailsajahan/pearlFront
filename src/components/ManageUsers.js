import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalHeader,
  FormGroup,
  Label,
  Form,
  ModalBody,
  Spinner,
} from "reactstrap";
// import {Link} from 'react-router-dom';
import Header from "./Header";
import api from "../api/api";
import ReactPaginate from "react-paginate";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, set_isModalOpen] = useState(false);
  const [isDeleteModalOpen, set_isDeleteModalOpen] = useState(false);
  const [tempUser, setTempUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [deleteUserId, setDeleteUserId] = useState();

  const usersPerPage = 7;
  const usersVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(searchedUsers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //Edit the user
  const editUser = async (user) => {
    const response = await api.put(`/users`, user);
    const { id } = response.data;
    setUsers(
      users.map((user) => {
        return user.id === id ? { ...response.data } : user;
      })
    );
  };

  const updateName = (e) => {
    setTempUser({ ...tempUser, name: e.target.value });
    // setName(e.target.value);
  };

  const updateEmail = (e) => {
    setTempUser({ ...tempUser, email: e.target.value });
    // setEmail(e.target.value);
  };

  const updateDescription = (e) => {
    setTempUser({ ...tempUser, description: e.target.value });
    // setDescription(e.target.value);
  };

  // Submit
  const onSubmit = (e) => {
    // e.preventDefault();

    if (!tempUser.name || !tempUser.description || !tempUser.email) {
      alert("Please fill the all parts");
      return;
    }

    editUser({
      user_id: tempUser._id,
      name: tempUser.name,
      email: tempUser.email,
      description: tempUser.description,
    });

    // setName('');
    // setEmail('');
    // setDescription('');

    toggleModal();
  };

  //Delete user
  const deleteUser = (id) => {
    api.delete(`/users/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
      setSearchedUsers(searchedUsers.filter((fuser) => fuser.id !== id));
    });
    toggleDeleteModal();
    window.location.reload();
    // setSearchedUsers(searchedUsers.filter((fuser) => fuser.id !== id));
  };
  // console.log(users)

  // Search User
  useEffect(() => {
    setSearchedUsers(
      search.length !== 0
        ? users.filter((user) => {
            return (
              user.name.toLowerCase().includes(search.toLowerCase()) ||
              user.email.toLowerCase().includes(search.toLowerCase())
            );
          })
        : users
    );
  }, [search, users]);

  //Retrieve users
  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        // console.log(response.data[0]);
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  const toggleModal = () => {
    set_isModalOpen(!isModalOpen);
  };

  const toggleDeleteModal = () => {
    set_isDeleteModalOpen(!isDeleteModalOpen);
  };

  //   const usercard = searchedUsers.map((user, index) => {
  //     return (
  //       <tr key={index}>
  //         <td>{index + 1}</td>
  //         <td>{user.name}</td>
  //         <td>{user.email}</td>
  //         <td>{user.description}</td>
  //         <td>
  //           <ButtonGroup className="btn-group-sm">
  //             <Button
  //               color="primary"
  //               onClick={() => {
  //                 toggleModal();
  //                 setTempUser(user);
  //               }}
  //             >
  //               <span className="fa fa-edit" /> Edit
  //             </Button>
  //             <Button color="danger" onDoubleClick={() => deleteUser(user._id)}>
  //               <span className="fa fa-trash-o" /> Delete
  //             </Button>
  //           </ButtonGroup>
  //         </td>
  //       </tr>
  //     );
  //   });

  const displayUsers = searchedUsers
    .slice(usersVisited, usersVisited + usersPerPage)
    .map((user, index) => {
      return (
        <tr key={index}>
          {/* <Link to={`/manageusers/${user._id}`}> */}
          <td>{usersVisited + index + 1}</td>
          {/* <td>{user._id}</td> */}
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.description}</td>
          {/* </Link> */}
          <td>
            <ButtonGroup className="btn-group-sm">
              <Button
                color="primary"
                onClick={() => {
                  toggleModal();
                  setTempUser(user);
                }}
              >
                <span className="fa fa-edit" /> Edit
              </Button>
              <Button
                color="danger"
                onClick={() => {
                  toggleDeleteModal();
                  setDeleteUserId(user._id);
                }}
              >
                <span className="fa fa-trash-o" /> Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

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
      <div className="container">
        <Input
          className="w-25 mr-auto mt-2 mb-2"
          type="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              {/* <th>User ID</th> */}
              <th>Name of the user</th>
              <th>Email ID</th>
              <th>Description</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              displayUsers
            ) : (
              <tr>
                <td>No users to show</td>
              </tr>
            )}
          </tbody>
        </Table>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBtn"}
          activeClassName={"paginationActive"}
        />

        <Modal isOpen={isModalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Edit User</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label htmlFor="id">Id</Label>
                <Input type="text" value={tempUser._id} id="id" disabled />
                {/* innerRef={ (input) => this.username = input } */}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  value={tempUser.name}
                  id="name"
                  onChange={updateName}
                />
                {/* innerRef={ (input) => this.username = input } */}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  value={tempUser.email}
                  id="email"
                  onChange={updateEmail}
                />
                {/* innerRef={ (input) => this.username = input } */}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                  type="textarea"
                  value={tempUser.description}
                  id="description"
                  onChange={updateDescription}
                />
                {/* innerRef={ (input) => this.username = input } */}
              </FormGroup>
              <Button
                type="submit"
                value="submit"
                className="primary"
                onClick={onSubmit}
              >
                Update User
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        {/* Delete user Modal */}
        <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
          <ModalBody>
            Do you want to delete this user?
            <br />
            <Button
              style={{ margin: "auto" }}
              onClick={() => deleteUser(deleteUserId)}
            >
              Yes, Delete this user
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

export default ManageUsers;
