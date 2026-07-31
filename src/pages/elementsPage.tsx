import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {Typography, Box, Container, Card, CardContent, CardMedia, CardActions, Button, Link, CircularProgress} from "@mui/material";
import Grid from "@mui/material/Grid";
import Logo from "../assets/LogoElements.png";
import catOneImg from "../assets/CatalogueOne.jpg";
import catTwoImg from "../assets/CatalogueTwo.jpg";
import catThreeImg from "../assets/CatalogueThree.jpg";
import DashboardHeader from "../components/Header";
import DashboardFooter from "../components/Footer";
import ElementsOne from "../utils/ElementsCatOne.pdf";

gsap.registerPlugin(ScrollTrigger);

interface SequenceConfig {
  urls: string[];
  canvas: HTMLCanvasElement;
  scrollTrigger: object;
  onTimelineCreated?: (tl: gsap.core.Timeline) => void;
  onProgress?: (loadedCount: number) => void;
}

const GALLERY_CARDS = [
  {
    title: "CATALOGUE ONE",
    image: catOneImg,
    description:
      "Discover the fundamentals of photography, camera systems, composition and how to build desired effects.",
    link: { ElementsOne },
  },
  {
    title: "CATALOGUE TWO",
    image: catTwoImg,
    description:
      "Understand the technical aspects of macro photography and its creative possibilities.",
    link: "",
  },
  {
    title: "CATALOGUE THREE",
    image: catThreeImg,
    description:
      "Uncover light and shadow in this catalogue on abstract and minimalistic photography.",
    link: "",
  },
];

// Returns a Promise that resolves when all images in the sequence are loaded
function initImageSequence(config: SequenceConfig): Promise<void> {
  return new Promise((resolve) => {
    const playhead = { frame: 0 };
    const ctx = config.canvas.getContext("2d")!;
    const images = config.urls.map(() => new Image());
    // Function to render the current frame on the canvas
    function render() {
      const image = images[Math.round(playhead.frame)];
      if (!image || !image.complete) return;
      // Clear the canvas and draw the current frame
      ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);
      ctx.drawImage(image, 0, 0, config.canvas.width, config.canvas.height);
    }

    let loadedCounter = 0;
    const imagePromises = images.map(
      (img, index) =>
        new Promise<void>((res) => {
          img.onload = () => {
            loadedCounter++;
            if (config.onProgress) config.onProgress(loadedCounter);
            res(); // Resolve when the image is loaded
          };
          img.onerror = () => {
            loadedCounter++;
            if (config.onProgress) config.onProgress(loadedCounter);
            res(); // Resolve even if an image fails to load
          };
          img.src = config.urls[index];
        })
    );

    Promise.all(imagePromises).then(() => {
      render();
      // Create a GSAP timeline that updates the playhead based on scroll position
      const tl = gsap.timeline({
        scrollTrigger: config.scrollTrigger,
      });
      // Animate the playhead from 0 to the last frame of the sequence
      tl.to(
        playhead,
        {
          frame: images.length - 1,
          ease: "none",
          onUpdate: render,
        },
        0
      );
      // If a callback for timeline creation is provided, call it with the created timeline
      if (config.onTimelineCreated) {
        config.onTimelineCreated(tl);
      }
      // Resolve the promise after the timeline is created and images are loaded
      resolve();
    });
  });
}

function ElementsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const anim2SectionRef = useRef<HTMLDivElement>(null);
  const anim2CanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Create a GSAP context to manage animations and ensure cleanup
    const ctx = gsap.context(() => {
      const heroUrls = Array.from(
        { length: 140 },
        (_, index) => `/sequenceOne/${String(index + 1).padStart(4, "0")}.webp`
      );
      // Generate URLs for the second sequence (140 to 360)
      const seq2Urls = Array.from(
        { length: 221 },
        (_, index) => `/sequenceTwo/${String(index + 140).padStart(4, "0")}.webp`
      );
      // Calculate total images to load for progress tracking
      const totalImages = heroUrls.length + seq2Urls.length;
      let totalLoaded = 0;
      // Function to handle progress updates
      const handleProgress = () => {
        totalLoaded++;
        setProgress(Math.round((totalLoaded / totalImages) * 100));
      };
      // Initialize the first sequence only if the canvas and section refs are available
      const p1 = heroCanvasRef.current && heroSectionRef.current
        ? (heroCanvasRef.current.width = 1920,
           heroCanvasRef.current.height = 1080,
           initImageSequence({urls: heroUrls, canvas: heroCanvasRef.current,
             scrollTrigger: {
               trigger: heroSectionRef.current,
               start: "top top",
               end: "+=3000",
               scrub: true,
               pin: true,
               anticipatePin: 1,
               refreshPriority: 2,
             },
             // Animate the logo to fade out and move up as the first sequence progresses
             onTimelineCreated: (tl) => {
               if (logoRef.current) {
                 tl.to(
                   logoRef.current,
                   { opacity: 0, y: -50, duration: 0.25, ease: "power1.out" },
                   0
                 );
               }
             },
             onProgress: handleProgress,
           }))
        : Promise.resolve();
      // Initialize the second sequence only if the canvas and section refs are available
      const p2 = anim2CanvasRef.current && anim2SectionRef.current
        ? (anim2CanvasRef.current.width = 1920,
           anim2CanvasRef.current.height = 1080,
           initImageSequence({urls: seq2Urls,canvas: anim2CanvasRef.current,
             scrollTrigger: {
               trigger: anim2SectionRef.current,
               start: "top top",
               end: "+=6000",
               scrub: true,
               pin: true,
               anticipatePin: 1,
               refreshPriority: 1,
             },
             onProgress: handleProgress,
           }))
        : Promise.resolve();

      // Wait until ALL images across both sequences are loaded
      Promise.all([p1, p2]).then(() => {
        setIsLoading(false);
        // Refresh GSAP ScrollTrigger after loader disappears
        setTimeout(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }, 100);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* FULLSCREEN PRELOADER */}
      {isLoading && (
        <Box
          sx={{position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", gap: 2}}
        >
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}>
            LOADING ELEMENTS... {progress}%
          </Typography>
        </Box>
      )}

      {/* MAIN CONTENT (Hidden until images load) */}
      <Box
        component="main"
        sx={{opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease-in-out", position: "relative", color: "#fff", minHeight: "100vh", backgroundColor: "#181818"}}
      >
        <DashboardHeader />

        {/* SECTION 1 */}
        <Box
          ref={heroSectionRef}
          sx={{position: "relative", width: "100%", height: "100vh", zIndex: 1}}
        >
          <Box
            ref={logoRef}
            sx={{position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", zIndex: 10, textAlign: "center", pointerEvents: "none"}}
          >
            <Typography
              variant="h2"
              sx={{fontFamily: "Raleway, sans-serif", fontWeight: 900, letterSpacing: 2,color: "#ffffff", textTransform: "uppercase"}}
            >
              <img src={Logo} alt="Your Logo" style={{ width: "50%", height: "auto"}} />
            </Typography>
          </Box>

          <canvas
            ref={heroCanvasRef}
            style={{width: "100vw", height: "100vh", objectFit: "cover", display: "block"}}
          />
        </Box>

        {/* SECTION 2 */}
        <Box
          sx={{position: "relative", zIndex: 2, py: 12, px: 3, backgroundColor: "#0a0a0a"}}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{fontFamily: "Raleway, sans-serif", fontWeight: 800, textAlign: "center", color: "#ffffff", letterSpacing: -0.5, mb: 8}}
            >
              PHOTOGRAPHY CONSISTS OF CORE ELEMENTS.
            </Typography>

            <Grid container spacing={4}>
              {[
                {
                  title: "SYSTEMS//COMPONENTS",
                  description:
                    "The technical components we alter to achieved desired artistic effects.",
                },
                {
                  title: "COMPOSITION//SUBJECT",
                  description:
                    "The objects of interest within the frame providing tone and message.",
                },
                {
                  title: "ARTISTIC//COLOUR",
                  description:
                    "The vibrancy, detail and emotional impact of our pictures.",
                },
              ].map((item, i) => (
                <Grid key={i} size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{backgroundColor: "#181818", color: "#fff", border: "1px solid #333"}}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#aaa", lineHeight: 1.6 }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* SECTION 3 */}
        <Box
          ref={anim2SectionRef}
          sx={{position: "relative", width: "100%", height: "100vh", zIndex: 1}}
        >
          <canvas
            ref={anim2CanvasRef}
            style={{width: "100vw", height: "100vh", objectFit: "cover", display: "block"}}
          />
        </Box>

        {/* SECTION 4 */}
        <Box
          sx={{position: "relative", zIndex: 2, py: 12, backgroundColor: "#0a0a0a"}}
        >
          <Container maxWidth="lg" sx={{ mb: 10 }}>
            <Typography
              variant="h4"
              sx={{fontFamily: "Raleway, sans-serif",  fontWeight: 800, textAlign: "center", color: "#ffffff", letterSpacing: -0.5, mb: 8}}
            >
              APPLICATION OF THESE ELEMENTS CAN BE CHALLENGING.
            </Typography>
            <Card
              sx={{backgroundColor: "#181818", color: "#fff", border: "1px solid #333"}}
            >
              <CardContent sx={{ p: 5, textAlign: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  ONLY ONE PLACE TO MASTER THEM ALL
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#aaa", lineHeight: 1.8, maxWidth: "800px", mx: "auto" }}
                >
                  Elements is a series of catalogues designed to help you understand core components across different photographic styles.
                  Through a combination of technical and artistic examples, you will learn how to manipulate the elements of photography to achieve your desired results.
                </Typography>
              </CardContent>
            </Card>
          </Container>

          {/* Horizontal Scroll Gallery */}
          <Box sx={{ px: { xs: 2, md: 6 } }}>
            <Typography variant="h6"
              sx={{fontFamily: "Raleway, sans-serif", fontWeight: 700, mb: 3, ml: 1, color: "#888", textTransform: "uppercase", letterSpacing: 1.5,}}
            >
              VIEW THE ELEMENTS CATALOGUES
            </Typography>

            <Box
              sx={{display: "flex", gap: 3, overflowX: "auto", pb: 3, pt: 1, "&::-webkit-scrollbar": { height: "8px" }, "&::-webkit-scrollbar-track": { backgroundColor: "#111" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "#333", borderRadius: "4px" }, "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" }}}
            >
              {GALLERY_CARDS.map((card, idx) => (
                <Card key={idx}
                  sx={{minWidth: { xs: 280, sm: 320, md: 360 }, maxWidth: { xs: 280, sm: 320, md: 360 }, flexShrink: 0, backgroundColor: "#181818", color: "#fff", border: "1px solid #333", display: "flex", flexDirection: "column", justify: "space-between"}}
                >
                  <CardMedia component="img" height="200" image={card.image} alt={card.title} sx={{ filter: "brightness(0.9)" }}/>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", lineHeight: 1.6 }}>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
                    {card.link && card.link !== "" && (
                      <Button component={Link} href={typeof card.link === "string" ? card.link : (card.link as any).ElementsOne} target="_blank" rel="noopener noreferrer" size="small"
                        sx={{ color: "#fff", fontWeight: 700, p: 0, "&:hover": { color: "#aaa" } }}
                      >
                        View More →
                      </Button>
                    )}
                    {card.link === "" && (
                      <Typography variant="body2" sx={{ color: "#aaa", fontStyle: "italic" }}>
                        COMING SOON
                      </Typography>
                    )}
                  </CardActions>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
        <DashboardFooter />
      </Box>
    </>
  );
}

export default ElementsPage;