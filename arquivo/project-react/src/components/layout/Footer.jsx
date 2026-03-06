import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer(){
    return (
        <footer className="m-0 bg-mist-900 text-amber-50 h-full w-full">
            <div className="flex justify-center gap-10 list-none mt-10 pt-2">
            <li>
                <FaFacebook className="text-2xl" />
            </li>
            <li>
                <FaInstagram className="text-2xl" />
            </li>
            <li>
                <FaLinkedin className="text-2xl" />
            </li>
            </div>
            <p className="flex justify-center text-1xl mt-1">
                <span> Costs</span> &copy;2025
            </p>
        </footer>
    )
} export default Footer