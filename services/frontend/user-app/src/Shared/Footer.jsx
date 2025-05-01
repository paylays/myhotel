import { BiLogoLinkedin, BiSolidPhoneCall } from "react-icons/bi";
import {
  FaEnvelope,
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-lightBlack ">
      <div className="Container">
        <hr className="text-[#353535] w-full h-[2px]" />
        <div className="py-5 md:py-6 lg:py-[22px]   flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <p className="text-[13px] xsm:text-sm sm:text-base leading-[26px] lg:leading-[38px] font-Lora font-medium ml-4 text-white">
            Copyright ©{" "}
            <span className="text-khaki">{`${new Date().getFullYear()} Payylayss.`}</span>{" "}
            All Rights Reserved.
          </p>
          <div>
            <ul className="flex space-x-3">
              <li className="hover-animBg hover:scale-100 group transition-all duration-300 w-[35px] h-[35px] md:w-[40px] md:h-[40px] xl:w-[50px] xl:h-[50px] grid items-center justify-center rounded-full border border-[#353535] hover:border-khaki cursor-pointer ">
                <Link to="#" className="">
                  <FaFacebookF className="text-white group-hover:text-slateBlue-0 w-4 h-4" />
                </Link>
              </li>

              <li className="hover-animBg group transition-all duration-300 w-[35px] h-[35px] md:w-[40px] md:h-[40px] xl:w-[50px] xl:h-[50px] grid items-center justify-center rounded-full border border-[#353535] hover:border-khaki cursor-pointer">
                <Link to="#">
                  <FaTwitter className="text-white group-hover:text-slateBlue-0 w-4 h-4" />
                </Link>
              </li>
              <li className="hover-animBg group transition-all duration-300 w-[35px] h-[35px] md:w-[40px] md:h-[40px] xl:w-[50px] xl:h-[50px] grid items-center justify-center rounded-full border border-[#353535] hover:border-khaki cursor-pointer">
                <Link to="#">
                  <BiLogoLinkedin className="text-white group-hover:text-slateBlue-0 w-4 h-4" />
                </Link>
              </li>
              <li className="hover-animBg group transition-all duration-300 w-[35px] h-[35px] md:w-[40px] md:h-[40px] xl:w-[50px] xl:h-[50px] grid items-center justify-center rounded-full border border-[#353535] hover:border-khaki cursor-pointer">
                <Link to="#">
                  <FaPinterestP className="text-white group-hover:text-slateBlue-0 w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
