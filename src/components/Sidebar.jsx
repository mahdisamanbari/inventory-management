import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css"
import {
    MdDashboard,
    MdInventory2,
    MdWarehouse,
    MdShoppingCart
  } from "react-icons/md";
import { useState } from "react";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Store Admin</h2>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      <nav className={`${styles.sidebarNav} ${isMenuOpen ? styles.open : ""}`}>
        <NavLink
        to="/dashboard"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) => isActive ? styles.active : ""}
      >
        <MdDashboard />
       Dashboard
      </NavLink>
        
        <NavLink
        to="/products"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) => isActive ? styles.active : ""}
      >
        <MdInventory2/>
       Products
      </NavLink>
      
      <NavLink
      to="/orders"
      onClick={() => setIsMenuOpen(false)}
      className={({isActive})=>isActive ? styles.active : ""}>
        <MdShoppingCart/>
        Orders
      </NavLink>
      <NavLink
      to="/inventory"
      onClick={() => setIsMenuOpen(false)}
      className={({isActive})=>isActive ? styles.active : ""}>
        <MdWarehouse/>
        Inventory
      </NavLink>
      </nav>
    </div>
    
  )
}

export default Sidebar