import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aviso-de-privacidad" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
