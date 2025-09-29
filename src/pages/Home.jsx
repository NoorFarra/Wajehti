import Shortcuts from "../components/Shortcuts";
import Prices from "../components/Prices";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen px-4 py-6 
                    sm:px-6 lg:px-12">
      {/* Shortcuts Section */}
      <div className="w-full flex justify-center mb-6">
        <Shortcuts />
      </div>

      {/* Prices Section */}
      <div className="w-full">
        <Prices />
      </div>
    </div>
  );
};

export default Home;
