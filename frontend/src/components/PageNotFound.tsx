import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-5xl text-center font-bold mt-20">
        OOP's 404 Not Found
      </h1>
      <div className="flex justify-center mt-10 ">
        <button
          onClick={() => navigate("/dashboard")}
          className="border p-4 rounded bg-red-400 border-black font-semibold"
        >
          Return To DashBoard
        </button>
      </div>
    </div>
  );
};
