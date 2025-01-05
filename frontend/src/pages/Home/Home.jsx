import React from "react";
import HomeMobile from "./mobile/Home";
import HomeDesktop from "./web/Home";

const Home = ({ isMobile }) => {
  return isMobile ? <HomeMobile /> : <HomeDesktop />;
};

export default Home;
