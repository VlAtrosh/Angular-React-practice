import { createContext, useReducer, useMemo } from 'react';

const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  CLEAR: 'CLEAR',
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const { product } = action.payload;
      const existing = state.find((i) => i.id === product.id);
      if (existing) {
        // если уже есть — увеличиваем количество
        return state.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...state, { ...product, qty: 1 }];
    }

    case ACTIONS.REMOVE:
      return state.filter((i) => i.id !== action.payload);

    case ACTIONS.INCREMENT:
      return state.map((i) => (i.id === action.payload ? { ...i, qty: i.qty + 1 } : i));

    case ACTIONS.DECREMENT:
      return state
        .map((i) => (i.id === action.payload ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0); // 0 → удаляем

    case ACTIONS.CLEAR:
      return [];

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// Два контекста — данные и dispatch
export const CartContext = createContext(null);
export const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={items}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}
