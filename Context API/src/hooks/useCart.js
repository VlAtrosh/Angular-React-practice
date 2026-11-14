import { useContext, useMemo } from 'react';
import { CartContext, CartDispatchContext } from '../context/CartContext';

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === null) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (ctx === null) throw new Error('useCartDispatch must be used within CartProvider');
  return ctx;
}

// Производные данные (итог) — мемоизируем
export function useCartTotal() {
  const items = useCart();
  return useMemo(() => {
    const totalCount = items.reduce((s, i) => s + i.qty, 0);
    const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);
    return { totalCount, totalPrice };
  }, [items]);
}
