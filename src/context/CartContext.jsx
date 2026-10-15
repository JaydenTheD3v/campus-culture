import { useEffect, useState } from "react";
import { CartContext } from "./CartContextBase";


export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("campus-culture-cart");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "campus-culture-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product, quantity = 1, options = {}) => {
    const amount = Number(quantity);

    if (!Number.isInteger(amount) || amount < 1) return;

    const size = options.size || "One Size";
    const color = options.color || "Default";
    const key = `${product.id}-${size}-${color}`;

    setCartItems((previous) => {
      const existing = previous.find((item) => item.key === key);

      if (existing) {
        return previous.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [
        ...previous,
        {
          key,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size,
          color,
          quantity: amount,
        },
      ];
    });
  };

  const removeFromCart = (key) => {
    setCartItems((previous) =>
      previous.filter((item) => item.key !== key)
    );
  };

  const updateQuantity = (key, quantity) => {
    const amount = Number(quantity);

    if (!Number.isInteger(amount)) return;

    if (amount <= 0) {
      removeFromCart(key);
      return;
    }

    setCartItems((previous) =>
      previous.map((item) =>
        item.key === key
          ? { ...item, quantity: amount }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


