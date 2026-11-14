import { useCartDispatch } from '../hooks/useCart';

const PRODUCTS = [
  { id: 1, name: 'Яблоко', price: 50 },
  { id: 2, name: 'Хлеб', price: 40 },
  { id: 3, name: 'Молоко', price: 90 },
];

function ProductList() {
  const dispatch = useCartDispatch(); // только dispatch — стабилен

  return (
    <div>
      <h2>Товары</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {PRODUCTS.map((p) => (
          <li key={p.id} style={{ display: 'flex', gap: 8, padding: '6px 0' }}>
            <span style={{ flex: 1 }}>
              {p.name} — {p.price}₽
            </span>
            <button onClick={() => dispatch({ type: 'ADD', payload: { product: p } })}>
              В корзину
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
