import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashBoard } from "./components/DashBoard";
import { useRecoilValue } from "recoil";
import { isAuthenticatedAtom } from "./store/atom";
import { LinkPage } from "./components/LinkPage";
import { PageNotFound } from "./components/PageNotFound";

function App() {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  console.log(isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={DashBoard}
              apiUrl="http://localhost:8080/api/dashboard"
            />
          }
        />
        <Route path="/link/:shortURL" element={<LinkPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
