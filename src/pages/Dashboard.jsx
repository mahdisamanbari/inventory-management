import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { OrdersContext } from "../context/OrdersContext";
import styles from "./Dashboard.module.css";
function Dashboard() {
  const { products } = useContext(ProductsContext);
  const { orders } = useContext(OrdersContext);
  const lowStockProducts = products.filter((item) => item.quantity <= 5);
  const pendingOrders = orders.filter((item) => item.status === "Pending");
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your store overview.</p>
      </div>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Orders</h3>
          <p>{pendingOrders.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Low Stock Products</h3>
          <p>{lowStockProducts.length}</p>
        </div>
      </div>
      {/* <div className={styles.recentOrders}>
        <h2>Recent Orders</h2>
        <div className={styles.orderHeader}>
          <span>Order ID</span>
          <span>Customer</span>
          <span>Total</span>
          <span>Status</span>
        </div>

        <div className={styles.ordersList}>
          {orders.length > 0 ? (
            orders.slice(0, 5).map((order) => (
              <div key={order.id} className={styles.orderItem}>
                <span data-label="Order ID">#{order.id}</span>
                <span data-label="Customer">{order.customer}</span>
                <span data-label="Total">${order.total}</span>
                <span
                data-label="Status"
                  className={`${styles.status} ${
                    styles[order.status.toLowerCase()]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))
          ) : (
            <p className={styles.emptyMessage}>No recent orders found.</p>
          )}
        </div>
      </div> */}
      <div className={styles.recentOrders}>
  <h2>Recent Orders</h2>

  <div className={styles.tableWrapper}>
    <table className={styles.ordersTable}>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {orders.length > 0 ? (
          orders.slice(0, 5).map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    styles[order.status.toLowerCase()]
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className={styles.emptyMessage}>
              No recent orders found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
      <div className={styles.lowStockSection}>
        <h2>Low Stock Products</h2>

        <div className={styles.lowStockList}>
          {lowStockProducts.length > 0 ? (
            lowStockProducts.map((product) => (
              <div key={product.id} className={styles.lowStockItem}>
                <span>{product.name}</span>
                <span className={styles.stockWarning}>
                  {product.quantity} left
                </span>
              </div>
            ))
          ) : (
            <p className={styles.emptyMessage}>No low stock products.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
