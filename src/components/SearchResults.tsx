import { type GridColDef, type GridSortModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useHits, useInstantSearch } from "react-instantsearch";
import { DataTable, type RowAction, type RowData } from "./DataGrid";
import { useGetUserPrefs, useUpdateUserPrefs } from "../hooks/useUserPrefs.hook";

const defaultColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'brand', headerName: 'Brand', width: 300 },
  { field: 'categories', headerName: 'Categories', width: 300 },
];

const SearchResults: React.FC = () => {
  const { items } = useHits();
  const { status, refresh } = useInstantSearch();
  const { enqueueSnackbar } = useSnackbar();
  const rows = items.map((hit, idx) => ({ id: hit.objectID ?? idx, ...hit, }));
  const userPrefs = useGetUserPrefs();
  const updateUserPrefs = useUpdateUserPrefs();

  const handleView = (row: RowData) => {
    refresh();
    enqueueSnackbar('View!', { variant: 'success' })
  }

  const handleEdit = (row: RowData) => {
    refresh();
    enqueueSnackbar('Edit!', { variant: 'success' })
  }

  const handleChange = (row: RowData) => {
    refresh();
    enqueueSnackbar('Change!', { variant: 'success' })
  }

  const actions: RowAction<RowData>[] = [
    { key: 'view', label: 'View', onClick: handleView },
    { key: 'edit', label: 'Edit', onClick: handleEdit },
    { key: 'change', label: 'Change', onClick: handleChange },
  ];

  return (
    <DataTable
      rows={rows}
      loading={status === 'stalled'}
      defaultColumns={defaultColumns}
      initialSortModel={[{ field: 'createdAt', sort: 'desc' } as GridSortModel[0]]}
      initialVisibleFields={userPrefs.data}
      onVisibleFieldsChange={fields => updateUserPrefs.mutate(fields)}
      rowActions={actions}
    />
  );
};

export default SearchResults