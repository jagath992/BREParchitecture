import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages & Components
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import AdminProfile from "./pages/AdminProfile";
import AdminAddition from "./pages/AdminAddition";
import AboutUs from "./components/AboutUs";
import { SwipeCarousel } from "./pages/Users/SwipeCarousel";
import Body from "./pages/Users/Body";
import HorizonatalCaurosel from "./pages/Users/HorizontalCaurosel";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProjectPage from "./pages/ProjectPage";

// Context Providers
import { ProjectProvider } from "./contexts/ProjectContext";
import { AdminProvider } from "./contexts/AdminContext";
import { AuthProvider } from "./contexts/AuthContext";

// Home Page Composition
const HomePage = () => (
  <>
    <SwipeCarousel />
    <Body />
    <AboutUs />
    <HorizonatalCaurosel />
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <AdminProvider>
        <ProjectProvider>
          <Router>
            <Toaster position="top-center" />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<UserLayout />}>
                {/* Home Page */}
                <Route index element={<HomePage />} />

                {/* Projects Section */}
                <Route path="projects">
                  <Route index element={<Home />} />
                  <Route
                    path="commercial"
                    element={<CategoryPage category="commercial" />}
                  />
                  <Route
                    path="hospitality"
                    element={<CategoryPage category="hospitality" />}
                  />
                  <Route path="project/:id" element={<ProjectPage />} />
                </Route>
              </Route>

              {/* Admin Login (public) */}
              <Route path="/admin/login" element={<Login />} />

              {/* Admin Protected Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add-project" element={<AddProject />} />
                <Route path="project/:id" element={<EditProject />} />
                <Route path="admin-profile" element={<AdminProfile />} />
                <Route path="admin-addition" element={<AdminAddition />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ProjectProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default App;
