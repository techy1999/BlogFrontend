import { routeConfig } from "./routeConfig";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
         { routeConfig.map((route) => <Route path={route.path} element={route.element}/>) }
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
