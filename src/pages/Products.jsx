import { useState } from "react";

function Products() {
    const [products ,setProducts]  = useState([
        {
          id: 1,
          name: "Laptop",
          price: 1200,
          quantity: 8,
        },
        {
          id: 2,
          name: "Mouse",
          price: 25,
          quantity: 30,
        },
        {
          id: 3,
          name: "Keyboard",
          price: 75,
          quantity: 12,
        },
      ])
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error , setError] = useState("")

    const handleDelete = (id)=>{
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
    return (
      <div>
        <h1>Products</h1>
        <p>Manage your store products here.</p>
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

         <button
          type="submit"
          
          >Add Product</button>
        </form>
        {error && <p>{error}</p>}
        {
            products.map(product=>(
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <p>Stock: {product.quantity}</p>
                    <button onClick={()=>{
                        handleDelete(product.id)
                    }}>Delete</button>
                </div>
            ))
        }
      </div>
    );
  }
  
  export default Products;