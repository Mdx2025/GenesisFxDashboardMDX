import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import DashboardPage from './pages/DashboardPage'
import AssetsManagementPage from './pages/AssetsManagementPage'
import DesignSystemPage from './pages/DesignSystemPage'
import DepositPage from './pages/DepositPage'
import { SvgFilters } from './components/SvgFilters'

export default function App() {
  return (
    <BrowserRouter>
      <SvgFilters />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/assets-management" element={<AssetsManagementPage />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
