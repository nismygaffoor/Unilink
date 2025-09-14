import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import './styles/theme.ts';


import Dashboard from "./pages/Dashboard";
import AcademicRepository from "./pages/AcademicRepository";
import EventHub from "./pages/EventHub";
import CommunityForum from "./pages/CommunityForum";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route
  path="*"
  element={
    <PublicLayout>
      <NotFound />
    </PublicLayout>
  }
/>
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/faq"
        element={
          <PublicLayout>
            <FAQ />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />
      <Route path="/login" element={<SignIn />} />


        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout><Dashboard /></DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/repository"
          element={
            <PrivateRoute>
              <DashboardLayout><AcademicRepository /></DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <DashboardLayout><EventHub /></DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <PrivateRoute>
              <DashboardLayout><CommunityForum /></DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <DashboardLayout><Leaderboard /></DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <DashboardLayout><Profile /></DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
