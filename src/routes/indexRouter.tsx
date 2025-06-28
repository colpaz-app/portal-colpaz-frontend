import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import MainLayout from '../layout/MainLayout';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Login';

const IndexRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default IndexRouter