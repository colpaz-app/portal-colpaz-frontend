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
import AdminLayout from '../layout/AdminLayout';
import Admin from '../pages/Admin';
import Banners from '../pages/admin/Banners';
import NotFoundLayout from '../layout/NotFoundLayou';
import Languages from '../pages/admin/Languages';

const IndexRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sitemap" element={<SiteMap />} />
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
        <Route element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/banners" element={<Banners />} />
          <Route path="/admin/languages" element={<Languages />} />
        </Route>
        <Route element={<NotFoundLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default IndexRouter