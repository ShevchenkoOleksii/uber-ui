import React from "react";
import 'materialize-css';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/AuthHook";
import {AuthContext} from "./context/AuthContext";

function App() {
  const {token, userId, login, logout, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, ready
    }}>
      <BrowserRouter>
        {isAuthenticated && ready && <NavBar />}
        <div className="container">
          {ready && routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
