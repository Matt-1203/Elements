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
const collectionDataMap = {collectionOne, collectionTwo} as const;
// Use Vite's import.meta.glob to dynamically import all image files from the assets folder
const localImageModules = import.meta.glob("../../assets/**/*.{jpg,jpeg,JPG,JPEG}", {eager: true, import: "default"}) as Record<string, string>;

// Define the resolveImageSrc function to resolve the image source based on the provided asset folder and local image modules
function resolveImageSrc(src: string, assetFolder: string) {
  if (!src) return src;
  const matched = localImageModules[`../../assets/${assetFolder}/${src}`]
  if (matched) return matched;
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
          <MasonryPhotoAlbum
            photos={photos}
            //Conditional logic for rows and padding in images
            columns={(containerWidth) => {if (containerWidth < 500) return 2; if (containerWidth < 900) return 3; return 4;}}
            spacing={(containerWidth) => {if (containerWidth < 500) return 8; if (containerWidth < 900) return 10; return 14;}}
            onClick={({ index }) => {setSelected(resolvedGalleryImages[index]);}}
            render={{photo: ({ onClick }, { photo }) => {const galleryImage = resolvedGalleryImages.find((image) => image.src === photo.src);
                return (
                  <div className="photo-wrapper" onClick={onClick} style={{position: "relative", overflow: "hidden", cursor: "pointer", width: "100%", height: "100%"}}>
                    <img src={photo.src} alt={photo.alt ?? ""} title={photo.title} style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}}/>
                      {galleryImage?.title && (
                        <div className="photo-overlay">
                          <span>{galleryImage.title}</span>
                        </div>
                      )}
                  </div>
                );
              },
            }}
          />
        <div style={{marginTop: "20px", marginBottom: "70px", marginLeft: "20px"}} >
          <Button size="small" sx={{color: "#fff", fontWeight: 500, p: 0, "&:hover": { color: "#aaa" }}} onClick={() => navigate('/gallery')}>
              ← RETURN TO COLLECTIONS
          </Button>
        </div>
          {selected && (<GalleryModal image={selected} onClose={() => setSelected(null)}/>)}
      <DashboardFooter />
    </main>
  );
}

export default GalleryPage;