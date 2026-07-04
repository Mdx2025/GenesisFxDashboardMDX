import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import DashboardPage from './pages/DashboardPage'
import DesignSystemPage from './pages/DesignSystemPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
