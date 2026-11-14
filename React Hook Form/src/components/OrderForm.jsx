import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema } from '../schemas/orderSchema';

const EMPTY_ITEM = { name: '', quantity: 1, price: 0 };

function OrderForm({ onSubmit }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(orderSchema),
    mode: 'onChange',
    defaultValues: { items: [EMPTY_ITEM] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  async function handleSubmitOrder(data) {
    await onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitOrder)} noValidate>
      <h3>Товары</h3>

      {fields.map((field, index) => (
        <div
          key={field.id} // ← служебный id RHF, НЕ item.id
          style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input {...register(`items.${index}.name`)} placeholder="Название" style={{ flex: 1 }} />
          <input
            type="number"
            min="1"
            {...register(`items.${index}.quantity`)}
            style={{ width: 70 }}
          />
          <input
            type="number"
            min="0"
            step="0.01"
            {...register(`items.${index}.price`)}
            style={{ width: 90 }}
          />
          <button type="button" onClick={() => remove(index)} disabled={fields.length === 1}>
            ✕
          </button>

          {errors.items?.[index]?.name && (
            <p style={{ color: 'red' }}>{errors.items[index].name.message}</p>
          )}
          {errors.items?.[index]?.quantity && (
            <p style={{ color: 'red' }}>{errors.items[index].quantity.message}</p>
          )}
          {errors.items?.[index]?.price && (
            <p style={{ color: 'red' }}>{errors.items[index].price.message}</p>
          )}
        </div>
      ))}

      {errors.items?.root && <p style={{ color: 'red' }}>{errors.items.root.message}</p>}
      {errors.items?.message && <p style={{ color: 'red' }}>{errors.items.message}</p>}

      <button type="button" onClick={() => append(EMPTY_ITEM)}>
        + Добавить товар
      </button>

      <button type="submit" disabled={isSubmitting} style={{ marginLeft: 8 }}>
        {isSubmitting ? 'Отправка...' : 'Оформить'}
      </button>
    </form>
  );
}

export default OrderForm;
