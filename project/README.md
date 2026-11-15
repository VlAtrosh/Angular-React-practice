# Трекер задач (React + TypeScript)

Финальный проект по курсу. SPA для управления задачами с загрузкой данных с публичного API, валидацией форм, фильтрацией и сохранением избранного в `localStorage`.

## Демо

_(Добавьте ссылку на GitHub Pages или Vercel, если задеплоите)_

## Стек технологий

- **React 18** + **TypeScript** (Vite)
- **React Router v6** (навигация, динамические маршруты)
- **TanStack Query** (загрузка данных, кэш, мутации)
- **React Hook Form** + **Zod** (формы, валидация)
- **Context API** (глобальное состояние избранного)
- **localStorage** (сохранение данных между сессиями)

## Функциональность

- **Главная страница** с навигацией.
- **Список задач** с загрузкой через `useQuery` (jsonplaceholder).
- **Создание задачи** (POST-запрос) с валидацией полей.
- **Страница деталей** задачи (`/tasks/:id`) с кэшированием.
- **Фильтрация** по избранному с сохранением в URL (`?filter=favorites`).
- **Поиск по названию** (с debounce 300 мс).
- **Избранное** (добавление/удаление, кнопка «Очистить»).
- **Пустые состояния** и индикаторы загрузки/ошибок.
- **Оптимизация** рендера списка (`React.memo`, `useMemo`, `useCallback`).
- **404** страница для несуществующих маршрутов.

## Структура проекта

```text
src/
├── api/          # Запросы к API (tasks.ts)
├── components/   # Переиспользуемые компоненты (Layout, TaskCard, TaskForm, EmptyState)
├── context/      # Глобальный контекст (FavoritesContext)
├── hooks/        # Кастомные хуки (useLocalStorage, useDebounce)
├── pages/        # Страницы (HomePage, TasksPage, TaskDetailPage, NotFoundPage)
├── schemas/      # Схемы валидации (taskSchema.ts)
├── App.tsx       # Роутинг
└── main.tsx      # Точка входа


```
## Чему я научился в этом проекте

- Типизировать контексты и кастомные хуки с помощью generics.
- Использовать Zod-схемы как единый источник типа и валидации (`z.infer`).
- Понимать разницу между клиентским состоянием (`useState`, Context) и серверным (`TanStack Query`).
- Работать с URL-параметрами для фильтрации (`useSearchParams`).
- Оптимизировать рендер списков через `React.memo` и мемоизацию функций.
- Настраивать SPA-роутинг с защитой от несуществующих URL.

<img width="1919" height="911" alt="Screenshot_1" src="https://github.com/user-attachments/assets/b89b731d-e986-432f-bedc-a9c14aad9af7" />
<img width="1919" height="922" alt="post_request" src="https://github.com/user-attachments/assets/fcb56671-2faa-4022-ac33-b9167d39bab2" />
<img width="1919" height="921" alt="validation" src="https://github.com/user-attachments/assets/91471c11-7c83-4ea1-a633-7c239a269154" />
<img width="1756" height="890" alt="search" src="https://github.com/user-attachments/assets/d9c813b5-6da8-4390-b517-ccf8b5f9c45e" />
<img width="1128" height="913" alt="favorites_no" src="https://github.com/user-attachments/assets/da3efe7b-a5da-425c-86de-925c05edf5ec" />







