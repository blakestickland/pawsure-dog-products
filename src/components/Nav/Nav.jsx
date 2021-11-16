import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";
import SearchBar from "../SearchBar";
  import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
  } from "react-bootstrap";


const Navigation = () => {
    return (
      <nav className={styles.Nav}>
        <Navbar expand="lg" sticky="top" className={styles.Navbar}>
          <Link to="/" className={styles.Link}>
            <Navbar.Brand>Pawsure</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Products" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/products" className={styles.Link}>
                    Dog treats
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />
                  <Link to="/favorites" className={styles.Link}>
                <NavDropdown.Item>Favorite Items</NavDropdown.Item>
                  </Link>
              </NavDropdown>
              <Nav.Link>Contact Us</Nav.Link>
              <Nav.Link>About Us</Nav.Link>
            </Nav>
            {/* <Form className={styles.Nav__Form}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            <SearchBar />
          </Navbar.Collapse>
        </Navbar>
      </nav>
    );
}

export default Navigation;
