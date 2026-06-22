import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Servers from "./pages/Servers";
import ServerDetails from "./pages/ServerDetails";
import Advertise from "./pages/Advertise";
import Leaderboard from "./pages/Leaderboard";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/server/:id" element={<ServerDetails />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;