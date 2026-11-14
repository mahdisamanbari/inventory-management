
import './App.css'
import { Routes, Route, Navigate , NavLink} from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'

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
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard'/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/products' element={<Products/>}/>
      </Routes>
    </>
    
      
  )
}

export default App
