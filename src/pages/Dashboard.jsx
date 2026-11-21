const ORDER_COLORS = ["#F59E0B", "#3B82F6", "#16A34A"];
const INVENTORY_COLORS = ["#16A34A", "#F59E0B", "#DC2626"];
import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { OrdersContext } from "../context/OrdersContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import styles from "./Dashboard.module.css";
function Dashboard() {
  const { products } = useContext(ProductsContext);
  const { orders } = useContext(OrdersContext);
  const monthlySales = orders.reduce((acc, order) => {
    const date = new Date(order.date).getMonth();
    acc[date] = (acc[date] || 0) + order.total;
    return acc;
  }, {});
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const chartData = months.map((month, index) => {
    return {
      month: month,
      sales: monthlySales[index] || 0,
    };
  });

  const lowStockProducts = products.filter((item) => item.quantity <= 5);
  const shippedOrders = orders.filter(
    (item) => item.status === "Shipped"
  ).length;
  const deliveredOrders = orders.filter(
    (item) => item.status === "Delivered"
  ).length;
  const pendingOrders = orders.filter(
    (item) => item.status === "Pending"
  ).length;
  const orderStatusData = [
    { name: "Pending", value: pendingOrders },
    { name: "Shipped", value: shippedOrders },
    { name: "Delivered", value: deliveredOrders },
  ];
  const inStockProducts = products.filter((item) => item.quantity > 5).length;

  const lowStockCount = products.filter(
    (item) => item.quantity > 0 && item.quantity <= 5
  ).length;

  const outOfStockProducts = products.filter(
    (item) => item.quantity === 0
  ).length;
  const inventoryData = [
    { name: "In Stock", value: inStockProducts },
    { name: "Low Stock", value: lowStockCount },
    { name: "Out of Stock", value: outOfStockProducts },
  ];
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
          <p>{pendingOrders}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Low Stock Products</h3>
          <p>{lowStockProducts.length}</p>
        </div>
      </div>
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h2>Order Status</h2>

          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={entry.name} fill={ORDER_COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2>Inventory Overview</h2>

          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {inventoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={INVENTORY_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={`${styles.chartCard} ${styles.chartCardFull}`}>
          <h2>Sales Overview</h2>

          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid />
                <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} interval={0} />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Bar dataKey="sales" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

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
                orders.slice(0, 5).map((order) => (
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
