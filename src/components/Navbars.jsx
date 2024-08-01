import React from 'react'
import { Container, Navbar,Form, Button, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navbars() {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };
    return (
        <Navbar expand="lg" className="shadow-sm mb-5">
            <Container>
                <Navbar.Brand href="#">E-Comm</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mx-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Product</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success me-4">Search</Button>
                        <Link className='text-center' onClick={handleLogout}>
                            <i className="fa fa-user fs-4"></i>
                            <span>Logout</span>
                        </Link>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navbars
