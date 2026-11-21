import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import styles from "./ProductDetails.module.css";
function ProductDetails() {

  const { id } = useParams();
  const { products } = useContext(ProductsContext);
  console.log("Products in details:", products);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found!</h2>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className={styles.detailsPage}>
      <div className={styles.pageHeader}>
        <h1>Product Details</h1>
        <p>View your product information.</p>
      </div>
  
      <div className={styles.detailsCard}>
        <h2>{product.name}</h2>
  
        <div className={styles.detailItem}>
          <span>Price</span>
          <strong>${product.price}</strong>
        </div>
  
        <div className={styles.detailItem}>
          <span>Quantity</span>
          <strong>{product.quantity}</strong>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;