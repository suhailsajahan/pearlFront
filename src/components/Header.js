import React, { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
// import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup,
//         Label, Input } from 'reactstrap';
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import api from "../api/api";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  // const { currentUser, logout } = useAuth();
  const history = useHistory();
  const { getLoggedIn, currentUser, setCurrentUser } = useContext(AuthContext);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // toggleModal(){
  //     this.setState({
  //         isModalOpen: !this.state.isModalOpen
  //     });
  // }

  const handleLogout = async () => {
    setError("");

    try {
      await api.get("/admins/logout");
      await getLoggedIn();
      setCurrentUser(null);
      history.push("/login");
    } catch {
      setError("Logout Failed");
      alert(error);
    }
  };

  function toggleDropDown() {
    setDropdownOpen(!dropdownOpen);
    // this.setState({
    //     dropdownOpen: !this.state.dropdownOpen
    // });
  }

  return (
    <>
      <Navbar dark expand="md">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />{" "}
          {/*A button shown at the small screens, which will help to find the nav bar items */}
          <NavbarBrand className="mr-5 font-italic" href="/home">
            The Pearl
          </NavbarBrand>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  <span className="fa fa-home fa-lg"></span> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/managecards">
                  <span className="fa fa-address-card fa-lg"></span> Manage
                  Cards
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/manageusers">
                  <span className="fa fa-users fa-lg"></span> Manage Users
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {/* <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-sign-in fa-lg"></span> Login
                        </Button> */}
              <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
                <DropdownToggle className="bg-transparent" outline>
                  <span className="fa fa-user fa-lg"> {currentUser}</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => history.push("/signup")}>
                    <span className="fa fa-cog fa-lg">
                      {" "}
                      Create a new account
                    </span>
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>
                    <span className="fa fa-sign-out fa-lg"> Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
