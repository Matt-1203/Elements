import React, { useEffect, useRef, useState } from 'react';
import "./ElementsPage.css"
import DashboardHeader from "../../components/Header";
import DashboardFooter from "../../components/Footer";
import { Box, Typography, Button } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import catOneImg from "../../assets/elementsImages/CatalogueOne.jpg";
import catTwoImg from "../../assets/elementsImages/CatalogueTwo.jpg";
import catThreeImg from "../../assets/elementsImages/CatalogueThree.jpg";
import ImgOne from "../../assets/elementsImages/One.jpg";
import ImgTwo from "../../assets/elementsImages/Two.jpg";
import ImgFour from "../../assets/elementsImages/Four.jpg";
import ImgFive from "../../assets/elementsImages/Five.jpg";
import ElementsOne from "../../utils/ElementsCatOne.pdf";

gsap.registerPlugin(ScrollTrigger);

// Updated interface to support editorial metadata
interface GalleryCard {
  title: string;
  description?: string;
  image: string;
  link?: string | { ElementsOne: string };
  year?: string;
  aspectRatio?: string;
}

// Interface definitions for structured data
interface PAspects {
  id: string;
  name: string;
  logoText: string;
}

// GALLERY_CARDS configured with editorial aspect ratios
const GALLERY_CARDS: GalleryCard[] = [
  {
    title: 'Catalogue One',
    description: "Discover the fundamentals of photography, camera systems, composition and how to build desired effects.",
    image: catOneImg,
    link: ElementsOne,
    year: 'MMXXV',
    aspectRatio: '16/9',
  },
  {
    title: 'Catalogue Two',
    description: 'Explorations into the animal kingdom in this catalogue on capturing the best wildlife photography.',
    image: catTwoImg,
    link: '',
    year: '',
    aspectRatio: '16/9',
  },
  {
    title: 'Catalogue Three',
    description: "Uncover light and shadow in this catalogue on abstract and minimalistic photography.",
    image: catThreeImg,
    link: '',
    year: '',
    aspectRatio: '16/9',
  }
];

const pAspects: PAspects[] = [
  { id: '1', name: 'Exposure', logoText: 'EXPOSURE' },
  { id: '2', name: 'Reciprocity', logoText: 'RECIPIROCITY' },
  { id: '3', name: 'Bokeh', logoText: 'BOKEH' },
  { id: '4', name: 'Selection', logoText: 'SELECTION' },
  { id: '5', name: 'Focus', logoText: 'FOCUS' },
  { id: '6', name: 'Metering', logoText: 'METERING' },
  { id: '7', name: 'Depth of Field', logoText: 'DEPTH OF FIELD' },
  { id: '8', name: 'Hyperfocal Distance', logoText: 'HYPERFOCAL DISTANCE' },
  { id: '9', name: 'Circle of Confusion', logoText: 'CIRCLE OF CONFUSION' },
  { id: '10', name: 'Colour Theory', logoText: 'COLOUR THEORY' },
  { id: '11', name: 'Subject', logoText: 'SUBJECT' },
  { id: '12', name: 'Composition', logoText: 'COMPOSITION' },
];

const ScrollSequence: React.FC = () => {
  // Refs for the section and canvas elements
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // Initialize GSAP ScrollTrigger and canvas rendering
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    // Preload images for the scroll sequence
    const images = Array.from({ length: 250 }, (_, index) => {
      const image = new Image();
      image.src = `/sequenceOne/${String(index + 1).padStart(4, '0')}.webp`;
      return image;
    });
    // Define a playhead object to track the current frame
    const playhead = { frame: 0 };
    // Render function to draw the current frame on the canvas
    const render = () => {
      const image = images[Math.round(playhead.frame)];
      if (!image?.complete) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    // Set canvas dimensions and initialize the first render
    canvas.width = 1920;
    canvas.height = 1080;
    images[0].onload = render;
    // GSAP context for scroll-triggered animation
    const contextScope = gsap.context(() => {
      gsap.timeline({
        // Configure ScrollTrigger for the scroll sequence
        scrollTrigger: {trigger: section, start: 'top 12%', end: '+=2500', scrub: 0.45, pin: true, anticipatePin: 0,}
          }).to(playhead, {frame: images.length - 1, ease: 'none', onUpdate: render});
    }, section);
    return () => contextScope.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scroll-sequence-section" aria-label="Scrolling photography sequence">
      <canvas ref={canvasRef} className="scroll-sequence-canvas" />
    </section>
  );
};

