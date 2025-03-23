import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './home.css';
import Swiper from './Swiper/Swiper';
import Phones from './Phones/Phones';
import TopCategories from './TopCategories/TopCategories';
import ElectronicsBrands from './ElectronicsBrands/ElectronicsBrands';
import Essentials from './Essentials/Essentials';
import SideNav from './SideNav2/SideNav';
import SignIn from './SignIn/SignIn';
import ProductPage from './ProductPage/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/megamart" element={
          <>
            {/* <Navbar /> */}
            <Swiper />
            <Phones />
            <TopCategories />
            <ElectronicsBrands />
            <Essentials />
            <SideNav />
            <SignIn />
          </>
        } />
        
        {/* Product Page Route */}
        <Route path="/product/:key" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
