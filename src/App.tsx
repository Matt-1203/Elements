import HomePage from "./pages/homePage";
import ElementsPage from "./pages/elementsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttributionPage from "./pages/attributionPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/elements" element={<ElementsPage />} />
        <Route path="/attribution" element={<AttributionPage />} />
      </Routes>
    </BrowserRouter>
  );
}