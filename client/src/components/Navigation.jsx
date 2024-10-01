import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Cart from "./Cart";

// Navigation component for mobile view
const Navigation = ({heading, screen}) => {
  return (
    <div className={`navigate flex justify-between items-center ${screen} px-5`}>
      <Link to={"/"}>
        <div className="back">
          <FaArrowLeft className="text-[#6C7278] h-5 w-5 md:h-6 md:w-6" />
        </div>
      </Link>
      <div className="heading text-xl md:text-2xl lg:text-3xl font-medium">
        {heading}
      </div>
      <div className="cart">
        <Cart varients={"h-6 w-6 md:h-7 md:w-7"} />
      </div>
    </div>
  );
};

export default Navigation;
