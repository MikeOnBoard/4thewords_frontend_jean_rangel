import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LegendList from './pages/LegendList';
import CreateLegend from './pages/CreateLegend';
import EditLegend from './pages/EditLegend';
import { Book } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-700 text-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center">
            <Book className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Libro Virtual de Leyendas Costarricenses</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LegendList />} />
            <Route path="/create" element={<CreateLegend />} />
            <Route path="/edit/:id" element={<EditLegend />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Libro Virtual de Leyendas Costarricenses</p>
            <p className="text-sm mt-2">Desarrollado para 4thewords</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;