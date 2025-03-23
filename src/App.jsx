import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Home/Home'
import Navbar from './components/Home/NavBar/Navbar'
// import Swiper from './components/Home/Swiper/Swiper'
// import Phones from './components/Home/Phones/Phones'
// import TopCategories from './components/Home/TopCategories/TopCategories'
// import ElectronicsBrands from './components/Home/ElectronicsBrands/ElectronicsBrands'
// import Essentials from './components/Home/Essentials/Essentials'
import Footer from './components/Home/Footer/Footer'
// import SideNav from './components/Home/SideNav2/SideNav'
// import SignIn from './components/Home/SignIn/SignIn'

// import ProductPage from './components/Home/ProductPage/ProductPage'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
            <Router>
      <Routes>
        <Route path="/megamart" element={<Navbar />} />
      </Routes>
    </Router>
      <Home />
      <Footer />



    </>
  )
}

export default App
