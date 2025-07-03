import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3} autoHideDuration={5000} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </QueryClientProvider>
  </StrictMode>,
)
