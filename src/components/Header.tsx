import { Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import LogoElements from "../assets/LogoElements.png";

const navItems = [
    { label: "HOME", path: "/" },
    { label: "GALLERY", path: "/gallery" },
    { label: "ELEMENTS", path: "/elements" },
];

const DashboardHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box component="header"
            sx={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", backgroundColor: "#000000", position: "fixed",  top: 0, left: 0, width: "100%", zIndex: 1000, boxSizing: "border-box"}}
            >
            <Box sx={{width: 40, height: "auto", display: "flex", alignItems: "center"}}>
                <img src={LogoElements} alt="Logo" style={{ width: "100%", height: "auto", display: "block" }} />
            </Box>
        <Box component="nav" sx={{ display: "flex", gap: "10" }}>
            {navItems.map((item) => {
                var current = location.pathname.toLowerCase();
                var target = item.path.toLowerCase();
                if (current === "/") {
                    current = "/home";
                }
                if  (target === "/") {
                    target = "/home";
                }
                const isActive = current.includes(target);
                return (
                    <Typography key={item.label} component="button" onClick={() => navigate(item.path)} sx={{ all: 'unset', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, color: isActive? "white" : "#888", borderBottom: isActive? "2px solid white" : "none", pb: 0.5, transition: "0.2s, border-bottom 0.3s", padding: "0.5rem", '&:hover': { color: "white", borderBottom: "2px solid white" } }}>
                        {item.label}
                    </Typography>
                );
            })}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "2" }}>
        </Box>
    </Box>
    );
};

export default DashboardHeader;
