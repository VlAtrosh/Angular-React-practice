import { useCart, useCartDispatch, useCartTotal } from '../hooks/useCart';

function Cart() {
  const items = useCart(); // данные
  const dispatch = useCartDispatch();
  const { totalCount, totalPrice } = useCartTotal();

  return (
    <div>
      <h2>Корзина ({totalCount})</h2>
      {items.length === 0 ? (
        <p>Пусто</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((i) => (
              <li key={i.id} style={{ display: 'flex', gap: 8, padding: '6px 0' }}>
                <span style={{ flex: 1 }}>
                  {i.name} × {i.qty} = {i.price * i.qty}₽
                </span>
                <button onClick={() => dispatch({ type: 'DECREMENT', payload: i.id })}>−</button>
                <button onClick={() => dispatch({ type: 'INCREMENT', payload: i.id })}>+</button>
                <button onClick={() => dispatch({ type: 'REMOVE', payload: i.id })}>✕</button>
              </li>
            ))}
          </ul>
          <p>
            <strong>Итого: {totalPrice}₽</strong>
          </p>
          <button onClick={() => dispatch({ type: 'CLEAR' })}>Очистить</button>
        </>
      )}
    </div>
  );
}

export default Cart;
