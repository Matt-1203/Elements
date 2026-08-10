import videoBg from "../../assets/VideoBackground.mp4";
import Logo from "../../assets/LogoElements.png";
import DashboardHeader from "../../components/Header";
import DashboardFooter from "../../components/Footer";
import "./HomePage.css"

const HomePage = () => {
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

      {/* Footer */}
      <footer className="footer">
        <DashboardFooter />
      </footer>
    </main>
  );
};

export default HomePage;