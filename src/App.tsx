import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AllPagesPage from './pages/AllPagesPage'
import { SvgFilters } from './components/SvgFilters'
import { PAGE_REGISTRY } from './data/pages'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <SvgFilters />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {PAGE_REGISTRY.filter(({ layout }) => layout === 'standalone').map(({ path, component: Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        <Route element={<RootLayout />}>
          {PAGE_REGISTRY.filter(({ layout }) => layout !== 'standalone').map(({ path, component: Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route path="/allpages" element={<AllPagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
