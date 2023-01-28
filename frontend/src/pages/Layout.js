import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Layout() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Kitty Cakes</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="me-auto">
                            <Nav.Link href="/about">About Us</Nav.Link>
                            <Nav.Link href="/help">Want to Help</Nav.Link>
                            <Nav.Link href="/contact">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    )
}

export default Layout;