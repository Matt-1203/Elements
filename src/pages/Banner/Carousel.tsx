import HeroBanner from "./HeroBanner";
import DashboardHeader from "../../components/Header";
import DashboardFooter from "../../components/Footer";

export default function Carousel() {
  return (
    <div className="App">
      <DashboardHeader />
      <div style = {{paddingTop: "4rem"}}></div>
      <HeroBanner />
      <DashboardFooter />
    </div>
  );
}
