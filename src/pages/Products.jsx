import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useState } from "react";
import { Link } from "react-router-dom";


function Products() {
    const { products, setProducts } = useContext(ProductsContext);
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error , setError] = useState("")
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [stockFilter, setStockFilter] = useState("all");

    const handleDelete = (id)=>{
        console.log("Deleting ID:", id);
        setProducts(prev=>
            prev.filter(item => item.id !== id))
    }  
    const handleAdd = (e)=>{
        e.preventDefault();
        if(name.trim()=== ""){
            setError("Please enter product name");
             return}
        if(Number(price) <= 0 || price === ""){
            setError("Price must be greater than zero");
                return}
        if(quantity === "" || Number(quantity) < 0){
            setError("Quantity cannot be negative or empty");
                return}
       
        const newProduct = {
          id: Date.now(),
          name: name.trim(),
          price: Number(price),
          quantity: Number(quantity),

        }
        setProducts(prev=>[...prev , newProduct])
        setError("")
        setName("");
        setPrice("");
        setQuantity("");
    }
    const handleEdit = (item)=>{
        setEditingId(item.id)
        setName(item.name)
        setPrice(String(item.price));
        setQuantity(String(item.quantity));
    }
    const saveEditProduct = ()=>{
        if(name.trim()=== ""){
            setError("Please enter product name");
             return}
        if(Number(price) <= 0 || price === ""){
            setError("Price must be greater than zero");
                return}
        if(quantity === "" || Number(quantity) < 0){
            setError("Quantity cannot be negative or empty");
                return}
        setProducts(prev=>
            prev.map(item=>(
                item.id ===editingId
                ?{...item , name:name.trim() , price:Number(price) , quantity:Number(quantity) }
                :item
            ))
            )
            setEditingId(null);
            setName("");
            setPrice("");
            setQuantity("");
            setError("");
       
    }
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      const stockFilteredProducts = filteredProducts.filter(product => {
        if (stockFilter === "in-stock") {
          return product.quantity > 0;
        }
      
        if (stockFilter === "out-of-stock") {
          return product.quantity === 0;
        }
      
        return true;
      });
    return (
      <div>
        <h1>Products</h1>
        <p>Manage your store products here.</p>
        
        <input
         type="text"
         placeholder="Search products..."
         value={search}
         onChange={e=>setSearch(e.target.value)} 
         />
         <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            >
             <option value="all">All Products</option>
             <option value="in-stock">In Stock</option>
             <option value="out-of-stock">Out of Stock</option>
            </select>
        <form onSubmit={handleAdd}>
        <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
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
        {editingId 
        ?<button
        type="button"
            onClick={()=>saveEditProduct()}
        
        >Edit Product</button>
        :<button
        type="submit"
        
        >Add Product</button>
        }
         
        </form>
        {!stockFilteredProducts.length && <p> No product found</p>}
        {error && <p>{error}</p>}
        {
            stockFilteredProducts.map(product=>(
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <p>Stock: {product.quantity}</p>
                    <button onClick={()=>{
                        handleDelete(product.id)
                    }}>Delete</button>
                    <button onClick={()=>{
                        handleEdit(product)
                    }}>Edit</button>
                    <Link to={`/products/${product.id}`}>
                    View Details
                    </Link>
                </div>
            ))
        }
      </div>
    );
  }
  
  export default Products;