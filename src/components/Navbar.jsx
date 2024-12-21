import React, { useRef, useEffect, useState } from "react";
import { GiLion } from "react-icons/gi";
import gsap from "gsap";

const sideBar = ["Home", "About", "Features","Story"];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false)
  const [audioBlocked, setAudioBlocked] = useState(true)
  const spansRef = useRef([]);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const spanTimelineRef = useRef(null)

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

  useEffect(()=> {
    const FirstIneraction = () => {
      if(!hasInteracted && audioRef.current && spanTimelineRef.current){
        setHasInteracted(true)

        audioRef.current.play()
        .then(() => {
          setAudioBlocked(false);
          spanTimelineRef.current.play()
        })
        .catch((error) => {
          console.log('Audio Playback failed:', error);
          setAudioBlocked(true);
          spanTimelineRef.current.pause()
        });

        cleanup()
      }
    }

    document.addEventListener('click', FirstIneraction);
    document.addEventListener('touchstart', FirstIneraction);
    document.addEventListener('keydown', FirstIneraction);
    
    

    const cleanup = () => {
      document.removeEventListener('click', FirstIneraction);
      document.removeEventListener('touchstart', FirstIneraction);
      document.removeEventListener('keydown', FirstIneraction);
      

    }

    return cleanup;

  },[hasInteracted])

  return (
    <div
      className={`flex  justify-between fixed
        w-full text-white  px-5 top-1 transition-all duration-300
        ease-in-out 
         ${
           isAtTop
             ? "bg-transparent"
             : isVisible
             ? "bg-black translate-y-0"
             : "-translate-y-full"
         }
        `}
    >
      <div>
        <GiLion className=" text-6xl text-yellow-300 " />
      </div>

      <div className="flex items-center justify-between  ">
        <div className=" lg:flex  gap-3  justify-end  hidden  ">
          {sideBar.map((link) => (
            <div key={link} className=" flex justify-between mx-10 ">
              <a
                href={`#${link}`}
                className="text-xl px-4 py-2 hover:underline transition duration-300 "
              >
                {" "}
                {link}{" "}
              </a>
            </div>
          ))}
        </div>

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

          <audio 
          ref={audioRef}
           loop
           preload = "auto"
           >
            <source src="/audio/ThemeSong.mp3" type="audio/mpeg" />
            <source src="/audio/ThemeSong.mp3" type="audio/ogg" />
            Your Browser does not Support
          </audio>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
