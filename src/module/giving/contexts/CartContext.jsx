import React, { useEffect, useState } from 'react';

export const CartContext = React.createContext({ total: 0 });

export function CartContextProviderWrapper({ children }) {
  let [cart, setCart] = useState({});
  let [total, setTotal] = useState(0);

  let updateCart = ({ label, cost, itemCounter }) => {
    //product: {label, cost, itemCounter }
    let newCart = { ...cart };
    newCart[label] = { cost, itemCounter };

    setCart({ ...newCart });
  }

  useEffect(() => {
    let total = 0;

    for (const product in cart) {
      let { cost, itemCounter } = cart[product];

      total += cost * itemCounter;
    }

    setTotal(total);
  }, [cart]);

  return (
    <CartContext.Provider value={{ total, updateCart, cart }}>
      {children}
    </CartContext.Provider>
  );
}