import React from "react";
import { GiLion } from "react-icons/gi";
import { FaXTwitter } from "react-icons/fa6";

const sideBar = ["Home", "About", "Features", "Story"];

const Footer = () => {
  return (
    <div className=" bg-yellow-600 pb-10 ">
      <div className=" ">
        <div className="grid grid-cols-4 py-10 px-10  ">
          <div className=" ">
            <GiLion className=" text-6xl  " />
          </div>

          <div className="text-center  lg:text-3xl ">
            <p className="text-xs ">EXPLORE</p>
            {sideBar.map((link) => (
              <div key={link} className="  ">
                <a
                  href={`#${link}`}
                  className="text-xl px-4 py-2 hover:underline
                 transition duration-300 leading-loose font-bold "
                >
                  {" "}
                  {link}{" "}
                </a>
              </div>
            ))}
          </div>

          <div className="text-center my-10 lg:text-3xl ">
            <p className="text-xs">Contact Us</p>
            <p className="font-bold">
              <a href="mailto:solomonnnamani01@email.com ">Email</a>{" "}
            </p>
          </div>

          <div className=" text-center my-10 lg:text-3xl ">
            <p className="text-xs">Follow Us</p>
            <p className="font-bold flex  justify-center ">
              <a href="https://x.com/therealnnamani?t=P6N5ymdKaRXeobWXnmrEbw&s=09 ">
                <FaXTwitter className="text-center" />{" "}
              </a>{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-xl font-bold ">&copy; Solomon,2024.</div>
    </div>
  );
};

export default Footer;
