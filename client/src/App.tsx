import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Opportunities from './pages/Opportunities';
import Impact from './pages/Impact';
import News from './pages/News';
import Reports from './pages/Reports';
import Partners from './pages/Partners';
import Donate from './pages/Donate';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="programs" element={<Programs />} />
        {/* TODO: <Route path="programs/:slug" /> */}
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="impact" element={<Impact />} />
        <Route path="news" element={<News />} />
        {/* TODO: <Route path="news/:slug" /> */}
        <Route path="reports" element={<Reports />} />
        <Route path="partners" element={<Partners />} />
        <Route path="donate" element={<Donate />} />
        <Route path="contact" element={<Contact />} />
        {/* TODO: /admin/* երթուղիներ (Login, Dashboard, CRUD) */}
      </Route>
    </Routes>
  );
}
