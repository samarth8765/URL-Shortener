import React, { useEffect, useState } from "react";
import { LogoutButton } from "./Logout";
import axios from "axios";
import { URLs } from "./URLs";
import { DashBoardProps, URLProps } from "../utils/interfaces";
import { FilterIcon } from "../icons/filter";
import { URLForm } from "./URLForm";

export const DashBoard: React.FC<DashBoardProps> = (props) => {
  const { username } = props;
  const [showForm, setShowForm] = useState<boolean>(false);
  const [urls, setUrls] = useState<URLProps[]>([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("http://localhost:8080/api/urls", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUrls(response.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchUrls();
  }, []);

  const handleSubmit = async (newURL: Partial<URLProps>) => {
    console.log(newURL);
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        "http://localhost:8080/api/url",
        newURL,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUrls([...urls, response.data]);
    } catch (err: any) {
      console.log(err);
    }
  };

  const urlDummyData: URLProps = {
    TotalClicks: 1,
    createdAt: new Date(),
    longURL: "https:youtube.com",
    shortURL: "http://localhost:8080/abcd",
    numberOfLinks: 50,
    title: "youtube title",
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="ml-32 mt-5 text-4xl">Welcome to the Dashboard!</h1>
          <span className="ml-32">{username}</span>
        </div>

        <div className="mr-16 border border-solid border-black p-2 mt-5 rounded mb-16">
          <LogoutButton />
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 flex justify-center p-5 border ml-16 border-black rounded">
          <h1>Links Created &nbsp;: &nbsp;</h1>
          <p>{urlDummyData.numberOfLinks}</p>
        </div>

        <div className="w-1/2 flex justify-center p-5 border ml-10 mr-16 border-black rounded">
          <h1>Total Clicks &nbsp;: &nbsp;</h1>
          <p>{urlDummyData.TotalClicks}</p>
        </div>
      </div>

      <div className="mr-16 mt-10 flex justify-between">
        <div className="text-4xl ml-16">My Links</div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="border border-solid border-black p-2 rounded"
        >
          Create New
        </button>
      </div>

      <div className="flex justify-between items-center border border-black mt-10 ml-16 mr-16 rounded">
        <input
          type="text"
          placeholder="Filter Links... "
          className=" ml-6 p-2 border-none focus:outline-none w-full"
        />
        <div className="mr-16">
          <FilterIcon />
        </div>
      </div>

      <div>
        <URLs {...urlDummyData} />
      </div>

      {showForm && (
        <URLForm onSubmit={handleSubmit} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};
