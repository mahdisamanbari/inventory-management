
import './App.css'
import { ProductsProvider} from "./context/ProductsContext";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import { OrdersProvider } from './context/OrdersContext';
import Sidebar from './components/Sidebar';

function App() {
 

  return (
    <div className='wrapper'>
    <div className='sidebar'>
      <Sidebar/>
    </div>
    <main className='main'>
      <ProductsProvider>
      <OrdersProvider>
        <Routes>
        <Route path='/' element={<Navigate to='/dashboard'/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
        <Route path='/inventory' element={<Inventory/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      </OrdersProvider>
      </ProductsProvider>
    </main>
      
      
      
    </div>
    
      
  )
}

export default App
