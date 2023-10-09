import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Image App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-Navbar-nav" />
                <Navbar.Collapse id="basic-Navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/upload-image">Upload Image</Nav.Link>
                        <Nav.Link href="/">View Images</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar