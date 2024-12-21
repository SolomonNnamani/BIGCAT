import React, { useRef, useEffect } from "react";
import Rotation from './Rotation.jsx'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const storyRef = useRef([]);
  const storyContainerRef = useRef(null);
  //const tigerContainerRef = useRef(null)
  //const tigerRef = useRef(null);
  //const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      storyRef.current,
      {
        x: 200,
        y: 200,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: {
          amount: 1,
        },
        scrollTrigger: {
          trigger: storyContainerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
          markers: false,
        },
      }
    );
  }, []);

 
  return (
    <div
    id="Story"
      ref={storyContainerRef}
      className=" bg-black py-20 text-white overflow-hidden"
    >

        <div className="flex justify-center  ">
            <p>BIG CAT ODYSSEYS</p>
        </div><br/>
      <div className=" flex flex-wrap justify-center bg ">
        
        {`A JOURNEY INTO THE UNTAMED`.split(" ").map((word, index) => (
          <React.Fragment key={index}>
            <h1
              ref={(el) => (storyRef.current[index] = el)}
              className="font-HeadBold text-5xl lg:text-8xl font-bold
              mx-2 "
            >
              {word}
            </h1>
            {(word === "INTO" || word === "THE") && (
              <div className="w-full"></div>
            )}
          </React.Fragment>
        ))}
      </div>

       <Rotation  >
      <div
     /* ref={tigerContainerRef} */ 
      className="flex justify-center items-center px-10 pt-10  " >
        <div
       /* ref={tigerRef} */
        className="w-97 h-96 rounded-lg  lg:h-96 lg:w-98 ">
           
          <img
           src="/image/tiger.jpg" 
           alt="tiger"
           className="w-full h-full object-cover rounded-lg " />
         
        </div>
      </div>
      </Rotation>
    
    </div>
  );
};

export default Story;
