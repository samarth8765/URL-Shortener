import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../store/atom";
import { ProtectedRouteProps } from "../utils/interfaces";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  apiUrl,
  element: Component,
}) => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);
  const [serverResponse, setServerResponse] = useState<{ username: string }>({
    username: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServerResponse(response.data);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [apiUrl, setIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Component username={serverResponse.username} />
  ) : (
    <Navigate to="/login" />
  );
};
