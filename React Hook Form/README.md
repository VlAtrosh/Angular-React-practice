Цель — закрепить на практике:

- **RHF + Zod**: неконтролируемые инпуты, `register`, `formState`, `zodResolver`.
- **Zod-схемы**: строки, числа (`coerce`), enum, массивы, кросс-полевая валидация (`refine` + `path`).
- **`useFieldArray`**: динамические списки полей.
- **`setError`**: серверные ошибки, привязанные к полю.
- **TanStack Query**: `useQuery`, `useMutation`, `queryKey`, `invalidateQueries`.
- **Оптимистичные обновления**: `onMutate` → `onError` (rollback) → `onSettled`.
- **Пагинация**: `queryKey` с параметром + `keepPreviousData`.