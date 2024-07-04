import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URLProps } from "../utils/interfaces";
import { formatDate } from "../utils/date";
import { LogoutButton } from "./Logout";

export const LinkPage = () => {
  const navigate = useNavigate();
  const { shortURL } = useParams();
  const [url, setUrl] = useState<URLProps>();
  const prefix = "http://localhost:8080/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/url/${shortURL}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUrl(response.data);
      } catch (err) {
        console.log(err);
        navigate("/404");
      }
    };
    fetchData();
  }, [shortURL, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <nav className="w-full bg-white shadow-md">
        <div className="container mx-auto p-5 flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Dashboard
          </button>
          <div className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
            <LogoutButton />
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-10 p-6 bg-white rounded shadow-md">
        {url ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">{url.title}</h1>
            <div className="mb-4">
              <a
                href={url.longURL}
                target="_blank"
                className="text-blue-500  break-words"
              >
                {url.longURL}
              </a>
            </div>
            <div className="mb-4">
              <a
                href={prefix + url.shortURL}
                className="text-blue-500  break-words"
                target="_blank"
              >
                {prefix + url.shortURL}
              </a>
            </div>
            <div className="mb-4">Number of Clicks: {url.TotalClicks}</div>
            <div className="text-gray-600">
              Created At: {formatDate(new Date(url.createdAt))}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};
