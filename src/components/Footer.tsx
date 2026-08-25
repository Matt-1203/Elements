import LogoElements from "../assets/LogoElements.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./Footer.css"

const DashboardFooter = () => {
  const navigate = useNavigate();
  function romanize (num: number) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key    = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                  "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                  "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--) {
        const currentDigit = digits.pop() ?? "0";
        roman = (key[+currentDigit + (i * 10)] || "") + roman;
    }
    return Array(+digits.join("") + 1).join("M") + roman;
  }

  return (
    <footer style={{width: "100%", position: "fixed", bottom: 0, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", backgroundColor: "#000000", color: "#ffffff", boxSizing: "border-box", zIndex: 10000}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#ffffff" }}>
          Elements//{romanize(new Date().getFullYear())}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <section className = "footer-attribution">
          <Button size="small" sx={{color: "#fff", fontWeight: 500, p: 0, "&:hover": { color: "#aaa" },}}
          onClick={() => navigate("/attribution")}>
              ATTRIBUTION
          </Button>
        </section>
        <img
          src={LogoElements}
          alt="Logo"
          style={{ width: 40, height: "auto", display: "block" }}
        />
      </div>
    </footer>
  );
};

export default DashboardFooter;