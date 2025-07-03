import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useMenu, type UseMenuProps } from 'react-instantsearch';

export function MenuSelect(props: UseMenuProps) {
    const { items, refine } = useMenu(props);
    const { value: selectedValue } = items.find((item) => item.isRefined) || { value: '' };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.attribute}</InputLabel>
            <Select
                fullWidth
                label={props.attribute}
                value={selectedValue}
                onChange={(event) => refine((event.target as HTMLSelectElement).value)}
            >
                {items.map((item) => (
                    <MenuItem value={item.value}>
                        {item.label} ({item.count})
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}