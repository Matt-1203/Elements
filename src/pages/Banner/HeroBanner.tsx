import { useRef, useState } from "react";
import BannerTile from "./BannerTile";
import "./HeroBanner.css";
import type { BannerProps } from "./Banner";
import CollectionOne from "../../assets/galleryHeaders/collectionOneDesktop.jpg";
import CollectionTwo from "../../assets/galleryHeaders/collectionTwoDesktop.jpg";
import CollectionOneMobile from "../../assets/galleryHeaders/collectionOneMobile.jpg";
import CollectionTwoMobile from "../../assets/galleryHeaders/collectionTwoMobile.jpg";

type BannerData = Pick<BannerProps, "title" | "tags" | "redirectURL" | "image" | "mobileImage">;

const coverData: BannerData[] = [
  {
    title: "Collection One",
    tags: ["MMXXIV-MMXXVI"],
    image: CollectionOne,
    mobileImage: CollectionOneMobile,
    redirectURL: "/gallery/collection-one",
  },
  {
    title: "Collection Two",
    tags: ["MMXXVI-ONGOING"],
    image: CollectionTwo,
    mobileImage: CollectionTwoMobile,
    redirectURL: "/gallery/collection-two",
  },
];

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelTime = useRef(0);
  // Function to select a slide based on the index, ensuring it stays within bounds
  const selectSlide = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, coverData.length - 1)));
  };
  // Function to handle wheel events for slide navigation, preventing rapid changes
  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    // Throttle the wheel event to prevent rapid slide changes
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;
    lastWheelTime.current = now;
    selectSlide(activeIndex + (event.deltaY > 0 ? 1 : -1));
  };

  return (
    <section className="carousel-frame" onWheel={handleWheel} aria-label="Collection carousel">
      <div className="slide-track" style={{ transform: `translateX(${activeIndex * -100}%)` }}>
        {coverData.map((item, index) => (
          <div className="slide" key={`${item.title}-${index}`} aria-hidden={activeIndex !== index}>
            <BannerTile {...item} />
          </div>
        ))}
      </div>

      <nav className="pagination" aria-label="Carousel slides">
        {coverData.map((item, index) => (
          <button
            className="pagination-button"
            key={`slide-${item.title}`}
            type="button"
            data-active={activeIndex === index}
            onClick={() => selectSlide(index)}
            aria-label={`Show ${item.title}`}
            aria-current={activeIndex === index ? "true" : undefined}
          />
        ))}
      </nav>
    </section>
  );
};

export default HeroBanner;
