import { createContext , useState } from "react";

export const OrdersContext = createContext()

export function OrdersProvider ({children}){
    const [orders , setOrders] = useState([
        {
          id: 1,
          customer: "Ali",
          total: 250,
          status: "Pending",
          date: "2026-09-12" 
        },
        {
          id: 2,
          customer: "Sara",
          total: 480,
          status: "Shipped",
          date: "2026-10-08"
        },
        {
          id: 3,
          customer: "Reza",
          total: 120,
          status: "Delivered",
          date: "2026-11-15"
        },
      ])
      return(
         <OrdersContext.Provider value={{orders , setOrders}}>
                {children}
         </OrdersContext.Provider>
      )
     
}