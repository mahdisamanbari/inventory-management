import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { OrdersContext } from "../context/OrdersContext";

function Dashboard() {
  const {products} = useContext(ProductsContext)
  const {orders} = useContext(OrdersContext)
  const lowStockProducts = products.filter(item=>
    item.quantity <= 5
    )
  const pendingOrders = orders.filter(item=>
    item.status === "Pending"
    )  
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your store dashboard.</p>
        <h2>Total Products : {products.length}</h2>
        <h2>Low Stock Products : {lowStockProducts.length}</h2>
        <h2> Total Order : {orders.length}</h2>
        <h2>Pending Status : {pendingOrders.length}</h2>
      </div>
    );
  }
  
  export default Dashboard;