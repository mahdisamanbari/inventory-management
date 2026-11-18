import { createContext , useState } from "react";

export const OrdersContext = createContext()

export function OrdersProvider ({children}){
    const [orders , setOrders] = useState([
        {
          id: 1,
          customer: "Ali",
          total: 250,
          status: "Pending",
        },
        {
          id: 2,
          customer: "Sara",
          total: 480,
          status: "Shipped",
        },
        {
          id: 3,
          customer: "Reza",
          total: 120,
          status: "Delivered",
        },
      ])
      return(
         <OrdersContext.Provider value={{orders , setOrders}}>
                {children}
         </OrdersContext.Provider>
      )
     
}