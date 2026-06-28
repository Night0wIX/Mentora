# Code Style

## Functions

React components must be declared using arrow functions. This provides a consistent style across the codebase, aligns with modern React practices, and keeps component-local logic visually distinct from reusable module-level APIs.

```tsx
export const UserCard = () => {
  return <div />;
};
```

Functions that represent reusable module APIs must be declared using function declarations. This includes utilities, custom hooks, services, server actions, data mappers, validators, and any other exported business logic. Function declarations improve readability, support hoisting, and clearly communicate that the function belongs to the module rather than a specific component.

```ts
export function formatDate(date: Date) {
  return "...";
}

export function useAuth() {
  // ...
}

export async function updateProfile() {
  // ...
}
```

Functions declared inside React components, including event handlers, helper functions, computed value builders, and callbacks shared within the component, must be declared using arrow functions.

```tsx
const handleSubmit = () => {
  // ...
};

const getLabel = () => {
  // ...
};
```

Inline callbacks passed to array methods such as `map`, `filter`, `find`, `reduce`, `some`, `every`, and `sort` should use concise arrow functions whenever the body consists of a single expression.

```ts
users.filter(user => user.active);
items.map(item => item.id);
```

## Returns

React components must always use explicit `return` statements. Implicit JSX returns are not allowed. This keeps every component structurally identical, simplifies future modifications, and avoids unnecessary formatting changes when additional logic is introduced.

```tsx
export const Button = () => {
  return <button>Save</button>;
};
```

```tsx
// Forbidden
export const Button = () => <button>Save</button>;
```

Arrow functions may use implicit returns only when the function consists of a single expression and does not contain business logic.

```ts
const isAdmin = (role: Role) => role === "admin";
```

All other functions must use explicit `return` statements.

## Naming

Component names must use PascalCase.

```tsx
UserCard
```

Custom hooks must start with the `use` prefix.

```ts
useAuth
useTheme
```

Event handlers must start with the `handle` prefix.

```ts
handleSubmit
handleDelete
handleSearch
```

Boolean variables should use prefixes that clearly communicate their meaning.

```ts
isLoading
isOpen
hasPermission
canEdit
shouldRedirect
```

Utility functions should be named after the action they perform.

```ts
formatDate
createSlug
parseError
calculateTotal
```

Avoid abbreviations unless they are universally recognized.
