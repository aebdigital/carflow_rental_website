import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import CarDetailsPage from './pages/CarDetailsPage';
import './index.css';

function App() {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/car/:id" element={<CarDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Terms & Conditions</h1></div>} />
          <Route path="/privacy" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Privacy Policy</h1></div>} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
}

export default App;
