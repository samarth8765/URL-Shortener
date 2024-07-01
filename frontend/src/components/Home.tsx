import Navbar from "./Navbar";

const Home = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <div className="text-center text-4xl mt-4">Welcome to URL Shortener</div>
    </div>
  );
};

export default Home;
