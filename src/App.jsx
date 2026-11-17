
import './App.css'
import { ProductsProvider } from "./context/ProductsContext";
import { Routes, Route, Navigate , NavLink} from "react-router-dom";

import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails';

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
        
      </nav>
      <ProductsProvider>
        <Routes>
        <Route path='/' element={<Navigate to='/dashboard'/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
      </Routes>
      </ProductsProvider>
      
    </>
    
      
  )
}

export default App
