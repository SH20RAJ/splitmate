# Pill Component Usage Guide

The Pill component is a versatile UI element that extends the functionality of the standard Badge component with additional features like indicators, deltas, and avatars. This guide explains how to use the Pill component and its variants effectively.

## Installation

The Pill component was added to the project using the following command:

```bash
npx shadcn@latest add https://www.kibo-ui.com/r/pill.json
```

This created the component at `src/components/ui/kibo-ui/pill/index.tsx`.

## Components

The Pill component package includes several sub-components:

1. `Pill` - The main badge component
2. `PillAvatar` - For displaying avatars within the pill
3. `PillButton` - For interactive buttons within the pill
4. `PillStatus` - For displaying status information
5. `PillIndicator` - For showing status indicators with different colors and pulse effects
6. `PillDelta` - For showing directional changes (up/down/neutral)
7. `PillIcon` - For displaying icons within the pill
8. `PillAvatarGroup` - For grouping multiple avatars

## Usage Examples

### Basic Pill

```tsx
import { Pill } from "@/components/ui/kibo-ui/pill"

// Simple pill
<Pill variant="default">Active</Pill>

// Pill with custom styling
<Pill variant="secondary" className="text-xs">Pending</Pill>
```

### Pill with Indicator

```tsx
import { Pill, PillIndicator } from "@/components/ui/kibo-ui/pill"

// Success indicator
<Pill variant="default">
  <PillIndicator variant="success" />
  Active
</Pill>

// Warning indicator with pulse animation
<Pill variant="outline">
  <PillIndicator variant="warning" pulse />
  Pending
</Pill>
```

### Pill with Delta

```tsx
import { Pill, PillDelta } from "@/components/ui/kibo-ui/pill"

// Positive delta
<Pill variant="outline">
  +12.5%
  <PillDelta delta={12.5} />
</Pill>

// Negative delta
<Pill variant="outline">
  -5.2%
  <PillDelta delta={-5.2} />
</Pill>
```

### Pill with Avatar

```tsx
import { Pill, PillAvatar } from "@/components/ui/kibo-ui/pill"

<Pill variant="secondary">
  <PillAvatar src="/avatar.jpg" fallback="U" />
  User
</Pill>
```

## Implementation in SplitMate

The Pill component has been implemented in several parts of the SplitMate application:

### Groups Page

In `src/app/(dashboard-cl)/groups/[id]/page.tsx`:

1. Group status indicator with pulsing indicator for active groups:
   ```tsx
   <Pill variant={group.status === 'active' ? 'default' : 'secondary'}>
     <PillIndicator variant={group.status === 'active' ? 'success' : 'info'} pulse={group.status === 'active'} />
     {group.status}
   </Pill>
   ```

2. Expense category tags:
   ```tsx
   <Pill variant="outline" className="text-xs">{expense.category}</Pill>
   ```

3. "You" badges for current user identification:
   ```tsx
   <Pill variant="secondary" className="text-xs">You</Pill>
   ```

4. Pending settlement indicator with warning pulse:
   ```tsx
   <Pill variant="outline" className="text-orange-600 border-orange-200">
     <PillIndicator variant="warning" pulse />
     Pending Settlement
   </Pill>
   ```

### DataTable Component

In `src/components/data-table.tsx`:

1. Status indicators with appropriate icons and indicators:
   ```tsx
   <Pill variant="outline" className="text-muted-foreground px-1.5">
     {row.original.status === "Done" ? (
       <>
         <PillIndicator variant="success" />
         <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
       </>
     ) : (
       <>
         <PillIndicator variant="warning" pulse />
         <IconLoader />
       </>
     )}
     {row.original.status}
   </Pill>
   ```

2. Section type tags:
   ```tsx
   <Pill variant="outline" className="text-muted-foreground px-1.5">
     {row.original.type}
   </Pill>
   ```

### Section Cards

In `src/components/section-cards.tsx`:

Percentage change indicators with delta arrows:
```tsx
<Pill variant="outline">
  <IconTrendingUp />
  +12.5%
  <PillDelta delta={12.5} />
</Pill>
```

## Best Practices

1. **Use appropriate variants**: Choose the right variant (`default`, `secondary`, `destructive`, `outline`) based on the importance and context of the information.

2. **Combine with indicators**: Use `PillIndicator` to provide visual cues about the status (success, warning, error, info).

3. **Add pulse effects**: Use the `pulse` prop on `PillIndicator` for active or important statuses that require attention.

4. **Show directional changes**: Use `PillDelta` to indicate positive or negative changes in values.

5. **Maintain consistency**: Keep the styling consistent across similar use cases in your application.

## When to Use Pill vs Badge

- Use **Pill** when you need additional features like indicators, deltas, or avatars
- Use **Badge** for simple status indicators without additional visual elements
- Consider **Pill** for more interactive elements or when you need to group related information

## Customization

The Pill component accepts all props that the standard Badge component accepts, plus additional props specific to each sub-component. You can customize the appearance using Tailwind CSS classes through the `className` prop.