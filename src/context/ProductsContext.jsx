import { createContext, useState } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 1200, quantity: 8 },
    { id: 2, name: "Mouse", price: 25, quantity: 30 },
    { id: 3, name: "Keyboard", price: 75, quantity: 0 },
  ]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}