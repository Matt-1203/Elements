import styled from "styled-components";
// Define the BannerProps type to represent the properties of the Banner component
export type BannerProps = {
  title: string;
  tags: string[];
  redirectURL: string;
  image: string;
};
// Define the StyledTitle styled component for the title text in the banner
const StyledTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: white;
`;
// Define the StyledTag styled component for the tags in the banner
const StyledTag = styled.div`
  padding: 0.5rem 0;

  & span {
    margin-right: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
  }
`;
// Define the Container styled component for the banner container with background image and gradient overlay
const Container = styled.div<Pick<BannerProps, "image">>`
  height: 800px;
  width: 90%;
  display: flex;
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 60%, transparent),
    url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 100px;
  }
`;
// Define the Title component to render the title text in the banner
const Title = ({ title }: Pick<BannerProps, "title">) => (
  <StyledTitle>{title}</StyledTitle>
);
// Define the Tags component to render the tags in the banner
const Tags = ({ tags }: Pick<BannerProps, "tags">) => {
  return (
    <StyledTag>
      {tags.map((tag) => (
        <span key={`tag-${tag}`}>{tag}</span>
      ))}
    </StyledTag>
  );
};
// Define the Banner component to render the banner with title, tags, and background image
const Banner = (props: any) => {
  return (
    <Container image={props.image}>
      <div>{props.children}</div>
    </Container>
  );
};

Banner.Title = Title;
Banner.Tags = Tags;

export default Banner;