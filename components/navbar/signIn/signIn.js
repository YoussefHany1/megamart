import { Modal, Button, Form, Row } from 'react-bootstrap';

const SignInModal = ({ show, handleClose }) => {
    return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Dialog className=''>
            <Modal.Body className=''>
                <h1 className="logo text-center fw-bold mb-5 mt-3 fs-1 text-primary">MegaMart</h1>
                <Form className="me-5 ms-3">
                    <Form.Group as={Row} className="email rounded-3 border-0 mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3" hidden>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email address or phone number" className='me-5' required />
                    </Form.Group>
                    <Form.Group as={Row} className="pass rounded-3 border-0 mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3" hidden>Email</Form.Label>
                        <Form.Control type="password" placeholder="Password" className='me-5' required />
                    </Form.Group>
                    <Form.Check type="checkbox" label="Remember Me" className="mb-4"/>
                </Form>
                    <div className="forget mb-2">
                        <a href="#" className="text-decoration-none text-primary fw-semibold">Forget password?</a>
                    </div>
                    <div className="signup">Don&apos;t have an account?
                        <a href="#" className="text-decoration-none text-primary fw-bold">Sign up</a>
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">Sign in</Button>
            </Modal.Footer>
        </Modal.Dialog>
    </Modal>
    );
};

export default SignInModal;
