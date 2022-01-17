import './App.css';

import { BrowserRouter, Routes, NavLink, Link } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { UserLogin } from './components/UserLogin';
import Products from './components/Product';
import ProductDetail from './components/ProductDetail';

function App() {
  return (

    <div className='container m-t-5'>

      <Home />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<ProductDetail />} />
          <Route exact path="/cart/" element={<Cart />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
