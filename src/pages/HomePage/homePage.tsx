import videoBg from '../assets/VideoBackground.mp4';
import Logo from "../assets/LogoElements.png";
import DashboardHeader from "../../components/Header";
import DashboardFooter from "../../components/Footer";

const HomePage = () => {
  return (
    <div className="main" style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div className="overlay"
        style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1,}}
      />

      {/*Background Video */}
      <video src={videoBg} autoPlay loop muted playsInline
        style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0,}}
      />

      {/*Header*/}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}>
        <DashboardHeader />
      </div>

      {/*Centered Content */}
      <div className="content"
        style={{position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#ffffff", textAlign: "center"}}
      >
        <img src={Logo} alt="Your Logo" style={{ width: "8%", height: "auto", padding: "50px" }} />
        <h1 style={{ fontSize: "3rem", margin: 0 }}>PHOTOGRAPHY//ELEMENTS</h1>
        <p style={{ fontSize: "1rem", fontWeight: "bold" }}>Matthew Taylor</p>
      </div>
      
      {/*Footer*/}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 10 }}>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default HomePage;