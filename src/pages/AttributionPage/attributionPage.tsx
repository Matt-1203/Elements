import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import DashboardHeader from "../../components/Header";
import DashboardFooter from "../../components/Footer";

function AttributionPage() {
    return (
    <div>
        <DashboardHeader />
        <Box sx={{
          position: "relative",
          zIndex: 2,
          py: 19,
          backgroundColor: "#181818",
        }}
        >
        <Container maxWidth="lg" sx={{ mb: 10 }}>
          {/* Single Box (Full Width) */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 800,
              textAlign: "center",
              color: "#ffffff",
              letterSpacing: -0.5,
              mb: 8,
            }}
          >
            Attribution & Use of Photography and Elements.
          </Typography>
          <Card
            sx={{
              backgroundColor: "#181818",
              color: "#fff",
              border: "1px solid #333",
            }}
          >
            <CardContent sx={{ p: 5, textAlign: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                You are free to:
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#aaa", lineHeight: 1.8, maxWidth: "800px", mx: "auto", whiteSpace: 'pre-line' }}
              >
                {"● Share - copy and redistribute the material in any medium or format.\n● Adapt - remix, transform, and build upon the material."}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, paddingTop: 4 }}>
                Under the following terms:
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#aaa", lineHeight: 1.8, maxWidth: "800px", mx: "auto", whiteSpace: 'pre-line' }}
              >
                {"● Attribution - You must give appropriate credit for use of material."}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, paddingTop: 4 }}>
                In creation of this website:
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#aaa", lineHeight: 1.8, maxWidth: "800px", mx: "auto"}}
              >
                All photography and elements used in this website are either created by Matthew Taylor or sourced from free-to-use resources. All content is used in accordance with the respective licenses. 
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <DashboardFooter />
    </div>
    );
};

export default AttributionPage;