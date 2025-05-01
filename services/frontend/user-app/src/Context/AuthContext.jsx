import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [userName, setUserName] = useState(localStorage.getItem("username") || "");

  const login = (token, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", name);
    setIsAuthenticated(true);
    setUserName(name);
  };

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUserName("");
  
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been successfully logged out.",
        });
      }
    });
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
