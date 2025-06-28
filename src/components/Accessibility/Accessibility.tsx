import { useEffect, useState } from 'react';
import '../../assets/styles/Accessibility.css';

const Accessibility = () => {
  const [fontSize, setFontSize] = useState(100);
  const [darkMode, setDarkMode] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const increaseFont = () => setFontSize(prev => Math.min(prev + 10, 150));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 10, 80));
  const toggleContrast = () => setDarkMode(prev => !prev);
  const resetAccessibility = () => {
    setFontSize(100);
    setDarkMode(false);
  };
  const togglePanel = () => setShowPanel(prev => !prev);

  return (
    <div className="accessibility-container">
      <div className={`accessibility-panel ${showPanel ? 'open' : ''}`}>
        <button onClick={increaseFont} title="Aumentar fuente">
          <i className="fas fa-plus"></i>
        </button>
        <button onClick={decreaseFont} title="Reducir fuente">
          <i className="fas fa-minus"></i>
        </button>
        <button onClick={toggleContrast} title="Contraste alto">
          <i className="fas fa-adjust"></i>
        </button>
        <button onClick={resetAccessibility} title="Restablecer ajustes">
          <i className="fas fa-sync-alt"></i>
        </button>
        <a
          href="http://sedboyaca.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
          title="Secretaría de Educación de Boyacá"
        >
          <i className="fas fa-university"></i>
        </a>
        <a
          href="https://www.centroderelevo.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
          title="Centro de Relevo"
        >
          <i className="fas fa-sign-language"></i>
        </a>
      </div>

      <button
        className="accessibility-toggle"
        onClick={togglePanel}
        aria-label="Abrir menú de accesibilidad"
      >
        <i className="fas fa-universal-access"></i>
      </button>
    </div>
  );
};

export default Accessibility;