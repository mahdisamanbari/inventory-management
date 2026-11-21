import { useContext, useState } from "react";
import { OrdersContext } from "../context/OrdersContext";
import styles from "./Orders.module.css";

function Orders() {
  const { orders, setOrders } = useContext(OrdersContext);
  const [newStatus, setNewStatus] = useState("");
  const [edit, setEdit] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const filterOrders = orders.filter((order) => {
    if (statusFilter === "Delivered") {
      return order.status === "Delivered";
    }
    if (statusFilter === "Shipped") {
      return order.status === "Shipped";
    }
    if (statusFilter === "Pending") {
      return order.status === "Pending";
    }
    return true;
  });
  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };
  const pendingCount = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered"
  ).length;
  const shippedCount = orders.filter(
    (order) => order.status === "Shipped"
  ).length;
  return (
    <div className={styles.ordersPage}>
      <div className={styles.pageHeader}>
        <h1>Orders Management</h1>
        <p>Track and manage customer orders.</p>
      </div>
      <div className={styles.statusSummary}>
        <div className={styles.statusCard}>
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>

        <div className={styles.statusCard}>
          <h3>Shipped</h3>
          <p>{shippedCount}</p>
        </div>

        <div className={styles.statusCard}>
          <h3>Delivered</h3>
          <p>{deliveredCount}</p>
        </div>
      </div>
      <div className={styles.ordersToolbar}>
        <label htmlFor="statusFilter">Filter by status</label>

        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      {edit !== null && (
  <div className={styles.editStatus}>
    <div>
      <label htmlFor="newStatus">New Order Status</label>

      <select
        id="newStatus"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>

    <button
      onClick={() => {
        handleStatusChange(edit, newStatus);
        setEdit(null);
        setNewStatus("");
      }}
    >
      Save Change
    </button>
  </div>
)}
      

      <div className={styles.ordersList}>
        {filterOrders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderInfo}>
              <h2>{order.customer}</h2>
              <p>Order ID: {order.id}</p>
              <h3>${order.total}</h3>
              <span
                className={`${styles.orderStatus} ${
                  order.status === "Pending"
                    ? styles.pending
                    : order.status === "Shipped"
                    ? styles.shipped
                    : styles.delivered
                }`}
              >
                {order.status}
              </span>
            </div>

            <button
              className={styles.changeButton}
              onClick={() => {
                setEdit(order.id);
                setNewStatus(order.status);
              }}
            >
              Change Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
