import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const Rotation = ({
  children,
  className = "",
  perspective = 1000,
  rotationRange = 10,
  scale = 1.05,
  speed = 0.3,
  resetSpeed = 0.6,
  containerStyle = {},
  wrapperStyle = {},
}) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(wrapper, {
        duration: resetSpeed,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: "elastic.out(1.1, 0.4)",
      });
    };

    const handleMouseMove = (e) => {
      if (!isHovered) return;

      const bounds = container.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const rotateY = (mouseX / bounds.width - 0.5) * rotationRange;
      const rotateX = (0.5 - mouseY / bounds.height) * rotationRange;

      gsap.to(wrapper, {
        duration: speed,
        rotateX: rotateX,
        rotateY: rotateY,
        scale: scale,
        ease: "power2.out",
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, rotationRange, scale, speed, resetSpeed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        perspective: `${perspective}px`,
        ...containerStyle,
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: `transform ${speed}s ease-out `,
          ...wrapperStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Rotation;
