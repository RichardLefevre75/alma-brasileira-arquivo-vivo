import { HashRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Archive from './pages/Archive';
import PlantDetail from './pages/PlantDetail';
import Essays from './pages/Essays';
import EssayDetail from './pages/EssayDetail';
import About from './pages/About';

const BASE = import.meta.env.BASE_URL;

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/arquivo" element={<Archive />} />
            <Route path="/arquivo/:id" element={<PlantDetail />} />
            <Route path="/ensaios" element={<Essays />} />
            <Route path="/ensaios/:id" element={<EssayDetail />} />
            <Route path="/sobre" element={<About />} />
            <Route path="*" element={
              <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
                <div>
                  <div className="text-6xl mb-4">🌿</div>
                  <h2 className="font-serif text-2xl mb-3" style={{ color: 'var(--color-forest)' }}>
                    Página não encontrada
                  </h2>
                  <a href={BASE} className="text-sm underline" style={{ color: 'var(--color-earth)' }}>
                    Voltar ao início
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
