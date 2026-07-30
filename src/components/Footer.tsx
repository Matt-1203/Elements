import LogoElements from "../assets/logoElements.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const DashboardFooter = () => {
  const navigate = useNavigate();

  return (
    <footer
      style={{width: "100%", position: "fixed", bottom: 0, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", backgroundColor: "#000000", color: "#ffffff", boxSizing: "border-box", zIndex: 1000}}
    >
      {/*Text*/}
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#ffffff" }}>
          Elements Photography//Season {new Date().getFullYear()}
        </span>
      </div>

      {/*Logo*/}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Button size="small" sx={{color: "#fff", fontWeight: 500, p: 0, "&:hover": { color: "#aaa" },}}
        onClick={() => navigate("/attribution")}>
            VIEW ATTRIBUTION
        </Button>
        <img
          src={LogoElements}
          alt="Logo"
          style={{ width: "32px", height: "auto", display: "block" }}
        />
      </div>
    </footer>
  );
};

export default DashboardFooter;