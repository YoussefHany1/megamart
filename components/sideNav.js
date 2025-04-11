import { NavDropdown, Dropdown, Nav, Offcanvas } from 'react-bootstrap';
import Link from 'next/link'
import './styles/sideNav.css'
const SideNav = ({ show, handleClose }) => {
    return (
        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton className='pe-4'>
                <Offcanvas.Title><Link href="/" className='text-decoration-none text-white fw-bold fs-1'>MegaMart</Link></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Nav as="ul" className='flex-column fs-4 fw-semibold' aria-labelledby="offcanvasNavbar">
                        <Nav.Item as="li" className=''><Nav.Link href="#" className="text-white">Your Account</Nav.Link></Nav.Item>
                        <hr />
                        <Nav.Item as="li" className=''><Nav.Link href="#" className="text-white">Your Cart</Nav.Link></Nav.Item>
                        
                        <Nav.Item as="li" className="d-block d-lg-none">
                            <hr />
                            <NavDropdown title="Categories">
                                <Dropdown.Item href="#">Mobiles & Accessories</Dropdown.Item>
                                <Dropdown.Item href="#">Computers & Accessories</Dropdown.Item>
                                <Dropdown.Item href="#">Wearables</Dropdown.Item>
                                <Dropdown.Item href="#">Video Games</Dropdown.Item>
                                <Dropdown.Item href="#">Television & Video</Dropdown.Item>
                                <Dropdown.Item href="#">Camera & Photo</Dropdown.Item>
                                <Dropdown.Item href="#">Tablets & Accessories</Dropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                        <hr />
                        <Nav.Item as="li" className=''><Nav.Link href="#" className="text-white">Wishlist</Nav.Link></Nav.Item>
                        <hr />
                        <Nav.Item as="li" className=''><Nav.Link href="#" className="text-white">Orders</Nav.Link></Nav.Item>
                        <hr />
                        <Nav.Item as="li" className=''><Nav.Link href="#" className="text-white">Payments</Nav.Link></Nav.Item>
                        <hr />
                        <Nav.Item as="li" className=''><Nav.Link href="#" className="text-white">Help</Nav.Link></Nav.Item>
                        <hr />
                        <Nav.Item as="li" className=''><Nav.Link href="#" className="text-white">Contact Us</Nav.Link></Nav.Item>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
export default SideNav