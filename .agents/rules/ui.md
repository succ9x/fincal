# UI Standards

- Use **shadcn/ui** components exclusively. No custom components.
- If no installed shadcn/ui component fits, find one in the shadcn/ui registry and install it instead of building your own:

```bash
npx shadcn@latest add <component>
```

- Only write app code that composes and configures installed shadcn/ui components.
