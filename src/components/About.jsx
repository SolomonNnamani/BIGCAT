import React, { useRef, useEffect } from "react";
import leopard from "/image/leopard.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const wordsRef = useRef([]);
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const divImageRef = useRef(null);

  //Word animation
  useEffect(() => {
    gsap.fromTo(
      wordsRef.current,
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
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
          markers: false,
        },
      }
    );
  }, []);

  //Animation for Image increase
  useEffect(() => {
    const imageContainer = imageContainerRef.current;
    const divImage = divImageRef.current;

    const zoomOutAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onToggle: ({ isActive }) => {
          if (isActive) {
            const triggerRect = imageContainer.getBoundingClientRect();

            // Ensure precise positioning
            imageContainer.style.position = "fixed";
            imageContainer.style.top = `${-triggerRect.top}px`;
            imageContainer.style.left = `${-triggerRect.left}px`;
            imageContainer.style.width = "100vw";
            imageContainer.style.height = "100vh";

            imageContainer.classList.add("fixed");
          } else {
            // Reset all inline styles
            imageContainer.style.position = "";
            imageContainer.style.top = "";
            imageContainer.style.left = "";
            imageContainer.style.width = "";
            imageContainer.style.height = "";

            imageContainer.classList.remove("fixed");
          }
        },
      },
    });
    zoomOutAnimation.to(divImage, {
      scale: 1,
      width: "100%",
      height: "100%",
      paddingTop: 0,

      ease: "none",
    });

    return () => {
      zoomOutAnimation.kill();
    };
  }, []);

  return (
    //About Container
    <div ref={sectionRef} id="About" className=" relative  mt-20  ">
      <div className="overflow-hidden">
        {/*Words */}
        <div className=" flex flex-wrap justify-center bg ">
          {`STEP INTO THE KINGDOM OF THE BIG CATS`
            .split(" ")
            .map((word, index) => (
              <React.Fragment key={index}>
                <h1
                  ref={(el) => (wordsRef.current[index] = el)}
                  className="font-HeadBold text-5xl lg:text-8xl font-bold
           mx-2 "
                >
                  {word}
                </h1>
                {word === "KINGDOM" && <div className="w-full"></div>}
              </React.Fragment>
            ))}
        </div>
      </div>

      {/*Image and text container */}
      <div className="wrapper relative h-[200vh]  z-0 ">
        <div
          ref={imageContainerRef}
          className="sticky top-0 flex justify-center  h-screen w-full overflow-hidden  "
        >
          <div
            ref={divImageRef}
            className="absolute  pt-5"
            style={{
              width: "18rem",
              height: "24rem",
            }}
          >
            <img
              src={leopard}
              alt="leopard"
              style={{
                width: "100%",
                height: "100%",
                objectPosition: "20% 25%",
                objectFit: "cover",
              }}
            />
          </div>

          <div
            className="lg:text-2xl "
            style={{ marginTop: "11cm", textAlign: "center" }}
          >
            <p>
              Explore the fascinating world of these regal creatures,
              <br />
              from the grassland to the forests, and discover there stories{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
