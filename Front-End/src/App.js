import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Spinner from "./components/common/Spinner";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { IKContext } from "imagekitio-react";
import { IKCONTEXT_URL } from "./constants/constants";

function App() {
  // react query stop refetch when switch browser tabs
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const authenticationEndpoint = "http://localhost:3001/auth";

  const authenticator = async () => {
    try {
      // You can pass headers as well and later validate the request source in the backend, or you can use headers for any other use case.
      const response = await fetch(authenticationEndpoint);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

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
        <IKContext
          urlEndpoint={IKCONTEXT_URL.ENDPOINT}
          publicKey={IKCONTEXT_URL.PUBLICT_KEY}
          authenticator={authenticator}
        >
          <AuthProvider>
            <Router>
              <Routes>
                {routes.map((route) => (
                  <Route {...route} />
                ))}
              </Routes>
            </Router>
          </AuthProvider>
        </IKContext>
      </QueryClientProvider>
    </>
  );
}

export default App;
