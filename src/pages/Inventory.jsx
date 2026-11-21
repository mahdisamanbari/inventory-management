import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import styles from "./Inventory.module.css";
function Inventory() {
  const { products } = useContext(ProductsContext);
  return (
    <div className={styles.inventoryPage}>
      <div className={styles.pageHeader}>
        <h1>Inventory Management</h1>
        <p>Monitor product quantities and stock levels.</p>
      </div>
  
      <div className={styles.inventoryGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.inventoryCard}>
        <h3 className={styles.productName}>{product.name}</h3>
      
        <p className={styles.quantity}>
          Quantity: {product.quantity}
        </p>
      
        {product.quantity <= 5 && (
          <p className={styles.lowStock}>⚠️ Low Stock!</p>
        )}
      </div>
      ))}
      </div>
    </div>
  );
  
}

export default Inventory;
