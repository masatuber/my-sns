import { StrictMode, } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from "./state/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider.Provider>
      <App />
    </AuthContextProvider.Provider>
  </StrictMode>
);
