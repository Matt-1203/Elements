import HomePage from "./pages/HomePage/homePage";
import ElementsPage from "./pages/ElementsPage/elementsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GalleryOne from "./pages/Gallery/galleryPage";
import Carousel from "./pages/Banner/Carousel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/elements" element={<ElementsPage />} />
        <Route path="/gallery" element={<Carousel />} />
        <Route path="/gallery/collection-one" element={<GalleryOne />} />
        <Route path="/gallery/collection-two" element={<GalleryOne />} />
      </Routes>
    </BrowserRouter>
  );
}