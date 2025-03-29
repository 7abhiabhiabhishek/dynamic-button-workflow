import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConfigPage from './pages/ConfigPage';
import OutputPage from './pages/OutputPage';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Config Page</Link> | <Link to="/output">Output Page</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ConfigPage />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </Router>
  );
}

export default App;