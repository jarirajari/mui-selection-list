import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  InputAdornment,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export interface SelectionListItem {
  id: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectionListProps {
  items: SelectionListItem[];
  selected?: SelectionListItem[];
  onChange?: (selected: SelectionListItem[]) => void;
  selectLabel?: string;
  selectedLabel?: string;
  selectButtonLabel?: string;
  unselectButtonLabel?: string;
  filterPlaceholder?: string;
  showFilter?: boolean;
  maxVisibleItems?: number;
  height?: number | string;
}

export const SelectionList: React.FC<SelectionListProps> = ({
  items,
  selected = [],
  onChange,
  selectLabel = 'Select',
  selectedLabel = 'Selected',
  selectButtonLabel = 'Select items +',
  unselectButtonLabel = 'Unselect items -',
  filterPlaceholder = 'filter...',
  showFilter = true,
  maxVisibleItems = 7,
  height = 400,
}) => {
  const [currentList, setCurrentList] = useState<'select' | 'selected'>('select');
  const [filterText, setFilterText] = useState('');
  const [checkedItems, setCheckedItems] = useState<Set<string | number>>(new Set());

  // Get selected item IDs for quick lookup
  const selectedIds = useMemo(() => new Set(selected.map((item) => item.id)), [selected]);

  // Get unfiltered items count for current view
  const unfilteredItemsCount = useMemo(() => {
    if (currentList === 'select') {
      return items.length;
    } else {
      return selected.length;
    }
  }, [items.length, selected.length, currentList]);

  // Filter items based on current list and filter text
  const displayedItems = useMemo(() => {
    let itemsToShow: SelectionListItem[];

    if (currentList === 'select') {
      // Show all items in select list, but disable selected ones
      itemsToShow = items.map((item) => ({
        ...item,
        disabled: selectedIds.has(item.id),
      }));
    } else {
      // Show only selected items in selected list
      itemsToShow = items.filter((item) => selectedIds.has(item.id));
    }

    // Apply filter
    if (filterText) {
      itemsToShow = itemsToShow.filter((item) =>
        item.label.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    return itemsToShow;
  }, [items, currentList, filterText, selectedIds]);

  // Determine if filter should be shown based on unfiltered item count or if actively filtering
  const shouldShowFilter = showFilter && (unfilteredItemsCount > maxVisibleItems || filterText !== '');

  // Handle list toggle
  const handleListChange = (_event: React.MouseEvent<HTMLElement>, newList: 'select' | 'selected' | null) => {
    if (newList !== null) {
      setCurrentList(newList);
      setCheckedItems(new Set()); // Clear checked items when switching lists
      setFilterText(''); // Clear filter when switching lists
    }
  };

  // Handle checkbox toggle
  const handleToggle = (itemId: string | number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  // Handle select all
  const handleSelectAll = () => {
    const availableItems = displayedItems.filter((item) => !item.disabled);
    setCheckedItems(new Set(availableItems.map((item) => item.id)));
  };

  // Handle select none
  const handleSelectNone = () => {
    setCheckedItems(new Set());
  };

  // Handle action button click
  const handleAction = () => {
    if (currentList === 'select') {
      // Add checked items to selected list
      const itemsToAdd = items.filter((item) => checkedItems.has(item.id));
      const newSelected = [...selected, ...itemsToAdd];
      onChange?.(newSelected);
    } else {
      // Remove checked items from selected list
      const newSelected = selected.filter((item) => !checkedItems.has(item.id));
      onChange?.(newSelected);
    }
    setCheckedItems(new Set());
  };

  // Check if action button should be enabled
  const actionEnabled = checkedItems.size > 0;

  return (
    <Paper elevation={2} sx={{ p: 2, width: '100%', maxWidth: 400 }}>
      {/* Toggle buttons for Select/Selected */}
      <ToggleButtonGroup
        value={currentList}
        exclusive
        onChange={handleListChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <ToggleButton value="select">{selectLabel}</ToggleButton>
        <ToggleButton value="selected">{selectedLabel}</ToggleButton>
      </ToggleButtonGroup>

      {/* Filter field */}
      {shouldShowFilter && (
        <TextField
          fullWidth
          placeholder={filterPlaceholder}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          size="small"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}

      {/* All/None selection buttons */}
      {displayedItems.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Button size="small" onClick={handleSelectAll}>
            All
          </Button>
          <Button size="small" onClick={handleSelectNone}>
            None
          </Button>
        </Box>
      )}

      {/* Items list */}
      <List
        sx={{
          height,
          overflow: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          mb: 2,
        }}
      >
        {displayedItems.length === 0 ? (
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body2" color="text.secondary" align="center">
                  No items available
                </Typography>
              }
            />
          </ListItem>
        ) : (
          displayedItems.map((item) => {
            const labelId = `selection-list-item-${item.id}`;
            const isChecked = checkedItems.has(item.id);

            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={() => !item.disabled && handleToggle(item.id)}
                  dense
                  disabled={item.disabled}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isChecked}
                      tabIndex={-1}
                      disableRipple
                      disabled={item.disabled}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={item.label}
                    sx={{
                      opacity: item.disabled ? 0.5 : 1,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </List>

      {/* Action button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleAction}
        disabled={!actionEnabled}
      >
        {currentList === 'select' ? selectButtonLabel : unselectButtonLabel}
      </Button>
    </Paper>
  );
};
