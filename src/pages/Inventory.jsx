import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
function Inventory() {
    const {products} = useContext(ProductsContext)
    return (
        <div>
          <h1>Inventory Management</h1>
    
          {products.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>Quantity: {product.quantity}</p>
              {product.quantity <= 5 && (
  <p>⚠️ Low Stock!</p>
)}
            </div>
          ))}
        </div>
      )
  }
  
  export default Inventory;