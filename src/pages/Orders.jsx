import { useContext, useState } from "react";
import { OrdersContext } from "../context/OrdersContext";


function Orders() {
    const {orders , setOrders} = useContext(OrdersContext) 
      const[newStatus , setNewStatus]=useState("")
      const [edit , setEdit] = useState(null)
      const [statusFilter , setStatusFilter]=useState("All")
      const filterOrders = orders.filter(
        
        order =>{
            if(statusFilter === "Delivered"){
                return order.status === "Delivered"
            }
            if(statusFilter === "Shipped"){
                return order.status === "Shipped"
            }
            if(statusFilter === "Pending"){
                return order.status === "Pending"
            }
            return true
        }
      )
      const handleStatusChange= (id,newStatus)=>{
        setOrders(prev =>
            prev.map(item =>(
                item.id === id
                ?{...item ,status:newStatus }
                :item
            ))
            )
            
      }
      const pendingCount = orders.filter(
        order => order.status === "Pending"
      ).length
      const deliveredCount = orders.filter(
        order => order.status === "Delivered"
      ).length
      const shippedCount = orders.filter(
        order => order.status === "Shipped"
      ).length
  return (
    <>
    <div>Orders</div>
    <div>
        <h1>Pending : {pendingCount}</h1>
        <h1>Delivered : {deliveredCount}</h1>
        <h1>Shipped : {shippedCount}</h1>
    </div>
    <div>
        <span>Select status</span>
        <select name="Filter" id="" value={statusFilter}
        onChange={e=>setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
        </select>
    </div>
    <div>
      <input type="text"
    value={newStatus}
    onChange={e => setNewStatus(e.target.value)} 
    />
    <button onClick={()=>{
        handleStatusChange(edit , newStatus)
        setEdit(null);
        setNewStatus("");
    }} disabled={edit === null}> Save Change</button>  
    </div>
    

    <div>
        {filterOrders.map(order =>(
            <div key={order.id}>
                <h2>{order.customer}</h2>
                <p>Order ID: {order.id}</p>
                <h3>{order.total}</h3>
                <h4>{order.status}</h4>
                <button
                onClick={()=>{
                    
                    setEdit(order.id)
                    setNewStatus(order.status)
                } }
                >Change status</button>
            </div>
        ))}
    </div>
    </>
    
  )
}

export default Orders