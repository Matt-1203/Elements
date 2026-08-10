import videoBg from "../../assets/VideoBackground.mp4";
import Logo from "../../assets/LogoElements.png";
import DashboardHeader from "../../components/Header";
import DashboardFooter from "../../components/Footer";
import "./HomePage.css"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <main className="main">
      {/* Background */}
      <video className="backgroundVideo" src={videoBg} autoPlay loop muted playsInline/>
      <div className="overlay" />

      {/* Header */}
      <header className="header">
        <DashboardHeader />
      </header>

      {/* Main content */}
      <section className="content">
        <img src={Logo} alt="Photography Elements"className="logo"/>
        <h1>PHOTOGRAPHY//ELEMENTS</h1>
        <p>Matthew Taylor</p>
      </section>

      <section className="attribution">
        <Button className="button" size="small" sx={{color: "#fff", "&:hover": { color: "#aaa" },}}
        onClick={() => navigate("/attribution")}>
            VIEW ATTRIBUTION
        </Button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <DashboardFooter />
      </footer>
    </main>
  );
};

export default HomePage;