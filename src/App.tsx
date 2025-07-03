import { Paper, Stack } from "@mui/material";
import Client from "@searchkit/instantsearch-client";
import { CurrentRefinements, InstantSearch, SearchBox } from "react-instantsearch";
import Searchkit from "searchkit";
import { MenuSelect } from "./MenuSelect";
import SearchResults from "./SearchResults";

const sk = new Searchkit({
  connection: {
    host: "http://localhost:9200",
  },
  search_settings: {
    search_attributes: [
      { field: 'name', weight: 3 },
      { field: 'categories', weight: 2 },
      { field: 'brand', weight: 2 },
      'description'
    ],
    result_attributes: ['name', 'description', 'categories', 'brand'],
    highlight_attributes: ['name'],
    snippet_attributes: ['description'],
    facet_attributes: [
      { attribute: 'brand', field: 'brand.keyword', type: "string" },
      { attribute: 'categories', field: 'categories.keyword', type: "string" }
    ]
  },
});

const searchClient = Client(sk);

const App = () => {
  return (
    <InstantSearch indexName="products" searchClient={searchClient}>
      <Stack direction="row" spacing={2}>
        <Stack flex="1">
          <Paper sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }} elevation={0}>
            <MenuSelect attribute="brand" />
            <MenuSelect attribute="categories" />
          </Paper>
        </Stack>
        <Stack flex="1">
          <Stack spacing={2} alignItems="flex-start">
            <SearchBox style={{width: "100%"}} />
            <CurrentRefinements />
          </Stack>
          <SearchResults />
        </Stack>
      </Stack>
    </InstantSearch>
  )
};

export default App
