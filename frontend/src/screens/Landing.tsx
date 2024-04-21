import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate("/game")
    }
    return (
      <div className="bg-gray-900 w-full min-h-screen flex justify-center">
        <div className="container mx-auto px-4 max-w-screen-lg mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-center items-center">
              <img
                className="max-w-2xl md:max-w-full rounded-md shadow-md"
                src={"./chess-board.jpg"}
                alt="Chess Board"
              />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start">
              <h1 className="text-4xl font-bold text-white mb-4 text-center md:text-left">
                Play chess on the #1 site!!
              </h1>
              <div className="text-center">
                <Button onClick={handleClick} text="Join a game"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Landing;
  