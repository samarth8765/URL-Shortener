import React from "react";
import { useNavigate } from "react-router-dom";

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};
