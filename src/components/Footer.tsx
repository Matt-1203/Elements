import LogoElements from "../assets/LogoElements.png";

const DashboardFooter = () => {
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
    <footer style={{width: "100%", position: "fixed", bottom: 0, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", backgroundColor: "#000000", color: "#ffffff", boxSizing: "border-box", zIndex: 100000}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#ffffff" }}>
          Elements//{romanize(new Date().getFullYear())}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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