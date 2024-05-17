import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBlog from "./pages/MyBlog";
import CreateBlog from "./pages/CreateBlog";
import Footer from "./components/Footer";
import BlogDetail from "./pages/BlogDetail";
import Profile from "./pages/Profile";
import NotFound from "./components/common/NotFound";
import "./App.css";
import Home from "./pages/Home";
import NotFoundImage from "./assets/undraw_page_not_found.svg";
import JoinTeam from "./pages/JoinTeam";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/my-blogs" element={<MyBlog />} />
        <Route path="/blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/join-team" element={<JoinTeam />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
        {/* Wildcard route for handling 404 errors */}
        <Route path="*" element={<NotFound imageUrl={NotFoundImage} />} />
        <Route path="/api" element={null} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
