import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ToolPage from "./pages/ToolPage";
import CategoryPage from "./pages/CategoryPage";
import ComparisonPage from "./pages/ComparisonPage";
import BestForPage from "./pages/BestForPage";
import SubmitTool from "./pages/SubmitTool";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools/:slug" element={<ToolPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/compare/:slug" element={<ComparisonPage />} />
            <Route path="/best-for/:slug" element={<BestForPage />} />
            <Route path="/submit" element={<SubmitTool />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
