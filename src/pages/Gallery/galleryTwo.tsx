import './gallery.css';
import { Box, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import DashboardHeader from "../../components/Header";
import DashboardFooter from "../../components/Footer";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import One from "../../assets/collectionTwoGallery/1.jpg"
import Two from "../../assets/collectionTwoGallery/2.jpg"
import Three from "../../assets/collectionTwoGallery/3.jpg"
import Four from "../../assets/collectionTwoGallery/4.jpg"
import Five from "../../assets/collectionTwoGallery/5.jpg"
import Six from "../../assets/collectionTwoGallery/6.jpg"
import Seven from "../../assets/collectionTwoGallery/7.jpg"
import Eight from "../../assets/collectionTwoGallery/8.jpg"
import Nine from "../../assets/collectionTwoGallery/9.jpg"
import Ten from "../../assets/collectionTwoGallery/10.jpg"
import Eleven from "../../assets/collectionTwoGallery/11.jpg"

interface GalleryCard {
  title: string;
  image: string;
}

const GALLERY_CARDS: GalleryCard[] = [
  {
    title: 'Flux',
    image: One,
  },
  {
    title: 'High up in the Mountains',
    image: Two,
  },
  {
    title: 'Head First',
    image: Three,
  },
   {
    title: 'Feels Like Im Waiting',
    image: Four,
  },
   {
    title: 'Spectrum',
    image: Five,
  },
   {
    title: 'Moor the Merrier',
    image: Six,
  },
  {
    title: 'Wingmen',
    image: Seven,
  },
  {
    title: 'Overlooking Derwentwater',
    image: Nine,
  },
  {
    title: 'Horizon',
    image: Ten,
  },
  {
    title: 'In Flight',
    image: Eleven,
  },
];

export const GalleryTwo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lastWheelTime = useRef(0);

  // Function to select a card and scroll it into view
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
    // Throttle the wheel event to prevent rapid scrolling
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;
    lastWheelTime.current = now;
    selectCard(activeIndex + (e.deltaY > 0 ? 1 : -1));
  };

  // Create a custom theme for the MUI components
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#000000',
      },
    },
  });

  return (
    <div>
        <DashboardHeader />
    <div className="gallery-app-root">
      <ThemeProvider theme={theme}>
      {/* HEADER */}
      <section className="white-section-overlay">
        <div className="gallery-hero-banner">
          <img src={Eight} alt="Main Hero Texture" />
          <div className="gallery-hero-overlay">
            <div className="gallery-hero-overlay-meta">
              <span>COLLECTION TWO</span>
              <span>MMXXVI-ONGOING</span>
            </div>
            <p>This collection is a work in progress. You can find current works below.</p>
          </div>
        </div>
      </section>

      
    <section className="black-section">
        <div className="gallery-container">
        {/* Horizontal Scroll Track */}
        <Box className="portfolio-carousel" role="region" aria-label="Portfolio projects">
          <div className="section-tag">// PORTFOLIO</div>
          <div className="fragments-header">
            <h2 className="gallery-display-title">CURRENT IMAGES IN THIS COLLECTION.</h2>
          </div>
          <Box ref={portfolioRef} onScroll={handleScroll} onWheel={handleWheel} className="portfolio-horizontal-scroll" sx={{display: "flex", alignItems: "flex-start", gap: { xs: 4, md: 8 }, overflowX: "auto", pb: 6, pt: 1}}>
          {GALLERY_CARDS.map((card, idx) => (
            <Box ref={(element: HTMLDivElement | null) => { cardRefs.current[idx] = element; }} key={idx} className={`portfolio-card ${idx === activeIndex ? 'is-active' : ''}`} onClick={() => selectCard(idx)} sx={{width: { xs: 240, sm: 280, md: 340 }, minWidth: { xs: 240, sm: 280, md: 340 }, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2, aspectRatio: '3 / 4'}}>
              {/* Image Container */}
              <Box className="portfolio-card-image" sx={{width: "100%", height: { xs: 300, sm: 380, md: 500 }, overflow: "hidden", backgroundColor: "#111"}}>
                <Box component="img" src={card.image} alt={card.title} sx={{width: "100%", height: "100%", objectFit: "cover"}}/>
              </Box>

              {/* Title */}
              <Box sx={{pt: 1}}>
                <Typography variant="h6" sx={{fontFamily: "Inter, sans-serif", fontSize: "0.8rem", fontWeight: 400, color: "#808080", lineHeight: 1.2}}>
                  // {card.title.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          ))}
          </Box>
        </Box>

        <Box className="portfolio-pagination" component="nav" aria-label="Portfolio items" sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mt: 2}}>
          {GALLERY_CARDS.map((_, idx) => (
            <button
              key={idx}
              className={idx === activeIndex ? 'is-active' : ''}
              type="button"
              onClick={() => selectCard(idx)}
              aria-label={`Go to portfolio item ${idx + 1}`}
              aria-current={idx === activeIndex ? 'true' : undefined}
            />
          ))}
        </Box>
        </div>
        </section>
        </ThemeProvider>
    </div>
        <DashboardFooter />
    </div>
  );
};

export default GalleryTwo;