import './galleryOne.css';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DashboardHeader from "../../components/Header";
import DashboardFooter from "../../components/Footer";
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoBW from "../../assets/logoElementsBW.png";

import One from "../../assets/collectionOneGallery/1.jpg"
import Two from "../../assets/collectionOneGallery/2.jpg"
import Three from "../../assets/collectionOneGallery/3.jpg"
import Four from "../../assets/collectionOneGallery/4.jpg"
import Five from "../../assets/collectionOneGallery/5.jpg"
import Six from "../../assets/collectionOneGallery/6.jpg"
import Seven from "../../assets/collectionOneGallery/7.jpg"
import Eight from "../../assets/collectionOneGallery/8.jpg"
import Nine from "../../assets/collectionOneGallery/9.jpg"
import Ten from "../../assets/collectionOneGallery/10.jpg"
import Eleven from "../../assets/collectionOneGallery/11.jpg"
import Twelve from "../../assets/collectionOneGallery/12.jpg"
import Thirteen from "../../assets/collectionOneGallery/13.jpg"
import Fourteen from "../../assets/collectionOneGallery/14.jpg"
import Fifteen from "../../assets/collectionOneGallery/15.jpg"
import Sixteen from "../../assets/collectionOneGallery/16.jpg"
import Seventeen from "../../assets/collectionOneGallery/17.jpg"
import Eighteen from "../../assets/collectionOneGallery/18.jpg"
import Nineteen from "../../assets/collectionOneGallery/19.jpg"
import Twenty from "../../assets/collectionOneGallery/20.jpg"
import TwentyOne from "../../assets/collectionOneGallery/21.jpg"
import TwentyTwo from "../../assets/collectionOneGallery/22.jpg"
import TwentyThree from "../../assets/collectionOneGallery/23.jpg"
import TwentyFive from "../../assets/collectionOneGallery/25.jpg"
import TwentySix from "../../assets/collectionOneGallery/26.jpg"
import TwentySeven from "../../assets/collectionOneGallery/27.jpg"
import TwentyEight from "../../assets/collectionOneGallery/28.jpg"
import TwentyNine from "../../assets/collectionOneGallery/29.jpg"
import Thirty from "../../assets/collectionOneGallery/30.jpg"
import ThirtyOne from "../../assets/collectionOneGallery/31.jpg"
import ThirtyTwo from "../../assets/collectionOneGallery/32.jpg"
import ThirtyThree from "../../assets/collectionOneGallery/33.jpg"
import ThirtyFour from "../../assets/collectionOneGallery/34.jpg"
import ThirtyFive from "../../assets/collectionOneGallery/35.jpg"
import ThirtySix from "../../assets/collectionOneGallery/36.jpg"
import ThirtySeven from "../../assets/collectionOneGallery/37.jpg"
import ThirtyEight from "../../assets/collectionOneGallery/38.jpg"
import ThirtyNine from "../../assets/collectionOneGallery/39.jpg"
import Forty from "../../assets/collectionOneGallery/40.jpg"
import FortyOne from "../../assets/collectionOneGallery/41.jpg"
import FortyTwo from "../../assets/collectionOneGallery/42.jpg"
import FortyThree from "../../assets/collectionOneGallery/43.jpg"
import FortyFour from "../../assets/collectionOneGallery/44.jpg"
import FortyFive from "../../assets/collectionOneGallery/45.jpg"

interface GalleryCard {
  title: string;
  image: string;
}

