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

const IndexRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sitemap" element={<SiteMap />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route element={<AdminEntryLayout />}>
          <Route path="/admin-entry" element={<AdminEntry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default IndexRouter