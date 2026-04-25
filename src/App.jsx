import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ToolPage from "./pages/ToolPage";
import CategoryPage from "./pages/CategoryPage";
import ComparisonPage from "./pages/ComparisonPage";
import BestForPage from "./pages/BestForPage";
import UseCasesLanding from "./pages/UseCasesLanding";
import SubmitTool from "./pages/SubmitTool";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col font-sans">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools/:slug" element={<ToolPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/compare/:slug" element={<ComparisonPage />} />
          <Route path="/best-for/:slug" element={<BestForPage />} />
          <Route path="/use-cases" element={<UseCasesLanding />} />
          <Route path="/use-cases/:slug" element={<BestForPage />} />
          <Route path="/submit" element={<SubmitTool />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
