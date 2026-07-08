import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AllPagesPage from './pages/AllPagesPage'
import { SvgFilters } from './components/SvgFilters'
import { PAGE_REGISTRY } from './data/pages'

export default function App() {
  return (
    <BrowserRouter basename="/GenesisFxDashboardMDX">
      <SvgFilters />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<RootLayout />}>
          {PAGE_REGISTRY.map(({ path, component: Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route path="/allpages" element={<AllPagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
