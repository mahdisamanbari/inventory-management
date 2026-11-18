
import './App.css'
import { ProductsProvider } from "./context/ProductsContext";
import { Routes, Route, Navigate , NavLink} from "react-router-dom";

import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';

function App() {
 

  return (
    <>
      <nav>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => isActive ? "active" : ""}
      >
       Dashboard
      </NavLink>
        {" | "}
        <NavLink
        to="/products"
        className={({ isActive }) => isActive ? "active" : ""}
      >
       Products
      </NavLink>
      {" | "}
      <NavLink
      to="/orders"
      className={({isActive})=>isActive ? "active" : ""}>
        Orders
      </NavLink>
        
      </nav>
      <ProductsProvider>
        <Routes>
        <Route path='/' element={<Navigate to='/dashboard'/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
        <Route path='/inventory' element={<Inventory/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      </ProductsProvider>
      
    </>
    
      
  )
}

export default App
