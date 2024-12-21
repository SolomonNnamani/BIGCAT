import React,{useEffect} from "react";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Feature from "./components/Feature.jsx";
import Story from "./components/Story.jsx";
import Footer from "./components/Footer.jsx";

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
  return (
    <div>
     <SetFavicon emoji="🦁" />
      <Navbar />
      <Header />
      <About />
      <Feature />
      <Story />
      <Footer />
    </div>
  );
};

export default App;
