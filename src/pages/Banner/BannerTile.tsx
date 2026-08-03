import { Button } from "@mui/material";
import Banner from "./Banner";
import type { BannerProps } from "./Banner";
import { useNavigate } from "react-router-dom";

export default function BannerTile(props: BannerProps) {
  const navigate = useNavigate();
  const { title, image, tags, redirectURL } = props;

  return (
    <Banner image={image}>
      <Banner.Title title={title} />
      <Banner.Tags tags={tags} />
      <Button size="small" sx={{color: "#fff", fontWeight: 500, p: 0, "&:hover": { color: "#aaa" },}}
        onClick={() => navigate(redirectURL)}>
            VIEW MORE →
      </Button>
    </Banner>
  );
}
