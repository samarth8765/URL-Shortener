import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { URLFormProps, URLProps } from "../utils/interfaces";

export const URLForm: React.FC<URLFormProps> = ({ onSubmit, onClose }) => {
  const prefix = "http://localhost:8080/";
  const prefixLength = prefix.length;
  const [newURL, setNewURL] = useState<Partial<URLProps>>({
    longURL: "",
    shortURL: prefix,
    title: "",
  });

  const shortURLRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shortURLRef.current) {
      shortURLRef.current.value = newURL.shortURL as string;
    }
  }, [newURL.shortURL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewURL({ ...newURL, [name]: value.trim() });
  };

  const handleShortURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    e.target.value = prefix + input.slice(prefix.length);
    setNewURL({ ...newURL, shortURL: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newURL.title) {
      Swal.fire({
        title: "Missing Title",
        icon: "error",
        text: "Please enter a title",
      });
      return;
    }
    if (!newURL.longURL) {
      Swal.fire({
        title: "Missing LongURL",
        icon: "error",
        text: "Please enter a long url",
      });
      return;
    }

    const updatedURL = {
      ...newURL,
      shortURL: newURL.shortURL?.slice(prefixLength),
    };

    onSubmit(updatedURL);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-1/3 relative">
        <button
          className="absolute top-5 right-4 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4">Create New URL</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div>
              <input
                type="text"
                name="title"
                value={newURL.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Title"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                name="longURL"
                value={newURL.longURL}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Long URL"
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              name="shortURL"
              ref={shortURLRef}
              defaultValue={newURL.shortURL}
              className="w-full p-2 border rounded"
              onChange={handleShortURLChange}
              placeholder="Short URL"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
