import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import MachinesPage from "./pages/MachinesPage";
import DocumentationPage from "./pages/DocumentationPage";
import MachineDetailsPage from "./pages/MachineDetailsPage";
import TrainingPage from "./pages/TrainingPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchResultsPage from "./components/documentation/SearchResultsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/machines" replace />} />
              <Route path="/machines" element={<MachinesPage />} />
              <Route path="/machines/:id" element={<MachineDetailsPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/documentation" element={<DocumentationPage />} />
              <Route path="/training" element={<TrainingPage />} />
              <Route path="/parts" element={<MachinesPage />} />
              <Route path="/service" element={<MachinesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
