import React from "react";
import { AuthProvider } from "react-auth-kit";
import RoutesComponent from "./routes";

function App() {
  return (
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
}

export default App;
