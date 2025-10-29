# React SelectionList Component Library

A React component library built with Vite and Material UI featuring advanced components.

## Installation

```bash
npm install react-selection-list
```

## Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## Components

### SelectionList

An advanced selection list component with a modern UX design. Unlike traditional transfer lists with two side-by-side panels, this component uses toggle buttons to switch between "Select" and "Selected" views.

**Features:**
- Toggle between available and selected items
- Smart filtering (only shown when needed)
- Select All / None quick actions
- Items remain visible but disabled when selected
- Vertical scrollbar for lists with many items
- Full TypeScript support

**Usage:**

```tsx
import { useState } from 'react';
import { SelectionList, SelectionListItem } from 'react-selection-list';

function App() {
  const [items] = useState<SelectionListItem[]>([
    { id: 1, label: 'Item1' },
    { id: 2, label: 'Item2' },
    { id: 3, label: 'Item3' },
    { id: 4, label: 'Item4' },
    { id: 5, label: 'Item1234...' },
  ]);

  const [selected, setSelected] = useState<SelectionListItem[]>([]);

  return (
    <SelectionList
      items={items}
      selected={selected}
      onChange={setSelected}
    />
  );
}
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `SelectionListItem[]` | required | All available items |
| selected | `SelectionListItem[]` | `[]` | Currently selected items |
| onChange | `(selected: SelectionListItem[]) => void` | - | Callback when selection changes |
| selectLabel | `string` | `"Select"` | Label for the select view toggle |
| selectedLabel | `string` | `"Selected"` | Label for the selected view toggle |
| selectButtonLabel | `string` | `"Select items +"` | Label for the action button in select view |
| unselectButtonLabel | `string` | `"Unselect items -"` | Label for the action button in selected view |
| filterPlaceholder | `string` | `"filter..."` | Placeholder text for the filter field |
| showFilter | `boolean` | `true` | Whether to show the filter (auto-hidden if not needed) |
| maxVisibleItems | `number` | `7` | Max items to show before adding scrollbar |
| height | `number \| string` | `400` | Height of the items list |

**SelectionListItem Interface:**

```typescript
interface SelectionListItem {
  id: string | number;
  label: string;
  disabled?: boolean;
}
```

### CustomButton

A simple example button component wrapping Material UI's Button.

```tsx
import { CustomButton } from 'react-selection-list';

function App() {
  return (
    <CustomButton 
      label="Click Me" 
      onClick={() => console.log('Clicked!')}
    />
  );
}
```

## Development

### Build

```bash
npm run build
```

This will generate the distribution files in the `dist` folder.

### Publishing

Before publishing to npm:

1. Update the version in `package.json`
2. Build the package: `npm run build`
3. Publish: `npm publish`

## Design Principles

This library follows UX best practices:
- Filtering is only shown when there are more than 6-7 items
- Selected items remain visible but disabled for transparency
- Clear visual feedback for all interactions
- Accessible with proper ARIA labels
- Responsive and mobile-friendly

## License

MIT
