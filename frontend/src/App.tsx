import { useState } from "react";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AcademicRepository from "./components/AcademicRepository";
import EventHub from "./components/EventHub";
import CommunityForum from "./components/CommunityForum";

function App() {
  const [userEmail, setUserEmail] = useState<string | null>(
    () => localStorage.getItem("userEmail")
  );

  function handleSignIn(email: string) {
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  }

  function handleSignOut() {
    setUserEmail(null);
    localStorage.removeItem("userEmail");
  }

  if (!userEmail) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <Router>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/repository" element={<AcademicRepository />} />
          <Route path="/events" element={<EventHub />} />
          <Route path="/forum" element={<CommunityForum />} />
        </Routes>
        <button
          onClick={handleSignOut}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
      <footer className="text-center text-gray-500 py-4">
        © 2024 UniLink. All rights reserved.
      </footer>
    </Router>
  );
}

export default App;
