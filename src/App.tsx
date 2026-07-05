import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import DashboardPage from './pages/DashboardPage'
import DesignSystemPage from './pages/DesignSystemPage'
import { SvgFilters } from './components/SvgFilters'

export default function App() {
  return (
    <BrowserRouter>
      <SvgFilters />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
