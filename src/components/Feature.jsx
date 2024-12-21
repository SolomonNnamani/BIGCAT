import React from "react";
import Rotation from "./Rotation.jsx";

const Feature = () => {
  return (
    <div id="Features" className=" bg-black text-white px-12 py-12 ">
      <div>
        <h1 className=" text-xl font-HeadBold mb-2 lg:text-5xl ">
          Unleash the Wild
        </h1>
        <p className="text-slate-300 opacity-75 lg:text-xl ">
          Explore a dynamic and interconnected world <br /> of big cats, where
          awe-inspiring moments <br /> await around every corner
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-20 ">
        {/*First Gif */}

        <div className="   md:col-span-2 relative  ">
          <Rotation>
            <div className="lg:h-97 ">
              <video
                autoPlay
                muted
                loop
                className=" w-full object-cover h-full  rounded-lg "
              >
                <source src={`/video/feature_1.mp4`} type="video/mp4" />
              </video>
              <div className="absolute top-0 mx-3 my-4   ">
                <h2 className="text-3xl font-HeadBold mb-2 lg:text-5xl ">
                  PREDATORS OF THE WILD
                </h2>
                <p className=" lg:text-xl ">
                  Experience the power and Beauty of Big Cats <br /> in Their
                  Natural Habitat, a World of <br /> Majesty, Wonder, and
                  Discovery.
                </p>
              </div>
            </div>
          </Rotation>
        </div>

        {/*Second Gif */}

        <div className="    md:row-span-2 relative rounded-xl  ">
          <Rotation>
            <div className="h-98">
              <video
                autoPlay
                muted
                loop
                className=" w-full  object-cover h-full rounded-lg"
              >
                <source src={`/video/feature_2.mp4`} type="video/mp4" />
              </video>
              <div className="absolute top-0 mx-3 my-4   ">
                <h2 className="text-3xl font-HeadBold mb-2 lg:text-5xl ">
                  WILD PRIDE
                </h2>
                <p className=" lg:text-xl ">
                  A Majestic Collection of Big <br /> Cat-Inspired Art, Ready to{" "}
                  <br /> Roam Free.
                </p>
              </div>
            </div>
          </Rotation>
        </div>

        {/*Third Gif */}
        <div className=" relative">
          <Rotation>
            <div
              className="h-80 w-80 ml-auto lg:w-full lg:ml-0
             border-l border-white rounded-lg "
            >
              <video
                autoPlay
                muted
                loop
                className=" w-full h-full  object-cover rounded-lg  "
              >
                <source src={`/video/feature_3.mp4`} type="video/mp4" />
              </video>
              <div className="absolute top-0 mx-3 my-4    ">
                <h2 className="text-3xl font-HeadBold mb-2 lg:text-5xl ">
                  SURVIVAL OF THE FITTEST
                </h2>
                <p className=" lg:text-xl ">
                  {" "}
                  In the harsh world of the savannah,
                  <br /> only the strongest survive. Can this <br /> zebra
                  outsmart its predator and <br /> live to see another day?
                </p>
              </div>
            </div>
          </Rotation>
        </div>

        {/*Fourth Gif */}
        <div className="rounded-lg w-full h-96 bg-slate-400 relative ">
          <Rotation>
            <div className="h-96">
              <video
                autoPlay
                muted
                loop
                className=" w-full h-full  object-cover  rounded-lg "
                style={{
                  objectPosition: "20% 70%",
                }}
              >
                <source src={`/video/feature_4.mp4`} type="video/mp4" />
              </video>
              <div className="absolute top-0 mx-3 my-4 text-black  ">
                <h2 className="text-3xl font-HeadBold mb-2 lg:text-5xl ">
                  NATURAL REALM
                </h2>
                <p className=" lg:text-xl ">
                  Enter the untamed world of <br /> big cats, where nature's
                  <br /> beauty and wonder <br /> await.
                </p>
              </div>
            </div>
          </Rotation>
        </div>
      </div>
    </div>
  );
};

export default Feature;
