import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [values, setValues] = useState({
        Email: '',
        Password: ''
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:1018/auth/login', values)
            console.log(res.data)
            localStorage.setItem('EccomTokenByPrabhat', res.data.token)
            window.location.href = '/dashboard'
        } catch (error) {
            console.log(error)
        }

    }

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
    
        const registerAccount = async (event) => {
            event.preventDefault();
            setLoading(true);
            setError(null);
    
            try {
                const { data } = await axios.post('http://localhost:1018/auth/signup', values);
                alert('Account registered successfully:', data);
            } catch (error) {
                console.error('Error registering account:', error);
                setError('Failed to register account');
            } finally {
                setLoading(false);
            }
        };

    return (
        <>
            <Container>
                <Row className='d-flex align-items-center vh-100'>
                    <div className='rounded offset-md-4 col-md-4 border p-3 shadow'>
                        <h2>Login Page</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email"><strong>Email: </strong></label>
                                <input type="email" name="Email" autoComplete='off'
                                    placeholder='Enter Email' className='form-control rounded-0'
                                    onChange={(e) => setValues({ ...values, Email: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="password"><strong>Password: </strong></label>
                                <input type="password" name="Password" autoComplete='off'
                                    placeholder='Enter password' className='form-control rounded-0 mb-2'
                                    onChange={(e) => setValues({ ...values, Password: e.target.value })} />
                            </div>

                            <div className="d-flex justify-content-between">
                                <Button variant={'success'} type='submit'>Submit</Button>
                                <Button variant="primary" onClick={handleShow}>
                                    Create an account
                                </Button>
                            </div>
                            <div>
                                <input type="checkbox" name='checkbox' id='checkbox' className='me-1 mt-2 pt-2' />
                                <label htmlFor="checkbox">You are Agree with terms & conditions</label>
                            </div>
                        </form>

                        {/* Register Modal Start*/}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create an Account</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={() => registerAccount(event)}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="Email" placeholder="Enter email" 
                                            onChange={(e) => setValues({ ...values, Email: e.target.value })}
                                        />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="Password" placeholder="Password" 
                                            onChange={(e) => setValues({ ...values, Password: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Check me out" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={handleClose}>
                                        Submit
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        {/* Register Modal End */}
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Login;