const GALLERY_CARDS: GalleryCard[] = [
  {
    title: 'Confluence',
    image: One,
  },
  {
    title: 'Streaming',
    image: Two,
  },
  {
    title: 'Currents',
    image: Three,
  },
  {
    title: 'Tigers Clough',
    image: Seven,
  },
  {
    title: 'Citrine',
    image: Eight,
  },
  {
    title: 'Unfolding',
    image: Ten,
  },
  {
    title: 'Staghorn Sumac',
    image: Twelve,
  },
  {
    title: 'Point Taken',
    image: Thirteen,
  },
  {
    title: 'Fern Anatomy',
    image: Fifteen,
  },
  {
    title: 'Under the City',
    image: Sixteen,
  },
  {
    title: 'Lillypad Systems',
    image: Eighteen,
  },
  {
    title: 'Shardly There',
    image: Twenty,
  },
  {
    title: 'Towards Castlefield',
    image: TwentyOne,
  },
  {
    title: 'Hanging Around',
    image: TwentyTwo,
  },
  {
    title: 'The City of London',
    image: TwentyThree,
  },
  {
    title: 'Current Affairs',
    image: FortyTwo,
  },
  {
    title: 'Prawn to be Wild',
    image: TwentyFive,
  },
  {
    title: 'Under the Bridge',
    image: TwentySix,
  },
  {
    title: 'Face to Face',
    image: TwentySeven,
  },
  {
    title: 'Up Deansgate',
    image: TwentyNine,
  },
  {
    title: 'Bridge to the Sky',
    image: ThirtyOne,
  },
  {
    title: 'Duck & Cover',
    image: ThirtyEight,
  },
  {
    title: 'The Kingfisher',
    image: FortyThree,
  },
  {
    title: 'Island in the Stream',
    image: FortyFour,
  },
  {
    title: 'Lighting the Way',
    image: FortyFive,
  },
];

interface ServiceImage {
  src: string;
  title: string;
}

const SERVICE_ITEMS = [
  {
    tag: '//01',
    title: 'NATURE CLOSE UP',
    category: '[01/NATURE PHOTOGRAPHY]',
    text: 'These images are notable for thier use of lines and curves in shaping the scene. The difference in colour between foreground and background make you pay close attention to these curves, leading you up the scene.',
    images: [
      { src: Five, title: 'Morning Dew' },
      { src: Nineteen, title: 'Headfirst' },
      { src: FortyOne, title: 'Conga Line' },
    ] as ServiceImage[],
  },
  {
    tag: '//02',
    title: 'THROUGH MANCHESTER',
    category: '[02/URBAN PHOTOGRAPHY]',
    text: 'Notable for thier use of symmetry and leading lines, these images highlight some of the manmade structures around Manchester. The contrast of deep blues, reds and purples adds to the scene and highlights are harder, symmetric side to urban photography.',
    images: [
      { src: Four, title: 'Motion' },
      { src: ThirtyFour, title: 'Symmetric Systems' },
      { src: ThirtyFive, title: 'Through Castlefields' },
    ] as ServiceImage[],
  },
  {
    tag: '//03',
    title: 'LIGHT & MOTION',
    category: '[03/ABSTRACT & MINIMALISM]',
    text: 'These images are some of my favourties from this collection. The use of shades and colours really makes these images stand out. There is no true subject to these images, the subject is the image itself. This lack of meaning and features give a abstract and minimalist impression.',
    images: [
      { src: Fourteen, title: 'Against the Tide' },
      { src: ThirtySix, title: 'Into Troubled Waters' },
      { src: Forty, title: 'Rolling Hills' },
    ] as ServiceImage[],
  },
];

