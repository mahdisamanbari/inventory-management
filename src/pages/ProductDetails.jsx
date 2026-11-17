import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

function ProductDetails() {

  const { id } = useParams();
  const { products } = useContext(ProductsContext);
  console.log("Products in details:", products);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
}

export default ProductDetails;