import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import MainDashboard from "@/pages/MainDashboard";
import Login from "@/pages/Login";
import EmployeeDashboard from "@/pages/Employee/Dashboard";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/Admin/Dashboard";
import AttendanceHistory from "@/pages/Admin/AttendanceHistory";
import EmployeeManage from "@/pages/Admin/EmployeeManage";
import StatsReport from "@/pages/Admin/StatsReport";
import Settings from "@/pages/Admin/Settings";
import "./styles/globals.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainDashboard />} />
            <Route path="/login" element={<Login />} />

            {/* Employee Routes */}
            <Route path="/employee" element={<EmployeeDashboard />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="attendance" element={<AttendanceHistory />} />
              <Route path="employees" element={<EmployeeManage />} />
              <Route path="stats" element={<StatsReport />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
