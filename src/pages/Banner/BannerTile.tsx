import { Button } from "@mui/material";
import Banner from "./Banner";
import type { BannerProps } from "./Banner";
import { useNavigate } from "react-router-dom";
import "./BannerTile.css";

export default function BannerTile(props: BannerProps) {
  const navigate = useNavigate();
  const { title, image, mobileImage, tags, redirectURL } = props;

  return (
    <Banner image={image} mobileImage={mobileImage}>
      <Banner.Title title={title} />
      <Banner.Tags tags={tags} />
      <Button className="view-more-button" size="small"
        onClick={() => navigate(redirectURL)}>
            VIEW MORE →
      </Button>
    </Banner>
  );
}
