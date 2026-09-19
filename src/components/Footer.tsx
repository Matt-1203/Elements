import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#ffffff',
      },
    },
  });

  return (
    <footer style={{width: "100%", position: "fixed", bottom: 0, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", backgroundColor: "#000000", color: "#ffffff", boxSizing: "border-box", zIndex: 100000, border: "none", borderTop: "none", boxShadow: "none"}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#ffffff" }}>
          Elements//{romanize(new Date().getFullYear())}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <ThemeProvider theme={theme}>
          <IconButton color="primary"  onClick={() => window.open("https://www.instagram.com/matt._taylor._/")}>
            <InstagramIcon/>
          </IconButton>
          <IconButton color="primary" onClick={() => window.open("https://github.com/Matt-1203")}>
            <GitHubIcon/>
          </IconButton>
        </ThemeProvider>
      </div>
    </footer>
  );
};

export default DashboardFooter;