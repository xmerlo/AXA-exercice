import './App.css';
import AppBar from './components/layout/AppBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SuiviDevis from './components/pages/SuiviDevis';
import NouveauDevis from './components/pages/NouveauDevis';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const menuItems = [
  { label: 'SUIVI DEVIS', path: '/suivi-devis' },
  { label : 'NOUVEAU DEVIS', path: '/nouveau-devis' },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <div className="App">
          <Router>
            <AppBar menuItems={menuItems} />
            <Routes>
              <Route path="/" element={<Navigate to="/suivi-devis" replace />} />
              <Route path="/suivi-devis" element={<SuiviDevis />} />
              <Route path="/nouveau-devis" element={<NouveauDevis />} />
            </Routes>
          </Router>
        </div>
    </ThemeProvider>
  );
}

export default App;
