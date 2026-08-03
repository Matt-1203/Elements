import "./galleryModal.css";
import LogoElements from "../../assets/LogoElements.png";
import type { GalleryImage } from "./galleryPage"

// Props for the GalleryModal component
interface Props {
  image: GalleryImage;
  onClose: () => void;
}

export default function GalleryModal({ image, onClose }: Props) {
  return (
    <div className="modal-backdrop">
        <div className="modal">
            <button className="close-button" onClick={onClose}>
                ×
            </button>
            <div className="modal-image">
                <img src={image.src} alt={image.alt} />
            </div>
            <div className="modal-content" style={{ whiteSpace: "pre-line" }}>
                <h2>{image.title}</h2>
                <p>{image.description}</p>
            </div>
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '50px', height: 'auto', paddingRight: '5px' }}>
                <img src={LogoElements} alt="Logo" style={{ width: "60px", height: "auto", display: "block" }}/>
            </div>
        </div>
    </div>
    );
}