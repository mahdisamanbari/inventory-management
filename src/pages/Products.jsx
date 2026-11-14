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

    const handleDelete = (id)=>{
        setProducts(prev=>
            prev.filter(item => item.id !== id))
    }  
    return (
      <div>
        <h1>Products</h1>
        <p>Manage your store products here.</p>
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