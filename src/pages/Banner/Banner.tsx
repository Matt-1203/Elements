import type { ReactNode } from "react";
import "./Banner.css";
// Define the BannerProps type to represent the properties of the Banner component
export type BannerProps = {
  title: string;
  tags: string[];
  redirectURL: string;
  image: string;
  mobileImage?: string;
  children?: ReactNode;
};
// Define the Title component to render the title text in the banner
const Title = ({ title }: Pick<BannerProps, "title">) => (
  <div className="banner-title">{title}</div>
);
// Define the Tags component to render the tags in the banner
const Tags = ({ tags }: Pick<BannerProps, "tags">) => {
  return (
    <div className="banner-tags">
      {tags.map((tag) => (
        <span key={`tag-${tag}`}>{tag}</span>
      ))}
    </div>
  );
};
// Define the Banner component to render the banner with title, tags, and background image
type BannerContentProps = Pick<BannerProps, "image" | "mobileImage"> & {
  children?: ReactNode;
};

const Banner = ({ image, mobileImage, children }: BannerContentProps) => {
  return (
    <div className="banner-container">
      <picture>
        {mobileImage && <source media="(max-width: 600px)" srcSet={mobileImage} />}
        <img src={image} alt="" />
      </picture>
      <div>{children}</div>
    </div>
  );
};

Banner.Title = Title;
Banner.Tags = Tags;

export default Banner;