export const GalleryOneM: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [serviceImageIndexes, setServiceImageIndexes] = useState(() => SERVICE_ITEMS.map(() => 0));
  const portfolioRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lastWheelTime = useRef(0);

  // Effect to automatically cycle through service images every 8 seconds (for upper section)
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setServiceImageIndexes((currentIndexes) => currentIndexes.map((currentIndex, serviceIndex) => (
        (currentIndex + 1) % SERVICE_ITEMS[serviceIndex].images.length
      )));
    }, 8000);
    return () => window.clearInterval(intervalId);
  }, []);

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

  // Determine if the viewport width is less than or equal to 900px to apply mobile-specific styles or behavior
  const isMobile = window.innerWidth <= 900;

  return (
    <div>
        <DashboardHeader />
    <div className="gallery-app-root">
      <ThemeProvider theme={theme}>
      {/* HEADER */}
      <section className="white-section-overlay">
        <div className="gallery-hero-banner">
          <img src={Seventeen} alt="Main Hero Texture" />
          <div className="gallery-hero-overlay">
            <div className="gallery-hero-overlay-meta">
              <span>COLLECTION ONE</span>
              <span>MMXXIV-MMXXVI</span>
            </div>
            <p>A development of photographic techniques and technical learning.</p>
          </div>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="black-section">
        <div className="gallery-container">
          <div className="section-tag">// COLLECTION OVERVIEW</div>
          <h2 className="gallery-display-title">A COLLECTION OF STYLES.</h2>

          <div className="gallery-studio-grid">
            <div className="studio-col-left">
              <p className="body-copy">This collection showcases the highlights of the images taken during the first three years of photography. Focus is on exploration, going around areas Lancashire to find interesting photographic themes. Both colour and clarity were two main focal points in this collection and was a cornerstone of development during these three years.</p>
              <div className="stat-box">
                <span className="stat-num">45+</span>
                <span className="stat-label">PHOTOGRAPHS</span>
              </div>
              <SouthEastIcon className="stat-icon" color="primary" sx={{ width: 48, height: 48 }}/>
            </div>

            <div className="studio-col-right">
              <div className="card-media">
                <img src={Nine} alt="Portrait Studio" />
                <div className="media-meta">
                  <span>// INNERBLOOM</span>
                  <span>MMXXV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="white-section-overlay brutalist-gallery-hero">
        <div className="gallery-split-layout">
          <div className="gallery-black-block">
            <h1 className="gallery-title">
              THE ELEMENTS<br />SETS
            </h1>
          </div>
          <div className="gallery-hero-image-wrap">
            <img src={Six} alt="Gallery Visitors" />
          </div>
          <div className="gallery-hero-text-wrap">
            <p>Used extensively throughout my Elements catalogues, we have multiple collections of images featuring those found in the catalogues and beyond. Browse the other collections below.</p>
            <div className="gallery-btn-spacer"/>
            <button className="gallery-btn">
              <span>CATALOGUES</span>
              <span className="btn-arrow">›</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="white-section-overlay">
        <div className="gallery-container">
          <div className="section-tag">// COLLECTION FEATURES</div>
          <h2 className="gallery-display-title">EVERYTHING HAS ITS WONDERS.</h2>
          <p className="gallery-intro-sub">Finding interesting scenes in the everyday is one of the best parts of photography. From bridges to moss, everything has its wonders if you pay close attention. These feature my highlights of lanscape photography from this collection.</p>
          <div style={{padding: "10px"}} />
          <div className="services-list">
            {SERVICE_ITEMS.map((item, idx) => {
              const activeServiceImage = item.images[serviceImageIndexes[idx]];

              return (
              <div key={idx} className={`service-row${idx === 1 ? ' service-row-reversed' : ''}`}>
                <div className="service-row-header">
                  <span>{item.tag}</span>
                  <span className="arrow-icon">↘</span>
                </div>
                <div className="service-row-content">
                    {idx % 2 !== 0 ? (
                        isMobile ? (
                          <SouthWestIcon className="one-row-icon" color="secondary" sx={{ width: 48, height: 48, position: "absolute", top: 0, right: 0 }} />
                        ) : (
                          <SouthWestIcon className="one-row-icon" color="secondary" sx={{ width: 48, height: 48, position: "absolute", bottom: 0, left: "65%" }} />
                        )
                      ) : (
                        isMobile ? (
                          <SouthEastIcon className="one-row-icon" color="secondary" sx={{ width: 48, height: 48, position: "absolute", top: 0, right: 0 }} />
                        ) : (
                        <SouthEastIcon className="one-row-icon" color="secondary" sx={{ width: 48, height: 48, position: "absolute", bottom: 0, right: "65%" }} />
                      ))}
                  <div className="service-text-left">
                    <h3>{item.title}</h3>
                    <sub className="service-category">{item.category}</sub>
                    <p>{item.text}</p>
                  </div>
                  <div className="service-media">
                    <img key={`${idx}-${serviceImageIndexes[idx]}`} src={activeServiceImage.src} alt={activeServiceImage.title} />
                    <div className="service-image-meta">
                      <p key={`${idx}-title-${serviceImageIndexes[idx]}`} className="service-image-title">{activeServiceImage.title}</p>
                      <div className="service-image-dots" aria-label={`${item.title} images`}>
                        {item.images.map((image, imageIndex) => (
                          <button
                            key={image.title}
                            className={imageIndex === serviceImageIndexes[idx] ? 'is-active' : ''}
                            type="button"
                            onClick={() => setServiceImageIndexes((currentIndexes) => currentIndexes.map((currentIndex, serviceIndex) => serviceIndex === idx ? imageIndex : currentIndex))}
                            aria-label={`Show ${image.title}`}
                            aria-current={imageIndex === serviceImageIndexes[idx] ? 'true' : undefined}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="white-section-overlay">
        <div className="gallery-grid-container">
          <img src={LogoBW} alt="Gallery Logo" className="gallery-logo" />
          {isMobile ? (
            <SouthWestIcon className="gallery-arrow-icon" color="secondary" sx={{ width: 0, height: 0 }}/>
          ) : (
            <SouthWestIcon className="gallery-arrow-icon" color="secondary" sx={{ width: 100, height: 100 }}/>
          )}
          <div className="gallery-grid-left">
            <h2 className="gallery-subtitle">The Animal Kingdom</h2>
            <div style={{paddingTop: "3rem"}}></div>
            <p className="gallery-body">Other notable images in this collection are those of animals. It was a challenge I set when I started to seek out as many of these as possible and still continue to this day some notable favorites are the Kingfisher, Spoonbill and Lemurs.</p>
          </div>
          <div className="gallery-grid-right">
            <img src={TwentyEight} alt="Main Exhibition Room" />
          </div>

          <div className="gallery-grid-bottom-left">
            <img src={ThirtySeven} alt="Bench View" />
          </div>
          <div className="gallery-grid-bottom-right">
            <img src={ThirtyThree} alt="Exhibition Hallway" />
            <div className="gallery-cta-card">
              <h3>LONG EXPOSURE</h3>
              <p>Another notable favourite this year was images of waterfalls. The image above is one of my favourites, taken in the Peak district.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="black-section">
        <div className="gallery-container">
          <div className="section-tag">//WATER EXHIBITIONS</div>
          <div className="fragments-header">
            <h2 className="gallery-display-title">Fragments of Stillness.</h2>
            <p className="fragments-intro">Water itself was a big factor in this collection. These images are all of various water bodies taken at long exposures.</p>
          </div>

          <div className="fragments-grid">
            {[
              { img: Eleven, label: '// TRAWLING', year: 'MMXXIV', alt: 'TRAWLING' },
              { img: Thirty, label: '// WORLD ON FIRE', year: 'MMXXV', alt: 'WORLD ON FIRE' },
              { img: ThirtyNine, label: '// SHEPHERDS DELIGHT', year: 'MMXXV', alt: 'SHEPHERDS DELIGHT' }
            ].map((frag) => (
              <div key={frag.label} className="fragment-card">
                <img src={frag.img} alt={frag.alt} />
                <div className="fragment-meta">
                  <span>{frag.label}</span>
                  <span>{frag.year}</span>
                </div>
              </div>
            ))}
            <div className="fragment-square-card">
              <img src={ThirtyTwo} alt="Silhouette study" />
                <div className="fragment-meta">
                  <span>// WATER REFLECTIONS</span>
                  <span>MMXXIV</span>
                </div>
            </div>
          </div>

        {/* Horizontal Scroll Track */}
        <Box className="portfolio-carousel" role="region" aria-label="Portfolio projects">
          <div className="section-tag">// FURTHER PORTFOLIO</div>
          <div className="fragments-header">
            <h2 className="gallery-display-title">OTHER NOTABLE IMAGES IN THIS COLLECTION.</h2>
          </div>
          <Box ref={portfolioRef} onScroll={handleScroll} onWheel={handleWheel} className="portfolio-horizontal-scroll" sx={{display: "flex", alignItems: "flex-start", gap: { xs: 4, md: 8 }, overflowX: "auto", pb: 6, pt: 1}}>
          {GALLERY_CARDS.map((card, idx) => (
            <Box ref={(element: HTMLDivElement | null) => { cardRefs.current[idx] = element; }} key={idx} className={`portfolio-card ${idx === activeIndex ? 'is-active' : ''}`} onClick={() => selectCard(idx)} sx={{width: { xs: 220, sm: 280, md: 340 }, minWidth: { xs: 220, sm: 280, md: 340 }, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2}}>
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

export default GalleryOneM;