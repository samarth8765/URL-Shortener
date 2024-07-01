import { Link } from "react-router-dom";

const Navbar = (): JSX.Element => {
  return (
    <div>
      <nav className="bg-slate-700 p-2 text-white flex justify-between items-center">
        <div className="text-4xl p-2 ml-5">URL Shortener</div>
        <div className="flex justify-end">
          <div className="mx-2 mt-2 border p-2 rounded">
            <Link to="/login">Login</Link>
          </div>
          <div className="mx-6 mt-2 p-2 rounded border">
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
