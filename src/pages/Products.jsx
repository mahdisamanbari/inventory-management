import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Products.module.css";

function Products() {
  const { products, setProducts } = useContext(ProductsContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  const handleDelete = (id) => {
    console.log("Deleting ID:", id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
        setEditingId(null);
        setName("");
        setPrice("");
        setQuantity("");
        setError("");
      } 
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      saveEditProduct();
      return;
    }
    if (name.trim() === "") {
      setError("Please enter product name");
      return;
    }
    if (Number(price) <= 0 || price === "") {
      setError("Price must be greater than zero");
      return;
    }
    if (quantity === "" || Number(quantity) < 0) {
      setError("Quantity cannot be negative or empty");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: Number(price),
      quantity: Number(quantity),
    };
    setProducts((prev) => [...prev, newProduct]);
    setError("");
    setName("");
    setPrice("");
    setQuantity("");
  };
  const handleEdit = (item) => {
    setError("");
    setEditingId(item.id);
    setName(item.name);
    setPrice(String(item.price));
    setQuantity(String(item.quantity));
  };
  const saveEditProduct = () => {
    
    if (name.trim() === "") {
      setError("Please enter product name");
      return;
    }
    if (Number(price) <= 0 || price === "") {
      setError("Price must be greater than zero");
      return;
    }
    if (quantity === "" || Number(quantity) < 0) {
      setError("Quantity cannot be negative or empty");
      return;
    }
    setProducts((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...item,
              name: name.trim(),
              price: Number(price),
              quantity: Number(quantity),
            }
          : item
      )
    );
    setEditingId(null);
    setName("");
    setPrice("");
    setQuantity("");
    setError("");
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  const stockFilteredProducts = filteredProducts.filter((product) => {
    if (stockFilter === "in-stock") {
      return product.quantity > 0;
    }

    if (stockFilter === "out-of-stock") {
      return product.quantity === 0;
    }

    return true;
  });
  return (
    <div className={styles.productsPage}>
      <div className={styles.pageHeader}>
        <h1>Products</h1>
        <p>Manage your store products here.</p>
      </div>

      <div className={styles.productsToolbar}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="all">All Products</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
      <div className={styles.formCard}>
        <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Product quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button type="submit">
            {editingId ? "Edit Product" : "Add Product"}
          </button>
        </form>
      </div>
      {!stockFilteredProducts.length && (
        <p className={styles.emptyMessage}>No product found</p>
      )}

      {error && <p className={styles.errorMessage}>{error}</p>}
      {stockFilteredProducts.map((product) => (
        <div className={styles.productCard} key={product.id}>
          <div className={styles.productInfo}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.quantity}</p>
          </div>

          <div className={styles.productActions}>
            <button onClick={() => handleDelete(product.id)}>Delete</button>

            <button onClick={() => handleEdit(product)}>Edit</button>

            <Link to={`/products/${product.id}`}>View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
