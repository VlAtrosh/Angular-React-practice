import { z } from 'zod';

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        name: z.string().min(1, 'Название обязательно'),
        quantity: z.coerce.number().int().positive('Количество > 0'),
        price: z.coerce.number().positive('Цена > 0'),
      }),
    )
    .min(1, 'Добавьте хотя бы один товар'),
});
