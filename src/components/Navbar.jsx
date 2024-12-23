import React, { useRef, useEffect, useState } from "react";
import { GiLion } from "react-icons/gi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import gsap from "gsap";

const sideBar = ["Home", "About", "Features", "Story"];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const spansRef = useRef([]);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const spanTimelineRef = useRef(null);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  //Hide, show navbar upon scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY === 0);
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  //Toggle bar
  const showSideBar = () => {
    setButtonActive((prevButtonActive) => !prevButtonActive);
  };

  //hide bar upon click
  const handleLinkClick = () => {
    setButtonActive(false);
  };

  //Music Player animation
  useEffect(() => {
    gsap.set(containerRef.current, {
      rotation: 180,
    });
  }, []);
  useEffect(() => {
    const span1 = spansRef.current[0];
    const span2 = spansRef.current[1];
    const span3 = spansRef.current[2];
    const span4 = spansRef.current[3];

    spanTimelineRef.current = gsap.timeline({ paused: true });
    spanTimelineRef.current
      .to(span1, {
        height: "20px",
        repeat: -1,
        duration: 0.3,
        yoyo: true,
      })
      .to(span2, {
        height: "20px",
        repeat: -1,
        duration: 0.3,
        yoyo: true,
      })
      .to(span3, {
        height: "20px",
        repeat: -1,
        duration: 0.3,
        yoyo: true,
      })
      .to(span4, {
        height: "4px",
        repeat: -1,
        duration: 0.3,
        yoyo: true,
      });

    const audio = audioRef.current;

    const playAnimation = () => {
      if (spanTimelineRef.current.paused() && audio.paused) {
        spanTimelineRef.current.play();
        audio.play();
      } else {
        spanTimelineRef.current.pause();
        audio.pause();
      }
    };

    let container = containerRef.current;

    if (container) {
      container.addEventListener("click", playAnimation);
    }

    return () => {
      if (container) {
        container.removeEventListener("click", playAnimation);
      }
    };
  }, []);

  //Click anywhere for music play
  useEffect(() => {
    const FirstIneraction = () => {
      if (!hasInteracted && audioRef.current && spanTimelineRef.current) {
        setHasInteracted(true);

        audioRef.current
          .play()
          .then(() => {
            spanTimelineRef.current.play();
          })
          .catch((error) => {
            console.log("Audio Playback failed:", error);
            spanTimelineRef.current.pause();
          });

        cleanup();
      }
    };

    document.addEventListener("click", FirstIneraction);
    document.addEventListener("touchstart", FirstIneraction);
    document.addEventListener("keydown", FirstIneraction);

    const cleanup = () => {
      document.removeEventListener("click", FirstIneraction);
      document.removeEventListener("touchstart", FirstIneraction);
      document.removeEventListener("keydown", FirstIneraction);
    };

    return cleanup;
  }, [hasInteracted]);

  return (
    /*Navbar Container */
    <div className="relative">
      <div
        ref={sidebarRef}
        className={`fixed text-white bg-yellow-500 right-0 ${
          buttonActive ? "show" : "hide"
        }
      transition-all ease-linear duration-300 w-full h-full px-5  
      lg:right-0  lg:flex lg:justify-between lg:h-20 lg:py-5 
       ${
         isAtTop
           ? "lg:bg-transparent"
           : isVisible
           ? "lg:bg-black translate-y-0"
           : "lg:-translate-y-full"
       }
      `}
      >
        {/*list Link  */}
        <div className="mb-10 lg:mb-0 ">
          <GiLion className=" text-6xl lg:text-yellow-300 text-black lg: " />
        </div>

        <div className=" flex flex-col  gap-16 lg:flex-row lg:gap-8 ">
          <div className="  flex flex-col gap-16 justify-end lg:flex-row  lg:gap-8  ">
            {sideBar.map((link) => (
              <div key={link} className="   ">
                <a
                  href={`#${link}`}
                  onClick={handleLinkClick}
                  className="text-2xl font-HeadBold  py-2 hover:underline
                 transition duration-300  block "
                >
                  {" "}
                  {link}{" "}
                </a>
              </div>
            ))}
          </div>

          {/*Music bar Animation */}
          <div
            ref={containerRef}
            className="flex justify-center  border-solid
         border-slate-500 gap-1  cursor-pointer 
           w-7  py-1 min-h-7 "
          >
            <span
              ref={(el) => (spansRef.current[0] = el)}
              className="block bg-white w-1 h-2 rounded-xl "
            ></span>
            <span
              ref={(el) => (spansRef.current[1] = el)}
              className="block bg-white w-1 h-3 rounded-xl  "
            ></span>
            <span
              ref={(el) => (spansRef.current[2] = el)}
              className="block bg-white w-1 h-1 rounded-xl  "
            ></span>
            <span
              ref={(el) => (spansRef.current[3] = el)}
              className="block bg-white w-1 h-5  rounded-xl  "
            ></span>

            <audio ref={audioRef} loop preload="auto">
              <source src="/audio/ThemeSong.mp3" type="audio/mpeg" />
              <source src="/audio/ThemeSong.mp3" type="audio/ogg" />
              Your Browser does not Support
            </audio>
          </div>
        </div>
      </div>
      <button
        ref={buttonRef}
        onClick={showSideBar}
        className=" text-black lg:pointer-events-none lg:hidden button text-4xl  "
      >
        {buttonActive ? (
          <MdCancel />
        ) : (
          <BsThreeDotsVertical className="text-yellow-500" />
        )}
      </button>
    </div>
  );
};

export default Navbar;
