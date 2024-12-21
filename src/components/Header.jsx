import React, { useState, useRef, useEffect } from "react";
import Button from "./Button.jsx";
import { FaLocationArrow } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [displayCount, setDisplayCount] = useState(1);
  const [currentCount, setCurrentCount] = useState(2);
  const [loading, setLoading] = useState(true);
  const displayRef = useRef(null);
  const currentRef = useRef(null);
  const clipRef = useRef(null);
  const loadingRef = useRef([]);

  useEffect(() => {
    const loadingTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });
    loadingTimeline
      .fromTo(
        loadingRef.current[0],
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      .fromTo(
        loadingRef.current[1],
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      .fromTo(
        loadingRef.current[2],
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      .fromTo(
        loadingRef.current[3],
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      .fromTo(
        loadingRef.current[4],
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
  }, []);

  const handleLoaded = () => {
    setLoading(false);
  };

  const handleClick = () => {
    const transitionTimeline = gsap.timeline({
      onComplete: () => {
        currentCount < 4
          ? setCurrentCount((prevCount) => prevCount + 1)
          : setCurrentCount(1);

        displayCount < 4
          ? setDisplayCount((prevDisplay) => prevDisplay + 1)
          : setDisplayCount(1);
      },
    });
    //for the whiteflash
    transitionTimeline
      .set(displayRef.current, {
        opacity: 0,
        scale: 0.9,
      })
      .to(displayRef.current, {
        opacity: 1,
        scale: 1,
        scrub: true,
      });

    gsap.to(currentRef.current, {
      scale: 20,
      opacity: 0,
      duration: 0.8,
      transformOrigin: "center center",
      ease: "power2.in",
      onComplete: () => {
        gsap.fromTo(
          currentRef.current,
          {
            scale: 0.1,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            transformOrigin: "center center",
            ease: "power2.out",
          }
        );
      },
    });
  };

  useEffect(() => {
    const currentElement = currentRef.current;

    gsap.to(currentElement, {
      scale: 0.5,
      duration: 1,
      ease: "power2.out",
    });

    const handleMouseMove = (e) => {
      if (!currentElement) return;

      // Get square's bounding rectangle
      const rect = currentElement.getBoundingClientRect();
      const squareX = rect.left + rect.width / 2;
      const squareY = rect.top + rect.height / 2;

      //Calculate distance between mouse and square center
      const deltaX = e.clientX - squareX;
      const deltaY = e.clientY - squareY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Maximum distance for scaling effect (in pixels)
      const maxDistance = 300;

      // Calculate scale based on distance
      let targetScale;
      if (distance <= maxDistance) {
        //inverse relationship: closer = bigger
        targetScale = 1 * (1 - distance / maxDistance) + 0.5;
      } else {
        targetScale = 0.5;
      }

      gsap.to(currentElement, {
        scale: targetScale,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(currentElement, {
        scale: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(currentElement, {
        scale: 0.5,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    let clipArt = clipRef.current;
    if (clipArt) {
      clipArt.addEventListener("mousemove", handleMouseMove);
      clipArt.addEventListener("mouseleave", handleMouseLeave);
      clipArt.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      if (clipArt) {
        clipArt.removeEventListener("mousemove", handleMouseMove);
        clipArt.removeEventListener("mouseleave", handleMouseLeave);
        clipArt.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  }, []);

  useEffect(() => {
    let clipArt = clipRef.current;
    const triggerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: clipArt,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        pin: false,
        markers: false,
      },
    });
    triggerTimeline
      .set(clipArt, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      })
      .to(clipArt, {
        clipPath: "polygon(14% 0, 87% 0, 100% 93%, 0 96%)",
      });

    return () => {
      triggerTimeline.scrollTrigger?.kill();
    };
  }, []);

  const getVideos = `/video/maincat_${currentCount}.mp4`;
  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center absolute z-50  h-screen bg-black w-full  ">
          <span
            ref={(el) => (loadingRef.current[0] = el)}
            className="block w-6 h-6 bg-yellow-400 mx-1 rounded-full"
          ></span>
          <span
            ref={(el) => (loadingRef.current[1] = el)}
            className="block w-6 h-6 bg-yellow-400 mx-1 rounded-full"
          ></span>
          <span
            ref={(el) => (loadingRef.current[2] = el)}
            className="block w-6 h-6 bg-yellow-400 mx-1 rounded-full"
          ></span>
          <span
            ref={(el) => (loadingRef.current[3] = el)}
            className="block w-6 h-6 bg-yellow-400 mx-1 rounded-full"
          ></span>
          <span
            ref={(el) => (loadingRef.current[4] = el)}
            className="block w-6 h-6 bg-yellow-400 mx-1 rounded-full"
          ></span>
        </div>
      )}

      <div id="Home" className="relative bg-slate-200 z-0 text-white  w-full  ">
        <div ref={clipRef} className="h-dvh relative overflow-hidden   ">
          {/*Background Video */}
          <div className="bg-red-500">
            <video
              ref={displayRef}
              key={displayCount}
              onCanPlayThrough={handleLoaded}
              className="w-full h-dvh object-cover absolute inset-0  "
              autoPlay
              loop
              muted
            >
              <source
                src={`/video/maincat_${displayCount}.mp4`}
                type="video/mp4"
              />
              Your browser does not support a video tag
            </video>
          </div>
          {/*Clickable Video*/}
          <div
            ref={currentRef}
            className={`   
       absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg  
        `}
          >
            <video
              key={currentCount}
              onClick={handleClick}
              className={`w-52 h-52 object-cover cursor-pointer 
             transition-all duration-300 rounded-lg `}
            >
              <source src={getVideos} type="video/mp4" />
              Your browser does not support a video tag
            </video>
          </div>
          {/*Text */}
          <div className="z-10 absolute mx-3 mt-16  ">
            <h1 className="font-HeadBold text-7xl lg:text-9xl ">INTO THE</h1>
            <p className="md:text-2xl mx-1 ">
              Prowl into the Meta Savannah
              <br /> Unchain the Beast Mode
            </p>
            <Button
              text="Watch Now"
              icons={<FaLocationArrow />}
              containerBtn="containerBtn"
              Click={() => alert("LINK UNAVALIABLE")}
            />
          </div>

          <div className="z-10 absolute bottom-0 right-0 mx-3 my-3  ">
            <h1 className="font-HeadBold text-white text-7xl lg:text-9xl  ">
              WILD{" "}
            </h1>
          </div>
        </div>
        <div className="-z-10 absolute bottom-0 right-0 mx-3 my-3 ">
          <h1 className="font-HeadBold text-black text-7xl md:text-7xl lg:text-9xl ">
            WILD
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
