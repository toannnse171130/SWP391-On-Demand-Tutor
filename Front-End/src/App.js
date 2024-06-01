import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Spinner from "./components/common/Spinner";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

function App() {
  // react query stop refetch when switch browser tabs
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Spinner />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              {routes.map((route) => (
                <Route {...route} />
              ))}
            </Routes>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
