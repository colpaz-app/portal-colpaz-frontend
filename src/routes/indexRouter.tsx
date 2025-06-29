import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import MainLayout from '../layout/MainLayout';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Login';
import Logout from '../pages/Logout';

const IndexRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default IndexRouter