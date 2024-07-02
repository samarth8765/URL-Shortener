import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URLProps } from "../utils/interfaces";
import { formatDate } from "../utils/date";

export const LinkPage = () => {
  const navigate = useNavigate();
  const { shortURL } = useParams();
  const [url, setUrl] = useState<URLProps>();

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
  }, []);
  return (
    <div>
      <div>
        <nav>
          <button
            onClick={() => navigate("/dashboard")}
            className="p-3 border m-3 rounded border-black bg-red-400 font-semibold"
          >
            DashBoard
          </button>
        </nav>
      </div>

      <div className="ml-10">
        <div>{url?.title}</div>
        <div>{url?.longURL}</div>

        <div>{url?.shortURL}</div>
        <div>{url?.TotalClicks}</div>
        <div>{formatDate(new Date(url?.createdAt || ""))}</div>
      </div>
    </div>
  );
};
