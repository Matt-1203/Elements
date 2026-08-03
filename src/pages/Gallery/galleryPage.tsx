import { useMemo, useState } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import type { Photo } from "react-photo-album";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import GalleryModal from "./galleryModal";
import DashboardHeader from "../../components/Header";
import DashboardFooter from "../../components/Footer";
import collectionOne from "./collectionOne.json";
import collectionTwo from "./collectionTwo.json";

// Define the GalleryImage interface to represent the structure of each image in the gallery
export interface GalleryImage {
  id: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
  title: string;
  description: string;
}
// Define the GalleryCollectionConfig type to represent the configuration for each gallery collection
type GalleryCollectionConfig = {
  dataKey: string;
  assetFolder: string;
};
// Define the collectionConfigs object to map gallery collection paths to their respective configurations
const collectionConfigs: Record<string, GalleryCollectionConfig> = {
  "/gallery/collection-one": {
    dataKey: "collectionOne",
    assetFolder: "collectionOneGallery",
  },
  "/gallery/collection-two": {
    dataKey: "collectionTwo",
    assetFolder: "collectionTwoGallery",
  },
};
// Define the collectionDataMap object to map data keys to their respective gallery data
const collectionDataMap = {
  collectionOne,
  collectionTwo,
} as const;
// Use Vite's import.meta.glob to dynamically import all image files from the assets folder
const localImageModules = import.meta.glob("../../assets/**/*.{jpg,jpeg,JPG,JPEG}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
// Normalize the keys of the localImageModules object to lowercase for case-insensitive matching
const normalizedImageModules = Object.fromEntries(
  Object.entries(localImageModules).map(([path, url]) => [path.toLowerCase(), url])
) as Record<string, string>;
// Define the resolveImageSrc function to resolve the image source based on the provided asset folder and local image modules
function resolveImageSrc(src: string, assetFolder: string) {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;
// Generate candidate paths for the image source based on the asset folder and local image modules
  const candidates = [
    src,
    `/src/assets/${assetFolder}/${src}`,
    `../../assets/${assetFolder}/${src}`,
    `./${src}`,
  ];
  // Check if any of the candidate paths match the local image modules and return the matched URL if found
  for (const candidate of candidates) {
    const matched = localImageModules[candidate] ?? normalizedImageModules[candidate.toLowerCase()];
    if (matched) return matched;
  }

  return src;
}

function GalleryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.toLowerCase();
  const collectionConfig = collectionConfigs[currentPath] ?? collectionConfigs["/gallery/collection-one"];
  const imageData = collectionDataMap[collectionConfig.dataKey as keyof typeof collectionDataMap] as
    | Record<string, GalleryImage[]>
    | undefined;
  const galleryImages = imageData?.[collectionConfig.dataKey] ?? [];

  // Use useMemo to resolve the image sources for the gallery images based on the collection configuration
  const resolvedGalleryImages = useMemo(
    () =>
      galleryImages.map((image) => ({
        ...image,
        src: resolveImageSrc(image.src, collectionConfig.assetFolder),
      })),
    [galleryImages, collectionConfig.assetFolder]
  );
  // Use useMemo to create an array of Photo objects for the MasonryPhotoAlbum component based on the resolved gallery images
  const photos: Photo[] = useMemo(
    () =>
      resolvedGalleryImages.map((image) => ({
        src: image.src,
        width: image.width,
        height: image.height,
        alt: image.alt,
        title: image.title,
        description: image.description,
      })),
    [resolvedGalleryImages]
  );
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <main className="gallery-page">
      <DashboardHeader />
          <MasonryPhotoAlbum photos={photos} columns={3} onClick={({ index }) => setSelected(resolvedGalleryImages[index])} spacing={10}
            render={{
                image: (props) => (
                <div className="photo-wrapper">
                    <img {...props} />
                    <div className="photo-overlay">
                      <span>
                        {resolvedGalleryImages.find((x) => x.src === props.src)?.title}
                      </span>
                    </div>
                </div>
                ),
            }}
        />
        <div style={{marginTop: "20px", marginBottom: "70px", marginLeft: "20px"}} >
          <Button size="small" sx={{color: "#fff", fontWeight: 500, p: 0, "&:hover": { color: "#aaa" },}}
          onClick={() => navigate('/gallery')}>
              ← RETURN TO COLLECTIONS
          </Button>
        </div>
        {selected && (
            <GalleryModal image={selected} onClose={() => setSelected(null)}/>
        )}
      <DashboardFooter />
    </main>
  );
}

export default GalleryPage;