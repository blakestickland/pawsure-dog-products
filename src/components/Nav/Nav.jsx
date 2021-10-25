import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";
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
        {/* <ul className={styles.Nav__ul}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul> */}
        <Navbar expand="lg" sticky="top">
          <Navbar.Brand href="#home">
              Pawsure
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link to="/">Home</Nav.Link>
              <Nav.Link href="/about-us">Contact Us</Nav.Link>
              <Nav.Link href="/contact-us">About Us</Nav.Link>
              <NavDropdown title="Products" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Dog treats</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Dog cookies
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Featured Items
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline className={styles.Nav__Form}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </nav>
    );
}

export default Navigation;
