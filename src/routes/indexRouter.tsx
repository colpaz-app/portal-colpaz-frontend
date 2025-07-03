import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import MainLayout from '../layout/MainLayout';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import AdminEntry from '../pages/AdminEntry';
import AdminEntryLayout from '../layout/AdminEntryLayout';
import SiteMap from '../pages/Sitemap';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from '../components/ProtectedRoute';

const IndexRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sitemap" element={<SiteMap />} />
          <Route path="/not-found" element={<NotFoundPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }/>
        </Route>
        <Route element={
          <ProtectedRoute>
            <AdminEntryLayout />
          </ProtectedRoute>
        }>
          <Route path="/admin-entry" element={<AdminEntry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default IndexRouter