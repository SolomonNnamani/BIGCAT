import React,{useEffect, useRef, useState} from "react";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Feature from "./components/Feature.jsx";
import Story from "./components/Story.jsx";
import Footer from "./components/Footer.jsx";
import gsap from 'gsap'

const SetFavicon = ({ emoji }) => {
  useEffect(() => {
    const favicon = document.createElement('link');
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.font = '28px serif';
    ctx.fillText(emoji, 2, 24);
    
    favicon.rel = 'icon';
    favicon.href = canvas.toDataURL();
    
    document.head.appendChild(favicon);
  }, [emoji]);

  return null;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef([]);


   //Loading Animation
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


  return (
    <div  className={loading ? 'h-screen overflow-hidden': 'overflow-visible'}   >
       {loading && (
        <div>
        <div className="flex justify-center items-center absolute z-50 inset-0   bg-black w-full  ">
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
        <p className="text-white absolute z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 mt-10 italic text-sm ">
        Loading might take a while... </p>
        </div>
      )}
      <div  >
     <SetFavicon emoji="🦁" />
      <Navbar />
      <Header Click={handleLoaded}  />
      <About />
      <Feature />
      <Story />
      <Footer />
      </div>
    </div>
  );
};

export default App;
