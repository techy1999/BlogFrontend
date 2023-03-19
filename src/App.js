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
import "./App.css";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/my-blogs" element={<MyBlog />} />
        <Route path="/blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
