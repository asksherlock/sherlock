import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/aviso-de-privacidad" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
