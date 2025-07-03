import {
    DataGrid,
    GridActionsCellItem,
    type GridColDef,
    type GridColumnVisibilityModel,
    type GridSortModel,
} from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';

export interface RowData { id: string;[key: string]: any; }

export interface RowAction<T extends RowData> {
    /** Unique key for React elements */
    key: string;
    /** Label for the action */
    label: string;
    /** Callback when the action is triggered */
    onClick: (row: T) => void;
    /** Whether to show this action in the overflow menu */
    showInMenu?: boolean;
    /** Width for the actions column (optional) */
    width?: number;
}

export interface DataTableProps<T extends RowData> {
    /** Data rows to display */
    rows: T[];
    /** Loading state for skeleton */
    loading: boolean;
    /** Base column definitions */
    defaultColumns: GridColDef[];
    /** Initial sort model */
    initialSortModel?: GridSortModel;
    /** Optional initial visible fields; if omitted, all defaultColumns will be shown */
    initialVisibleFields?: string[];
    /** Callback when visibility changes (e.g. save prefs) */
    onVisibleFieldsChange: (visibleFields: string[]) => void | Promise<void>;
    /** Optional row actions; if provided, an Actions column will be appended */
    rowActions?: RowAction<T>[];
}

export function DataTable<T extends RowData>({
    rows,
    loading,
    defaultColumns,
    initialSortModel = [],
    initialVisibleFields,
    onVisibleFieldsChange,
    rowActions,
}: DataTableProps<T>): JSX.Element {
    const [columnVisibilityModel, setColumnVisibilityModel] =
        useState<GridColumnVisibilityModel>({});

    // Initialize visibility based on provided fields or default to all
    useEffect(() => {
        const fieldsToShow =
            initialVisibleFields ?? defaultColumns.map(col => col.field);
        const model: GridColumnVisibilityModel = {};
        defaultColumns.forEach(col => {
            model[col.field] = fieldsToShow.includes(col.field);
        });
        setColumnVisibilityModel(model);
    }, [defaultColumns, initialVisibleFields]);

    const columns = useMemo((): GridColDef[] => {
        const cols = [...defaultColumns];
        if (rowActions && rowActions.length > 0) {
            const actionCol: GridColDef = {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                width: rowActions[0].width ?? 80,
                sortable: false,
                filterable: false,
                getActions: ({ row }) =>
                    rowActions!.map(action => (
                        <GridActionsCellItem
                            key={action.key}
                            label={action.label}
                            showInMenu
                            onClick={() => action.onClick(row as T)}
                        />
                    )),
            };
            cols.push(actionCol);
        }
        return cols;
    }, [defaultColumns, rowActions]);

    const handleVisibilityChange = (
        model: GridColumnVisibilityModel
    ): void => {
        setColumnVisibilityModel(model);
        const visibleFields = Object.entries(model)
            .filter(([, visible]) => visible)
            .map(([field]) => field);
        onVisibleFieldsChange(visibleFields);
    };

    return (
        <DataGrid
            rows={rows}
            loading={loading}
            columns={columns}
            sortModel={initialSortModel}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleVisibilityChange}
            pagination
            showToolbar
            pageSizeOptions={[10, 25, 50]}
            disableColumnMenu={false}
            checkboxSelection={false}
            sx={{ '& .MuiDataGrid-virtualScroller': { overflowX: 'auto' } }}
            slotProps={{
                loadingOverlay: {
                    variant: 'skeleton',
                    noRowsVariant: 'skeleton',
                },
            }}
        />
    );
}