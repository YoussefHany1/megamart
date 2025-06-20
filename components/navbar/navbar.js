'use client'
import './navbar.css'
import Link from 'next/link'
import SideNav from './sideNav/sideNav'
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import SignIn from './signIn/signIn';
function Navbar() {
  // for a side nav
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for a modal sign in
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <nav>
        <div className="welcome d-lg-flex d-none justify-content-between align-items-center py-2">
          <div>Welcome to worldwide Megamart!</div>
          <div className="d-flex">
            <a href="#" className="text-decoration-none mx-2 d-flex align-items-center">
              <svg className='mx-1' viewBox="0 0 24 24" fill="none"><path d="M12 2c-4.4 0-8 3.6-8 8 0 5.4 7 11.5 7.3 11.8.2.1.5.2.7.2s.5-.1.7-.2C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8m0 17.7c-2.1-2-6-6.3-6-9.7 0-3.3 2.7-6 6-6s6 2.7 6 6-3.9 7.7-6 9.7M12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2" fill="#008ECC"/></svg>
              Deliver to 423651
            </a>
            <a href="#" className="line text-decoration-none px-2 d-flex align-items-center">
              <svg className='mx-1' viewBox="0 0 48 48" fill="none"><path d="M0 0h48v48H0z"/><path d="M48 0H0v48h48z"/><path d="M12 39a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm23 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="#008ECC" strokeWidth={4} strokeLinejoin="round"/><path d="M8 35H2V11h29v24H16m15 0V18h8.571L46 26.5V35h-6.189" stroke="#008ECC" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"/> </svg>
              Track
            </a>
            <a href="#" className="text-decoration-none mx-2 d-flex align-items-center">
              <svg className='mx-1' viewBox="0 0 16 16"><path fillRule="evenodd" d="m6.448.436-1.13 1.129a.5.5 0 0 1-.344.143H3.196c-.822 0-1.488.666-1.488 1.488v1.778a.5.5 0 0 1-.143.345L.435 6.448a1.49 1.49 0 0 0 0 2.104l1.13 1.13a.5.5 0 0 1 .143.344v1.778c0 .822.666 1.488 1.488 1.488h1.778a.5.5 0 0 1 .345.143l1.129 1.13a1.49 1.49 0 0 0 2.104 0l1.13-1.13a.5.5 0 0 1 .344-.143h1.778c.822 0 1.488-.666 1.488-1.488v-1.778a.5.5 0 0 1 .143-.345l1.13-1.129a1.49 1.49 0 0 0 0-2.104l-1.13-1.13a.5.5 0 0 1-.143-.344V3.196c0-.822-.666-1.488-1.488-1.488h-1.778a.5.5 0 0 1-.345-.143L8.552.435a1.49 1.49 0 0 0-2.104 0m-1.802 9.21 5-5 .708.708-5 5zM5 5v1h1V5zm4 5h1V9H9z" fill="#008ECC"/></svg>
              All Offers
            </a>
          </div>
        </div>
        <Link href="/" className="logo text-lg-start text-center text-primary mt-2 fs-1 text-decoration-none fw-bold d-sm-none d-block">MegaMart</Link>
        <div className="nav py-3 d-flex justify-content-between flex-nowrap align-items-center">
          <div className="menu d-flex">
            <span><button type="button" className="btn rounded-3 navbar-toggler p-2 me-3" variant="primary" onClick={handleShow}><svg fill="currentColor"><path d="M3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2m0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2" /></svg></button></span>
            <SideNav show={show} handleClose={handleClose} />
          </div>
          <Link href="/" className="logo text-lg-start text-center fs-2 ps-3 pe-5 text-decoration-none fw-bold d-sm-block d-none">MegaMart</Link>
          <div className="search rounded-3 d-flex w-100 flex-nowrap mx-0 mx-lg-auto ">
            <button className="border-0 ms-lg-4 ms-3 bg-transparent"><svg viewBox="0 0 16 16"><path fill="currentColor" d="m15.7 14.3-4.2-4.2c-.2-.2-.5-.3-.8-.3.8-1 1.3-2.4 1.3-3.8 0-3.3-2.7-6-6-6S0 2.7 0 6s2.7 6 6 6c1.4 0 2.8-.5 3.8-1.4 0 .3 0 .6.3.8l4.2 4.2c.2.2.5.3.7.3s.5-.1.7-.3c.4-.3.4-.9 0-1.3M6 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5"/></svg></button>
            <input type="text" className="border-0 rounded-3 py-3 ms-lg-4 ms-2 w-75" placeholder="What are you locking for?" />
          </div>
          <div className="sign align-items-center d-none d-lg-flex ms-5">
            <a className="open d-flex fw-bold pe-3 text-decoration-none" onClick={handleOpenModal}>
              <svg className='me-2' fill="currentColor"><path d="M15.71 12.71a6 6 0 1 0-7.42 0 10 10 0 0 0-6.22 8.18 1 1 0 0 0 2 .22 8 8 0 0 1 15.9 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1 10 10 0 0 0-6.25-8.19M12 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4" /></svg>
              Sign In/Sign Up
            </a>
            <SignIn show={showModal} handleClose={handleCloseModal} />
            <a className="cart d-flex fw-bold ps-3 text-decoration-none" href="/cart" data-bs-toggle="modal" data-bs-target="#">
              <svg fill="none" className='me-2'><path d="M5 7h13.79a2 2 0 0 1 1.99 2.199l-.6 6A2 2 0 0 1 18.19 17H8.64a2 2 0 0 1-1.962-1.608z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" /> <path d="m5 7-.81-3.243A1 1 0 0 0 3.22 3H2m6 18h2m6 0h2" stroke="#008ECC" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
              Cart
            </a>
          </div>
        </div>
        <div className="navbar navbar-expand-md btn-group-lg d-flex">
          <Nav className="collapse navbar-collapse py-3 px-3 justify-content-between m-0">
            <Nav.Item>
              <Nav.Link href="/phones" className="rounded-5 px-3 py-2 mb-3 mb-xxl-0">Mobiles & Accessories</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/computers" className="rounded-5 px-3 py-2 mb-3 mb-xxl-0">Computers & Accessories</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/wearables" className="rounded-5 px-3 py-2 mb-3 mb-xxl-0">Wearables</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/video-games" className="rounded-5 px-3 py-2 mb-3 mb-xxl-0">Video Games</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/television" className="rounded-5 px-3 py-2 mb-3 mb-xxl-0">Television & Video</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/camera" className="rounded-5 px-3 py-2 mb-3 mb-xxl-0">Camera & Photo</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/tablets" className="rounded-5 px-3 py-2 mb-3 mb-xxl-0">Tablets & Accessories</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </nav>
      
    </>
  )
}

export default Navbar
