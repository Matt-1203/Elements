import "./galleryModal.css";
import type { GalleryImage } from "./galleryPage";

interface Props {
  image: GalleryImage;
  onClose: () => void;
}

export default function GalleryModal({ image, onClose }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close gallery image">
          ×
        </button>

        <div className="modal-image">
          <img src={image.src} alt={image.alt ?? image.title} />
        </div>

        <div className="modal-content" style={{ whiteSpace: "pre-line" }}>
          <h2>{image.title}</h2>
          <p>{image.description}</p>
        </div>
      </div>
    </div>
  );
}