import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentOrg, setCurrentOrg] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    const org = JSON.parse(localStorage.getItem("currentOrg") || "null");

    setIsLoggedIn(loggedIn);
    setCurrentUser(user);
    setCurrentOrg(org);
  }, []);

  const login = (user, org) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("currentOrg", JSON.stringify(org));

    setIsLoggedIn(true);
    setCurrentUser(user);
    setCurrentOrg(org);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentOrg(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, currentUser, currentOrg, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
