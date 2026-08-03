import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BannerTile from "./BannerTile";
import type { BannerProps } from "./Banner";
import CollectionOne from "../../assets/galleryHeaders/collectionOne.jpg";
import CollectionTwo from "../../assets/galleryHeaders/collectionTwo.jpg";
// Define the coverData object to hold the data for the hero banner, including title, tags, cover image URL, and redirect URL for each collection
const coverData = {
  "data": [
    {
      "title": "Collection One",
      "tags": ["MMXXIV-MMXXVI"],
      "cover_url": CollectionOne,
      "redirectURL": "/gallery/collection-one"
    },
    {
      "title": "Collection Two",
      "tags": ["MMXXVI-ONGOING"],
      "cover_url": CollectionTwo,
      "redirectURL": "/gallery/collection-two"
    }
  ]
}
// Define the BannerData type to represent the structure of each item in the coverData array, including title, tags, cover image URL, and redirect URL
type BannerData = Pick<BannerProps, "title"> & {
  tags: string[];
  cover_url: string;
  redirectURL: string;
};
// Define the StyledSwiper styled component to customize the appearance of the Swiper component, including navigation button colors
export const StyledSwiper = styled(Swiper)`
  & .swiper-button-next,
  .swiper-button-prev {
    color: white;
  }
`;
// Define the HeroBanner component to render the hero banner with a Swiper carousel of BannerTile components based on the coverData
const HeroBanner = () => (
  <StyledSwiper navigation modules={[Navigation]} slidesPerView={1}>
    {coverData.data.map((item: BannerData, index: number) => (
      <SwiperSlide key={`key-${item.title}-${index}`}>
        <BannerTile
          title={item.title}
          tags={item.tags}
          image={item.cover_url}
          redirectURL={item.redirectURL}
        />
      </SwiperSlide>
    ))}
  </StyledSwiper>
);

export default HeroBanner;