export const ElementsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lastWheelTime = useRef(0);

  // Function to select a card based on index and scroll it into view
  const selectCard = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, GALLERY_CARDS.length - 1));
    setActiveIndex(nextIndex);
    cardRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  // Handle scroll event to determine the closest card to the center of the viewport
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const closestIndex = cardRefs.current.reduce((closest, card, index) => {
      if (!card) return closest;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCard = cardRefs.current[closest];
      if (!closestCard) return index;
      const closestDistance = Math.abs(closestCard.offsetLeft + closestCard.offsetWidth / 2 - containerCenter);
      return Math.abs(cardCenter - containerCenter) < closestDistance ? index : closest;
    }, 0);
    setActiveIndex(closestIndex);
  };

  // Handle wheel event to navigate between cards based on scroll direction
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();

    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;
    lastWheelTime.current = now;
    selectCard(activeIndex + (e.deltaY > 0 ? 1 : -1));
  };

  return (
    <div>
        <DashboardHeader />
    <div className="portfolio-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img src={ImgOne} alt="Hero background" className="hero-background-img" />
        <div className="hero-title-container">
            <h1 className="hero-title">
                E
                <span className="hero-l-wrapper">
                <img 
                    src={ImgFour} 
                    alt="Eye closeup" 
                    className="hero-square-img" 
                />
                </span>
                <span className="hero-text-overlay">EMENTS</span>
            </h1>
        </div>

        <div className="hero-footer">
          <div className="hero-description">
            <p>A series of catalogues</p>
            <p>Scroll to explore</p>
          </div>
        </div>
      </section>

      <ScrollSequence />

      {/* About / "We Capture Meaning" Section */}
      <section id="about" className="about-section">
        <div className="section-tag">• ABOUT</div>
        <div className="about-grid">
          <div className="about-heading">
            <h2>PHOTOGRAPHY CONSISTS<br />OF COMPONENTS</h2>
            <div className="about-text-overlay">
              <p>
                Like building blocks, these core components are fundamental to both artistic and technical aspects of photography.  
                From exposure to focus systems. Macro to abstract. Both style and artistic preference require various factors to  
                to capture our ideas. However, understanding of these factors and their application can be challenging.
                Elements is a series of catalogues designed to help you understand core components across different photographic styles. 
                Through a combination of technical and artistic examples, the elements catalogues are designed to both present and
                explain key factors to develop your photography further.
              </p>
            </div>
          </div>
          <div className="about-content">
            <div className="about-image-card">
              <img src={ImgTwo} alt="Artistic mirror reflection" />
            </div>
          </div>
        </div>
      </section>

      {/* Clients Logo Grid */}
      <section className="clients-section">
        <div className="section-tag">• CATALOGUE CONTENTS</div>
          <div className="logos-grid">
            {pAspects.map((aspect) => (
              <div key={aspect.id} className="logo-item">
                {aspect.logoText}
              </div>
            ))}
          </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="section-tag">• STYLES</div>
        <div className="services-content">
          <div className="services-left-img">
            <img src={ImgFive} alt="Portrait Service"/>
            <div className="services-image-label">Portfolio &amp; Guide</div>
          </div>
          <div className="services-marquee" aria-label="Photography services">
            <div className="service-track service-track-forward">
              <div className="service-track-content">
                <span>Wildlife & Landscape // </span><span className="service-divider">//</span>
                <span>Nature //</span><span className="service-divider">//</span>
                <span>Abstract & Minimalism //</span><span className="service-divider">//</span>
                <span>Urban & Architecture</span><span className="service-divider">//</span>
                <span>Macro Photography</span><span className="service-divider">//</span>
              </div>
            </div>
            <div className="service-track service-track-reverse">
              <div className="service-track-content">
                <span>Wildlife & Landscape // </span><span className="service-divider">//</span>
                <span>Nature //</span><span className="service-divider">//</span>
                <span>Abstract & Minimalism //</span><span className="service-divider">//</span>
                <span>Urban & Architecture</span><span className="service-divider">//</span>
                <span>Macro Photography</span><span className="service-divider">//</span>
              </div>
            </div>
            <div className="services-image-label-mobile">Portfolio &amp; Guide</div>
            <div className="services-padding-content"></div>
            <div className="service-track service-track-forward">
              <div className="service-track-content">
                <span>Wildlife & Landscape // </span><span className="service-divider">//</span>
                <span>Nature //</span><span className="service-divider">//</span>
                <span>Abstract & Minimalism //</span><span className="service-divider">//</span>
                <span>Urban & Architecture</span><span className="service-divider">//</span>
                <span>Macro Photography</span><span className="service-divider">//</span>
              </div>
            </div>
            <div className="service-track service-track-reverse">
              <div className="service-track-content">
                <span>Wildlife & Landscape // </span><span className="service-divider">//</span>
                <span>Nature //</span><span className="service-divider">//</span>
                <span>Abstract & Minimalism //</span><span className="service-divider">//</span>
                <span>Urban & Architecture</span><span className="service-divider">//</span>
                <span>Macro Photography</span><span className="service-divider">//</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Section */}
      <Box id="portfolio" component="section" sx={{backgroundColor: "#000000", color: "#ffffff", py: 8, pb: { xs: 14, md: 12 }, px: { xs: 3, md: 8 }, borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", position: "relative", overflow: "hidden"}}>
        {/* Header */}
        <Box sx={{ mb: 6, display: "flex", alignItems: "center", gap: 1 }}>
           <div className="section-tag">• CATALOGUES</div>
        </Box>
        <h1>BROWSE THE ELEMENTS CATALOGUES BELOW</h1>

        {/* Horizontal Scroll Track */}
        <Box className="portfolio-carousel" role="region" aria-label="Portfolio projects">
          <Box ref={portfolioRef} onScroll={handleScroll} onWheel={handleWheel} className="portfolio-horizontal-scroll" sx={{display: "flex", alignItems: "flex-start", gap: { xs: 4, md: 8 }, overflowX: "auto", pb: 6, pt: 1}}>
          {GALLERY_CARDS.map((card, idx) => (
            <Box ref={(element: HTMLDivElement | null) => { cardRefs.current[idx] = element; }} key={idx} className={`portfolio-card ${idx === activeIndex ? 'is-active' : ''}`} onClick={() => selectCard(idx)} sx={{width: { xs: 220, sm: 280, md: 340 }, minWidth: { xs: 220, sm: 280, md: 340 }, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2}}>
              {/* Image Container */}
              <Box className="portfolio-card-image" sx={{width: "100%", height: { xs: 280, sm: 350, md: 410 }, overflow: "hidden", backgroundColor: "#111"}}>
                <Box component="img" src={card.image} alt={card.title} sx={{width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%) brightness(0.9)"}}/>
              </Box>

              {/* Title and link */}
              <Box sx={{pt: 1}}>
                <Typography variant="h6" sx={{fontFamily: "Inter, sans-serif", fontSize: "1.1rem", fontWeight: 400, color: "#ffffff", lineHeight: 1.2}}>
                  {card.title}
                </Typography>
                <Typography variant="caption" sx={{fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "#666666", display: "block", mt: 0.5 }}>
                  {card.year}
                </Typography>
                {card.link && card.link !== "" && (
                <Button href={typeof card.link === "string" ? card.link : card.link?.ElementsOne ?? "#"} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: "#fff", fontWeight: 700, p: 0, "&:hover": { color: "#aaa" } }}>
                    View More →
                </Button>
                )}
                {card.link === "" && (
                <Typography variant="body2" sx={{ color: "#aaa", fontStyle: "italic" }}>
                    COMING SOON
                </Typography>
                )}
              </Box>
            </Box>
          ))}
          </Box>
        </Box>

        <Box className="portfolio-pagination" component="nav" aria-label="Portfolio items" sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mt: 2 }}>
          {GALLERY_CARDS.map((_, idx) => (
            <button key={idx} className={idx === activeIndex ? 'is-active' : ''} type="button" onClick={() => selectCard(idx)} aria-label={`Go to portfolio item ${idx + 1}`} aria-current={idx === activeIndex ? 'true' : undefined} />
          ))}
        </Box>
      </Box>
    </div>
        <DashboardFooter />
    </div>
  );
};

export default ElementsPage;