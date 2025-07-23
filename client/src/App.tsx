import { Signup } from "./layouts/Signup";
import { Login } from "./layouts/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AllCoursesSection } from "./components/AllCoursesSection";
import { AdminCourses } from "./components/AdminCourses";
import { PurchasedCourses } from "./components/PurchasedCourses";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { HomePageContent } from "./components/HomePageContent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/courses" element={<AllCoursesSection />} />
          <Route path="/purchased" element={<PurchasedCourses />} />
          <Route path="/mycourses" element={<AdminCourses />} />
          <Route path="/home" element={<HomePageContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
