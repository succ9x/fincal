# UI Standards

## Components

- Use **shadcn/ui** components exclusively. Do not build custom components.
- If no installed shadcn/ui component fits, search the shadcn/ui registry and install the appropriate component instead of creating your own.

```bash
npx shadcn@latest add <component>
```

- Only write app code that composes and configures installed shadcn/ui components.
