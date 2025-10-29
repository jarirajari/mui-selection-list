import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { SelectionList, SelectionListItem } from './SelectionList';
import { Box, Typography, Paper } from '@mui/material';

// Sample data for testing
const sampleItems: SelectionListItem[] = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: 3, label: 'Cherry' },
  { id: 4, label: 'Date' },
  { id: 5, label: 'Elderberry' },
  { id: 6, label: 'Fig' },
  { id: 7, label: 'Grape' },
  { id: 8, label: 'Honeydew' },
  { id: 9, label: 'Kiwi' },
  { id: 10, label: 'Lemon' },
  { id: 11, label: 'Mango' },
  { id: 12, label: 'Nectarine' },
  { id: 13, label: 'Orange' },
  { id: 14, label: 'Papaya' },
  { id: 15, label: 'Quince' },
];

const App = () => {
  const [selected, setSelected] = useState<SelectionListItem[]>([]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Typography variant="h4" component="h1">
        SelectionList Development
      </Typography>

      <SelectionList
        items={sampleItems}
        selected={selected}
        onChange={setSelected}
      />

      {/* Debug panel */}
      <Paper sx={{ p: 2, width: '100%', maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Selected Items ({selected.length})
        </Typography>
        {selected.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No items selected
          </Typography>
        ) : (
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {selected.map((item) => (
              <li key={item.id}>
                <Typography variant="body2">{item.label}</Typography>
              </li>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
